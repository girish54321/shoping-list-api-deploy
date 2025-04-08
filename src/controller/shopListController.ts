import createError = require('http-errors')
import { Request, Response, NextFunction } from 'express'
//@ts-ignore
import { User, ShopListItem, ShopList, UserShopList, Sequelize, CommonItem } from '../../models'
import { CreateShopListItemType, CreateShopListType, ShareShopListType, UpdateShopListItemType, UpdateShopListType } from '../types/authTypes'
import mapToJSON from '../helper/mapToJson'
const Op = Sequelize.Op;

const createShopList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)

        if (!findUser) {
            throw createError.BadRequest("User Not Found")
        }
        const body = req.body;
        if (!body.shopListName) {
            throw createError.BadRequest("List Name Required")
        }
        if (!body.description) {
            throw createError.BadRequest("List description Required")
        }
        const newShopList = await findUser.createShopList({
            shopListName: body.shopListName,
            description: body.description,
        })

        res.status(201).json({
            success: true
        })
    } catch (error) {
        console.log("Create Account Error: " + error);
        next(error)
    }
}

const deleteShopListItem = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const findShopListItem = await ShopListItem.findByPk(req.params.id)
        if (!findShopListItem) {
            throw createError.BadRequest("ShopList Not Found")
        }
        await findShopListItem.destroy();
        res.send({
            success: true
        })
    } catch (error) {
        console.log("Cant delete shoplist", error)
        next(error)
    }
}

const deleteShopList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const findShopList = await ShopList.findByPk(req.params.id)
        if (!findShopList) {
            throw createError.BadRequest("ShopList Not Found")
        }
        await findShopList.destroy();
        res.send({ success: true })
    } catch (error) {
        console.log("Cant delete shoplist", error)
        next(error)
    }
}

const updateShopList = async (req: Request<{}, {}, UpdateShopListType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.shopListName) {
            throw createError.BadRequest("shopListName Name Required")
        }
        if (!body.description) {
            throw createError.BadRequest("List Info Required")
        }
        const findShopList = await ShopList.findByPk(req.body.shopListId)

        if (!findShopList) {
            throw createError.BadRequest("ShopList Not Found")
        }

        findShopList.shopListName = body.shopListName;
        findShopList.description = body.description;
        await findShopList.save();
        res.send({
            success: true
        })
    } catch (error) {
        console.log("Cant update shoplist", error)
        next(error)
    }
}
const updateShopListItem = async (req: Request<{}, {}, UpdateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.itemId) {
            throw createError.BadRequest("shopListId Required")
        }
        if (!body.itemName) {
            throw createError.BadRequest("List Name Required")
        }
        // if (!body.description) {
        //     throw createError.BadRequest("List Info Required")
        // }

        const findShopListItem = await ShopListItem.findByPk(body.itemId)

        if (!findShopListItem) {
            throw createError.BadRequest("No ShopListItem found");
        }

        findShopListItem.itemName = body.itemName;
        findShopListItem.description = body.description;
        findShopListItem.quantity = body.quantity;
        findShopListItem.price = body.price;
        await findShopListItem.save();
        res.send({ success: true })
    } catch (error) {
        console.log("Cant update shoplistItem", error)
        next(error)
    }
}

const updateShopListItemState = async (req: Request<{}, {}, UpdateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.itemId) {
            throw createError.BadRequest("shopListId Required")
        }

        if (!body.isCompleted == null || body.isCompleted == undefined) {
            throw createError.BadRequest("isCompleted Required")
        }

        const findShopListItem = await ShopListItem.findByPk(body.itemId)

        if (!findShopListItem) {
            throw createError.BadRequest("No ShopListItem found");
        }

        findShopListItem.state = body.isCompleted ? "completed" : "not-completed";
        await findShopListItem.save();
        res.send({
            success: true
        })
    } catch (error) {
        console.log("Cant update shoplistItemState", error)
        next(error)
    }
}


const getAllShopList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const query = req.query;
        const findUser = await User.findByPk(userId)
        const isCompleted = query.isCompleted;

        if (!findUser) {
            throw createError.BadRequest("User Not Found")
        }
        const allShopLists = await findUser.getShopLists({
            include: {
                model: ShopListItem,
                as: 'shopListItems',
            },
            // where: {
            //     state: isCompleted === "isCompleted" ? 'completed' : "not-completed",
            // }
        })
        const updatedList = mapToJSON(allShopLists)?.map(item => ({
            shopListId: item.shopListId,
            shopListName: item.shopListName,
            description: item.description,
            state: item.state,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            userId: item.userId,
            isCompleted: item.shopListItems?.length
                ? item.shopListItems.every(i => i?.state === 'completed')
                : false
        }));


        if (isCompleted === 'isCompleted') {
            let completedList = updatedList?.filter((item) => {
                if (item.isCompleted === true) {
                    return item
                }
            })
            res.send({
                shopList: completedList
            })
        } else {
            let notCompletedList = updatedList?.filter((item) => {
                if (item.isCompleted === false) {
                    return item
                }
            })
            res.send({
                shopList: notCompletedList
            })
        }
    } catch (error) {
        console.log("Get All Shop List Error: " + error);
        next(error)
    }
}

const getAllShopListItems = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const shopListId = req.params.shopListId;
        //@ts-ignore
        const shopList = await ShopList.findByPk(shopListId)
        const query = req.query;
        const isCompleted = query.isCompleted;
        let isOwner = null;

        //@ts-ignore
        const userId = req.payLoad.aud
        if (!shopList) {
            throw createError.BadRequest("ShopList Not Found")
        }

        isOwner = await ShopList.findOne({
            where: { userId: userId, shopListId: shopListId }
        });

        const shopListItem = await shopList.getShopListItems({
            where: {
                state: isCompleted === "isCompleted" ? 'completed' : "not-completed"
            }
        })

        const sharedWith = await UserShopList.findAll({
            where: { shopListId: shopListId },
            include: {
                model: User,
                as: 'user',
                // include: {
                //     model: ShopListItem,
                //     as: 'shopListItems',
                // },
            },
        });

        res.send({ shopList, shopListItem, sharedWith, isOwner: isOwner ? true : false });
    } catch (error) {
        console.log("Get All Shop List Error: " + error);
        next(error)
    }
}

const addShopListItem = async (req: Request<{}, {}, CreateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        const findShopList = await ShopList.findByPk(req.body.shopListId)

        if (!findShopList) {
            throw createError.BadRequest("Shop List Not Found")
        }

        const body = req.body;
        if (!body.itemName) {
            throw createError.BadRequest("Item Name Required")
        }
        // if (!body.description) {
        //     throw createError.BadRequest("Item Info Required")
        // }
        const newShopListItem = await findShopList.createShopListItem({
            itemName: body.itemName,
            description: body.description ?? "",
            quantity: body.quantity,
            price: body.price,
        })

        res.status(201).json({
            success: true
        })
    } catch (error) {
        console.log("Add Shop List Item Error: " + error);
        next(error)
    }
}

const shareShopListWithUser = async (req: Request<{}, {}, ShareShopListType>, res: Response, next: NextFunction) => {
    try {
        const shopList = await ShopList.findByPk(req.body.shopListId)
        const shopListId = req.body.shopListId
        if (!shopList) {
            throw new Error("ShopList not found");
        }
        const sharedUserId = req.body.sharedUserId;
        //@ts-ignore
        const userId = req.payLoad.aud

        if (userId === sharedUserId) {
            throw createError.BadRequest("You can't share a list with yourself")
        }

        const isOwner = await ShopList.findOne({
            where: { userId: userId, shopListId: shopListId }
        });

        if (!isOwner) {
            throw createError.BadRequest("You don't have permission to share this list")
        }

        if (!req.body.sharedUserId) {
            throw createError.BadRequest("Shared User Id Required")
        }

        const sharedUser = await UserShopList.findOne({
            where: { userId: req.body.sharedUserId, shopListId: shopListId }
        });

        if (sharedUser) {
            throw createError.BadRequest("User already shared this list")
        }

        const findUser = await User.findByPk(req.body.sharedUserId)
        if (!findUser) {
            throw createError.BadRequest("User not found")
        }

        await UserShopList.create({
            userId: req.body.sharedUserId,
            shopListId: req.body.shopListId
        });
        res.send({ success: true })
    } catch (error) {
        console.log("Add Shop List Item Error: " + error);
        next(error)
    }
}

//* User Shared List
const getMyShareList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const myShareLists = await UserShopList.findAll({
            where: { userId: userId },
            include: {
                model: ShopList,
                as: 'shopList',
                // include: {
                //     model: ShopListItem,
                //     as: 'shopListItems',
                // },
            },
        });
        res.send({ sharedUserList: myShareLists });
    } catch (error) {
        console.log("Get My Share List Error: " + error);
        next(error)
    }
}

const getSharedUserList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        // const userId = req.payLoad.aud
        // const sharedUserList = await ShopList.findAll({
        //     include: {
        //         model: UserShopList,
        //         as: 'userShopList',
        //         where: { userId: userId },
        //         include: {
        //             model: User,
        //             as: 'user',
        //         },
        //     },
        // });
        // res.send({ sharedUserList });
        //@ts-ignore
        const shopListId = req.params.id;
        const shopList = await ShopList.findByPk(shopListId)

        if (!shopList) {
            throw createError.BadRequest("ShopList Not Found")
        }
        const sharedWith = await UserShopList.findAll({
            where: { shopListId: shopListId },
            include: {
                model: User,
                as: 'user',
                // include: {
                //     model: ShopListItem,
                //     as: 'shopListItems',
                // },
            },
        });
        res.send({ sharedUserList: sharedWith });
    } catch (error) {
        console.log("Get Shared User List Error: " + error);
        next(error)
    }
}

const getUserEmailList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        const query = req.query;

        const allUser = await User.findAll({
            attributes: ['userId', 'email'],
            where: {
                email: { [Op.like]: `%${query.search}%` },
            }
        });
        res.send({ users: allUser });
    } catch (error) {
        console.log("Get My Share List Error: " + error);
        next(error)
    }
}

const getAllCommonItems = async (req: Request<{}, {}, CreateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)

        if (!findUser) {
            throw createError.BadRequest("User Not Found")
        }

        const commonItems = await findUser.getCommonItems();

        res.send({ items: commonItems });
    } catch (error) {
        console.log("Get All Common Items Error: " + error);
        next(error)
    }
}

const addCommonItems = async (req: Request<{}, {}, CreateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)

        if (!findUser) {
            throw createError.BadRequest("User Not Found")
        }
        const body = req.body;
        console.log("addCommonItems --- ", body);

        if (!body.itemName) {
            throw createError.BadRequest("Item Name Required")
        }

        if (!body.description) {
            throw createError.BadRequest("Item Info Required")
        }

        const commonItem = await findUser.createCommonItem(body)

        if (!commonItem) {
            throw createError.BadRequest("Failed to create common item")
        }
        res.status(201).json({
            success: true
        })
    }
    catch (error) {
        console.log("addCommonItems Error: " + error);
        next(error)
    }
}

const updateComanItem = async (req: Request<{}, {}, UpdateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.itemId) {
            throw createError.BadRequest("itemId Required")
        }
        if (!body.itemName) {
            throw createError.BadRequest("List Name Required")
        }
        // if (!body.description) {
        //     throw createError.BadRequest("List Info Required")
        // }

        const commonItem = await CommonItem.findByPk(body.itemId)

        if (!commonItem) {
            throw createError.BadRequest("No ShopListItem found");
        }

        commonItem.itemName = body.itemName;
        commonItem.description = body.description;
        commonItem.quantity = body.quantity;
        commonItem.price = body.price;
        await commonItem.save();
        res.send({ success: true })
    } catch (error) {
        console.log("Cant update shoplistItem", error)
        next(error)
    }
}

const deleteComanItem = async (req: Request<{}, {}, UpdateShopListItemType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.itemId) {
            throw createError.BadRequest("itemId Required")
        }
        const commonItem = await CommonItem.findByPk(body.itemId)

        if (!commonItem) {
            throw createError.BadRequest("No ShopListItem found");
        }
        await commonItem.destroy();
        res.send({
            success: true
        })
    } catch (error) {
        console.log("Cant update shoplistItem", error)
        next(error)
    }
}

export {
    createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem, updateShopListItemState,
    deleteShopListItem, deleteShopList, shareShopListWithUser, getMyShareList, getSharedUserList,
    getUserEmailList, addCommonItems, updateComanItem, getAllCommonItems, deleteComanItem
}