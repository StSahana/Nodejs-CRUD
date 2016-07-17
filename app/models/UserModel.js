/**
 * Created by Administrator on 2016/7/7.
 */
var mongodb = require("../mongodb");
var userSchema = require('../schemas/UserSchema');
var UserModel = mongodb.mongoose.model('user', userSchema);

module.exports = UserModel;
