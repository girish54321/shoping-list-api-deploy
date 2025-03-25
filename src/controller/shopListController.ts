import createError = require('http-errors')
import { Request, Response, NextFunction } from 'express'
//@ts-ignore
import { User, ShopListItem, ShopList, UserShopList } from '../../models'
import { CreateShopListType } from '../types/authTypes'
import mapToJSON from '../helper/mapToJson'

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
            //@ts-ignore
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

const updateShopList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
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
const updateShopListItem = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.shopListId) {
            throw createError.BadRequest("shopListId Required")
        }
        if (!body.itemName) {
            throw createError.BadRequest("List Name Required")
        }
        if (!body.description) {
            throw createError.BadRequest("List Info Required")
        }

        const findShopListItem = await ShopListItem.findByPk(body.shopListId)

        if (!findShopListItem) {
            throw createError.BadRequest("No ShopListItem found");
        }

        findShopListItem.itemName = body.itemName;
        findShopListItem.description = body.description;
        await findShopListItem.save();
        res.send({ success: true })
    } catch (error) {
        console.log("Cant update shoplistItem", error)
        next(error)
    }
}

const updateShopListItemState = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body.shopListId) {
            throw createError.BadRequest("shopListId Required")
        }

        if (!body.isCompleted == null || body.isCompleted == undefined) {
            throw createError.BadRequest("isCompleted Required")
        }

        const findShopListItem = await ShopListItem.findByPk(body.shopListId)

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
            where: {
                state: isCompleted === "isCompleted" ? 'completed' : "not-completed",
            }
        })
        //todo:

        const responseObj = mapToJSON(allShopLists);
        // console.log(responseObj[0].shopListItems);


        res.send({
            allShopLists: allShopLists
        })
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
        const findShopList = await ShopList.findByPk(shopListId)
        const query = req.query;
        const isCompleted = query.isCompleted;

        if (!findShopList) {
            throw createError.BadRequest("ShopList Not Found")
        }
        const allShopListItem = await findShopList.getShopListItems({
            where: {
                state: isCompleted === "isCompleted" ? 'completed' : "not-completed"
            }
        })

        const myShareLists = await UserShopList.findAll({
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

        res.send({ findShopList, allShopListItem, myShareLists })
    } catch (error) {
        console.log("Get All Shop List Error: " + error);
        next(error)
    }
}

const addShopListItem = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        const findShopList = await ShopList.findByPk(req.body.shopListId)

        if (!findShopList) {
            throw createError.BadRequest("Shop List Not Found")
        }

        const body = req.body;
        if (!body.itemName) {
            throw createError.BadRequest("Item Name Required")
        }
        if (!body.description) {
            throw createError.BadRequest("Item Info Required")
        }
        const newShopListItem = await findShopList.createShopListItem({
            name: body.itemName,
            itemInfo: body.description,
        })

        res.status(201).json({
            success: true
        })
    } catch (error) {
        console.log("Add Shop List Item Error: " + error);
        next(error)
    }
}

const shareShopListWithUser = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        const shopList = await ShopList.findByPk(req.body.shopListId)
        const shopListId = req.body.shopListId
        if (!shopList) {
            throw new Error("ShopList not found");
        }
        //@ts-ignore
        const userId = req.payLoad.aud

        // Ensure the owner is the one sharing
        const isOwner = await ShopList.findOne({
            where: { userId: userId, shopListId: shopListId }
        });

        if (!isOwner) {
            throw createError.BadRequest("You don't have permission to share this list")
        }

        if (!req.body.sharedUserId) {
            throw createError.BadRequest("Shared User Id Required")
        }

        // Check if user already shared the list
        const sharedUser = await UserShopList.findOne({
            where: { userId: req.body.sharedUserId, shopListId: shopListId }
        });

        if (sharedUser) {
            throw createError.BadRequest("User already shared this list")
        }

        // Check if the user exists
        const findUser = await User.findByPk(req.body.sharedUserId)
        if (!findUser) {
            throw createError.BadRequest("User not found")
        }

        // Add shared user
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
        const usersJSON = myShareLists.map(user => user.toJSON()); // Convert to JSON
        console.log(usersJSON);
        res.send({ myShareLists });
    } catch (error) {
        console.log("Get My Share List Error: " + error);
        next(error)
    }
}

export {
    createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem, updateShopListItemState,
    deleteShopListItem, deleteShopList, shareShopListWithUser, getMyShareList
}