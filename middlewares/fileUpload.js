const multer = require('multer')


const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().split('.')[0] + ":" + "." + file.mimetype.split('/')[1])
    }
},
)


const upload = multer({ storage: fileStorage })
module.exports = upload