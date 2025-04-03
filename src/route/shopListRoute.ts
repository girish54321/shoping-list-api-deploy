import { Router } from 'express'
import {
    createShopList, addShopListItem, getAllShopList, getAllShopListItems, updateShopList, updateShopListItem, updateShopListItemState, deleteShopListItem,
    deleteShopList, shareShopListWithUser, getMyShareList,
    getSharedUserList, updateComanItem, deleteComanItem,
    getUserEmailList, addCommonItems, getAllCommonItems
} from '../controller/shopListController'
const shopRoute = Router()

shopRoute.post("/create-list", createShopList)
shopRoute.post("/create-shop-item", addShopListItem)

shopRoute.get("/get-shop-list", getAllShopList)
shopRoute.get("/get-shop-list-items/:shopListId", getAllShopListItems)

shopRoute.put("/update-shop-list", updateShopList)
shopRoute.put("/update-shop-item", updateShopListItem)
shopRoute.put("/update-shop-list-state", updateShopListItemState)

shopRoute.delete("/delete-shop-list-item/:id", deleteShopListItem);
shopRoute.delete("/delete-shop-list/:id", deleteShopList);

shopRoute.post("/share-shop-list", shareShopListWithUser);

shopRoute.get("/share-shop-list", getMyShareList)

shopRoute.get("/share-shop-list/:id", getSharedUserList)

shopRoute.get("/user-list", getUserEmailList)

shopRoute.post("/add-common-items", addCommonItems);
shopRoute.put("/update-common-items", updateComanItem);

shopRoute.get("/get-common-items", getAllCommonItems)

shopRoute.delete("/delete-common-items", deleteComanItem)

export default shopRoute
