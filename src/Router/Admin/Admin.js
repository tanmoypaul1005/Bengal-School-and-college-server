const app = require("express");
const { AddAdmin, getAdmin } = require("../../Controller/Admin/AdminController");
const router = app.Router();

router.post('/admin/add', AddAdmin);
router.get('/admin', getAdmin);

module.exports = router;