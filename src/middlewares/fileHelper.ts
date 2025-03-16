import fs = require('fs');
import { FileRequestType, StorageFileType } from '../types/todoType';

const deleteFile = (file: FileRequestType) => {
    if (fs.existsSync(file?.path)) {
        console.log("Delete file with path", file?.path);
        fs.unlinkSync(file?.path);
    } else {
        console.log("No file found with path", file?.path);
    }
    if (fs.existsSync(file?.fileName)) {
        console.log("Delete file with filename", file?.fileName);
        fs.unlinkSync(file?.fileName);
    } else {
        console.log("No file found with filename", file?.fileName);
    }
}

export const deleteFileStorage = (file: StorageFileType) => {
    if (fs.existsSync(file?.fileName)) {
        console.log("Delete file with filename", file?.fileName);
        fs.unlinkSync(file?.fileName);
    } else {
        console.log("No file found with filename", file?.fileName);
    }
}

export {
    deleteFile
}