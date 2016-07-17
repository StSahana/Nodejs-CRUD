var express = require('express');
var router = express.Router();
var UserController = require("../app/controllers/UserController");
/* GET users listing. */
router.get('/', UserController.userList);

router.get('/logout', UserController.userLogout);

router.get('/uid', UserController.findUserByUid);
router.get('/did', UserController.findUserByDid);
router.get('/name',UserController.findUserByName);
router.get('/:id', UserController.findUserByxid);

router.delete('/delete/:uid', UserController.delete);

router.post("/", UserController.userRegister);
router.post("/login", UserController.userLogin);
router.post('/update/:uid', UserController.userUpdate);


module.exports = router;
