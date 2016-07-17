/**
 * Created by Administrator on 2016/7/7.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:8181/compApp');
exports.mongoose = mongoose;
