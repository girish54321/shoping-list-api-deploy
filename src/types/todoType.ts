
export interface ToDoRequestType {
    toDoId?: string;
    title?: string;
    body?: string;
    state?: string;
}

export interface FileRequestType {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    destination?: string;
    filename?: string;
    fileName?: string;
    path?: string;
    size?: number;
}

export interface StorageFileType {
    fileId?: string;
    fileName?: string;
    fileSize?: string;
    type?: string;
    createdAt?: Date;
    updatedAt?: Date;
    toDoId?: string;
    userId?: string;
} 