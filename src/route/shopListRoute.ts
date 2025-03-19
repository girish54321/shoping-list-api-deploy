import { Router } from 'express'
import { createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem, updateShopListItemState } from '../controller/shopListController'
const shopRoute = Router()

shopRoute.post("/create-list", createShopList)
shopRoute.post("/create-shop-item", addShopListItem)

shopRoute.get("/get-shop-list", getAllShopList)
shopRoute.get("/get-shop-list-items/:shopListId", getAllShopListItems)

shopRoute.put("/update-shop-list", updateShopList)

shopRoute.put("/update-shop-item", updateShopListItem)
shopRoute.put("/update-shop-list-state", updateShopListItemState)

export default shopRoute
