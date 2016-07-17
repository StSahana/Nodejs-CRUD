/**
 * Created by Administrator on 2016/7/10.
 */
var express = require('express');
var router = express.Router();
var UserController = require("../app/controllers/UserController");

router.get('/', UserController.contacts);


module.exports = router;