export interface CreateAccountRequestType {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface CreateShopListType {
    shopListId?: string;
    shopListName?: string;
    description?: string;
    isCompleted?: boolean;
    itemName?: string;
    sharedUserId?: string;
}
export interface LoginRequestType {
    email?: string;
    password?: string;
}

