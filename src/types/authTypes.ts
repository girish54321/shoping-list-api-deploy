export interface CreateAccountRequestType {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface CreateShopListType {
    shopListId?: string;
    listName?: string;
    listInfo?: string;
}
export interface LoginRequestType {
    email?: string;
    password?: string;
}

