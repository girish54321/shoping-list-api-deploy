import { Router } from 'express'
import { createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem, updateShopListItemState, deleteShopListItem, deleteShopList } from '../controller/shopListController'
const shopRoute = Router()

shopRoute.post("/create-list", createShopList)
shopRoute.post("/create-shop-item", addShopListItem)

shopRoute.get("/get-shop-list", getAllShopList)
shopRoute.get("/get-shop-list-items/:shopListId", getAllShopListItems)

shopRoute.put("/update-shop-list", updateShopList)
shopRoute.put("/update-shop-item", updateShopListItem)
shopRoute.put("/update-shop-list-state", updateShopListItemState)

shopRoute.delete("/delete-shop-list-item:/id", deleteShopListItem);
shopRoute.delete("/delete-shop-list:/id", deleteShopList);

export default shopRoute
