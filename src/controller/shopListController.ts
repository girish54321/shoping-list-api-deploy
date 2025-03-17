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

        res.status(201).json(newShopList)
    } catch (error) {
        console.log("Create Account Error: " + error);
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
        res.send({ "message": "done" })
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

        findShopListItem.listName = body.listName;
        findShopListItem.listInfo = body.listInfo;
        await findShopListItem.save();
        res.send({ "message": "done" })

    } catch (error) {
        console.log("Cant update shoplistItem", error)
        next(error)
    }
}


const getAllShopList = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.payLoad.aud
        const findUser = await User.findByPk(userId)

        if (!findUser) {
            throw createError.BadRequest("User Not Found")
        }
        const allShopLists = await findUser.getShopLists()

        res.send(allShopLists)
    } catch (error) {
        console.log("Get All Shop List Error: " + error);
        next(error)
    }
}

const getAllShopListItems = async (req: Request<{}, {}, CreateShopListType>, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const findShopList = await ShopList.findByPk(req.params.shopListId)

        if (!findShopList) {
            throw createError.BadRequest("ShopList Not Found")
        }
        const allShopLists = await findShopList.getShopListItems()

        res.send({ findShopList, allShopLists })
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

        res.status(201).json(newShopListItem)
    } catch (error) {
        console.log("Add Shop List Item Error: " + error);
        next(error)
    }
}


export { createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem }