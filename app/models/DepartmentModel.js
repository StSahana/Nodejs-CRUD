/**
 * Created by Administrator on 2016/7/7.
 */
var mongodb = require("../mongodb");
var DepartmentSchema = require('../schemas/DepartmentSchema');
var DepartmentModel = mongodb.mongoose.model('department', DepartmentSchema);


module.exports = DepartmentModel;