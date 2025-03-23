import createError = require('http-errors')
import { Request, Response, NextFunction } from 'express'
//@ts-ignore
import { User, ShopListItem, ShopList } from '../../models'
import { CreateShopListType } from '../types/authTypes'

const createShopList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)

        if (!findUser) {
            throw createError.BadRequest("User Not Found")
        }
        const body = req.body;
        if (!body.listName) {
            throw createError.BadRequest("List Name Required")
        }
        if (!body.listInfo) {
            throw createError.BadRequest("List Info Required")
        }
        const newShopList = await findUser.createShopList({
            listName: body.listName,
            //@ts-ignore
            listInfo: body.listInfo,
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

        if (!body.listName) {
            throw createError.BadRequest("List Name Required")
        }
        if (!body.listInfo) {
            throw createError.BadRequest("List Info Required")
        }
        const findShopList = await ShopList.findByPk(req.body.shopListId)

        if (!findShopList) {
            throw createError.BadRequest("ShopList Not Found")
        }

        findShopList.listName = body.listName;
        findShopList.listInfo = body.listInfo;
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
        if (!body.listName) {
            throw createError.BadRequest("List Name Required")
        }
        if (!body.listInfo) {
            throw createError.BadRequest("List Info Required")
        }

        const findShopListItem = await ShopListItem.findByPk(body.shopListId)

        if (!findShopListItem) {
            throw createError.BadRequest("No ShopListItem found");
        }

        findShopListItem.name = body.listName;
        findShopListItem.itemInfo = body.listInfo;
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
                state: isCompleted === "isCompleted" ? 'completed' : "not-completed"
            }
        })
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
        const findShopList = await ShopList.findByPk(req.params.shopListId)
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

        res.send({ allShopListItem })
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
        if (!body.listName) {
            throw createError.BadRequest("Item Name Required")
        }
        if (!body.listInfo) {
            throw createError.BadRequest("Item Info Required")
        }
        const newShopListItem = await findShopList.createShopListItem({
            name: body.listName,
            itemInfo: body.listInfo,
        })

        res.status(201).json({
            success: true
        })
    } catch (error) {
        console.log("Add Shop List Item Error: " + error);
        next(error)
    }
}


export { createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem, updateShopListItemState, deleteShopListItem, deleteShopList }