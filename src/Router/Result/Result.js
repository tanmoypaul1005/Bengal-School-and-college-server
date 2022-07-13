const app = require("express");
const { AddResult,getResult} = require("../../Controller/Result/ResultController");

const router = app.Router();

router.post('/student/result/add', AddResult);
router.post('/student/result/get',getResult)
module.exports = router;