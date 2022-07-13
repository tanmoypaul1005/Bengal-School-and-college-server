const app = require("express");

const { AddSuperAdmin, getSuperAdmin, AddStatus, SuperAdminLogin } = require("../../Controller/SuperAdmin/SuperAdminController");
const router = app.Router();

router.post('/superadmin/add', AddSuperAdmin);
router.post('/superadmin/login', SuperAdminLogin)
router.get('/superadmin', getSuperAdmin);
router.post('/superadmin/updatestatus/:id', AddStatus);

module.exports = router;