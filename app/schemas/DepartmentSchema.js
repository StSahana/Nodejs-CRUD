/**
 * Created by Administrator on 2016/7/7.
 */
var mongodb = require("../mongodb");

var DepartmentSchema = new mongodb.mongoose.Schema({
    did: {
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    dname: String,
    description: String
});


module.exports = DepartmentSchema;