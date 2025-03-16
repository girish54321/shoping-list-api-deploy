const multer = require('multer')

export const getFileExtension = (filename) => {
    return filename?.split('.')?.pop();
}

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './todoimages')
    },
    filename: function (req, file, cb) {
        const userId = req.payLoad.aud
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueSuffix + '.' + getFileExtension(file.originalname))
    }
})

export const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './file')
    },
    filename: function (req, file, cb) {
        const userId = req.payLoad.aud
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueSuffix + '.' + getFileExtension(file.originalname))
    }
})

export const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './profileimage')
    },
    filename: function (req, file, cb) {
        console.log("file", file);
        const userId = req.payLoad.aud
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueSuffix + '.' + getFileExtension(file.originalname))
    }
})

export const uploadTodo = multer({ storage: storage })
export const uploadProfile = multer({ storage: profileImageStorage })
export const uploadFileMulter = multer({ storage: fileStorage })
