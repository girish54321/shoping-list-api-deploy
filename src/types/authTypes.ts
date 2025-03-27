export interface CreateAccountRequestType {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface CreateShopListType {
    shopListName?: string;
    description?: string;
    isCompleted?: boolean;
}

export interface UpdateShopListType {
    shopListId?: string;
    shopListName?: string;
    description?: string;
    isCompleted?: boolean;
}

export interface UpdateShopListItemType {
    itemId?: string;
    itemName?: string;
    description?: string;
    isCompleted?: boolean;
    quantity?: number;
    price?: number;
}

export interface CreateShopListItemType {
    shopListId?: string;
    itemName?: string;
    description?: string;
    quantity?: number;
    price?: number;
}

export interface ShareShopListType {
    shopListId?: string;
    sharedUserId?: string;
}
export interface LoginRequestType {
    email?: string;
    password?: string;
}

