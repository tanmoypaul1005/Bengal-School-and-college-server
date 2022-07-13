const app = require("express");
const { AddClasslacture } = require("../../Controller/Classlacture/ClasslactureController");
const router = app.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const { uploadS3 } = require("../../Middleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post('/classlacture/add', uploadS3.array("note"), AddClasslacture);

module.exports = router;