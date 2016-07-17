/**
 * Created by Administrator on 2016/7/7.
 */
var mongodb = require("../mongodb");
var bcryptjs = require("bcryptjs");
var SALT_WORK_FACTOR = 10;
var userSchema = new mongodb.mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    uid: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    did: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        enum: ['男', '女']
    },
    telnumber: {
        type: String
    },
    worknumber: {
        typr: String
    },
    email: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

});



userSchema.pre("save", function (next) {
    var user = this;

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcryptjs.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next()
        })
    })
});

userSchema.static('fetch',function(callback){
    return this
        .find({})
        .sort('name')
        .exec(callback)
   
})

module.exports = userSchema;