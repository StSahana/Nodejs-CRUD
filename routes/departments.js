/**
 * Created by Administrator on 2016/7/7.
 */
var express = require('express');
var router = express.Router();
var DepartmentController = require("../app/controllers/DepartmentController");


router.get('/', DepartmentController.departmentList);

router.get('/did',DepartmentController.findDepartmentByDid);
router.get('/dname', DepartmentController.findDepartmentByDname);

module.exports = router;