/**
 * Created by Administrator on 2016/7/7.
 */
var UserModel = require("../models/UserModel");
var mongodb = require("../mongodb");
var bcryptjs = require("bcryptjs");
var transliteration=require('transliteration');


/**
 * 用户列表
 * @param req
 * @param res
 */
exports.userList1= function (req, res) {

    UserModel.find({}, function (err, users) {
            if (err) {
                res.send(
                    {
                        "status": {
                            "statusCode": 500,
                            "information": "Internal Server Error"
                        }
                    }
                );
            } else {
                res.send({
                    "status": {
                        "statusCode": 200,
                        "information": "success"
                    },
                    "data": users
                });
            }
        })
        
};

exports.userList = function (req, res) {

    UserModel.find({},function (err, users) {
        if (err) {
            res.send(
                {
                    "status": {
                        "statusCode": 500,
                        "information": "Internal Server Error"
                    }
                }
            );
        } else {
            var userSection={"A":[], "B":[], "C":[],"D":[],"E":[],"F":[],"G":[],
                "H":[],"I":[],"J":[],"K":[],"L":[],"M":[],"N":[],"O":[],"P":[],"Q":[],"R":[],"S":[],"T":[],"U":[],
                "V":[],"W":[],"X":[],"Y":[],"Z":[]
            }

            for(var i=0;i<users.length;i++){
               switch(transliteration.transliterate(users[i].name).toUpperCase()[0]){
                   case "A":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "B":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "C":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "D":
                   userSection.A[userSection.A.length]=users[i];
                   break;
                   case "E":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "F":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "G":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "H":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "I":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "J":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "K":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "L":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "M":
                   userSection.A[userSection.A.length]=users[i];
                   break;
                   case "N":
                   userSection.A[userSection.A.length]=users[i];
                   break;
                   case "O":
                   userSection.A[userSection.A.length]=users[i];
                   break;
                   case "P":
                   userSection.A[userSection.A.length]=users[i];
                   break;
                   case "Q":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "R":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "S":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "T":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "U":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "V":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "W":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "X":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "Y":
                       userSection.A[userSection.A.length]=users[i];
                       break;
                   case "Z":
                       userSection.A[userSection.A.length]=users[i];
                       break;
               }
            }



            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": userSection
            });
        }
    })
        //.sort(transliteration.transliterate(user.name))

};

/**
 * 联系人
 * @param req
 * @param res
 */
exports.contacts = function (req, res) {

    UserModel.find({}, 'name telnumber worknumber', function (err, users) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }

            });
        } else {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": users
            });
        }

    })
};

/**
 *type==0，通过UID获取用户信息
 * type==1，通过DID获取用户信息
 * @param req
 * @param res
 */
exports.findUserByxid = function (req, res) {
    if (req.query.type == 0) {
        UserModel.find({uid: req.params.id}, function (err, data) {
            if (err) {
                console.log(err);
                res.send({
                    "status": {
                        "statusCode": 500,
                        "information": "Internal Server Error"
                    }
                });
            }
            if (data) {
                res.send({
                    "status": {
                        "statusCode": 200,
                        "information": "success"
                    },
                    "data": data
                });
            }
        });
    }
    ;
    if (req.query.type == 1) {
        UserModel.find({did: Number(req.params.id)}, function (err, users) {
            if (err) {
                res.send({
                    "status": {
                        "statusCode": 500,
                        "information": "Internal Server Error"
                    }

                });
            }
            if (users) {
                res.send({
                    "status": {
                        "statusCode": 200,
                        "information": "success"
                    },
                    "data": users
                });
            }
        })
    }
    ;
    if (req.query.type == 2) {
        console.log("/" + req.params.id + "/");
        UserModel.find({name: new RegExp(req.params.id)}, function (err, users) {
            if (err) {
                res.send({
                    "status": {
                        "statusCode": 500,
                        "information": "Internal Server Error"
                    }

                });
            }
            if (users) {
                res.send({
                    "status": {
                        "statusCode": 200,
                        "information": "success"
                    },
                    "data": users
                });
            }
        });
    }
};

/**
 * 获取用户信息UID
 * @param req
 * @param res
 */
exports.findUserByUid = function (req, res) {
    UserModel.find({uid: req.query.uid}, function (err, user) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }
            });
        }
        if (user) {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": user
            });
        }
    });

};

/**
 * 获取用户信息DID
 * @param req
 * @param res
 */
exports.findUserByDid = function (req, res) {
    UserModel.find({did: Number(req.query.did)}, function (err, users) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }

            });
        }
        if (users) {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": users
            });
        }
    });

};

/**
 * 获取用户信息NAME
 * @param req
 * @param res
 */
exports.findUserByName = function (req, res) {
    UserModel.find({name: new RegExp(req.query.name)}, function (err, users) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }
            });
        }
        if (users) {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": users
            });
        }
    });
}

/**
 * 删除数据_ID
 * @param req
 * @param res
 */
exports.delete = function (req, res) {
    console.log(req.params.uid);
    UserModel.remove({uid: req.params.uid}, function (err) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }
            });
        } else {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                }
            });
        }

    });
};

/**
 * 用户注册
 * @param req
 * @param res
 */
exports.userRegister = function (req, res) {
    var userEntity = new UserModel({
        uid: req.body.uid,
        did: req.body.did,
        name: req.body.name,
        password: req.body.password,
        sex: req.body.sex,
        telnumber: req.body.telnumber || "",
        worknumber: req.body.worknumber || "",
        role: req.body.role || 0,
        email: req.body.email || ""
    });
    UserModel.find({uid: req.body.uid}, function (err, user) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }

            });
        }
        if (user.length != 0) {
            res.send({
                "status": {
                    "statusCode": 400,
                    "information": "the user has already registered"
                }

            });
        } else {
            userEntity.save(function (err) {
                if (err) {
                    res.send({
                        "status": {
                            "statusCode": 500,
                            "information": "Internal Server Error"
                        }

                    });
                } else {
                    res.send({
                        "status": {
                            "statusCode": 200,
                            "information": "success"
                        }

                    });
                }
            });
        }

    })


};


/**
 * 更新数据
 * @param req
 * @param res
 */
exports.userUpdate = function (req, res) {
    UserModel.findOne({uid: req.params.uid}, function (err, user) {
        user.did = Number(req.body.did);
        user.name = req.body.name;
        user.password = req.body.password;
        user.sex = req.body.sex;
        user.telnumber = req.body.telnumber || "";
        user.worknumber = req.body.worknumber || "";
        user.role = Number(req.body.role) || 0;
        user.email = req.body.email || "";

        user.save(function (err) {
            if (err) {
                console.log(err);
                res.send({
                    "status": {
                        "statusCode": 500,
                        "information": "Internal Server Error"
                    }

                });
            } else {
                res.send({
                    "status": {
                        "statusCode": 200,
                        "information": "success"
                    }

                });
            }
        })


    })
};


/**
 * 用户登录
 * @param req
 * @param res
 */
exports.userLogin = function (req, res) {

    UserModel.findOne({uid: req.body.uid}, function (err, user) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }

            });
        }
        if (user) {
            bcryptjs.compare(req.body.password, user.password, function (err, isMatch) {
                if (err) {
                    res.send({
                        "status": {
                            "statusCode": 500,
                            "information": "Internal Server Error"
                        }

                    });
                } else {
                    if (isMatch) {

                        req.session.uid = user.uid;
                        req.session.password = user.password;
                        res.send({
                            "status": {
                                "statusCode": 200,
                                "information": "success"
                            }

                        });
                    } else {
                        res.send({
                            "status": {
                                "statusCode": 401,
                                "information": "password does not match"
                            }

                        });
                    }
                }
            })
        } else {
            res.send({
                "status": {
                    "statusCode": 402,
                    "information": "user does not exit"
                }

            });
        }

    })

};

/**
 * 用户登出
 * @param req
 * @param res
 * @returns {{statusCode: number, information: string}}
 */
exports.userLogout = function (req, res) {

    deleteSession(req, res, function (err) {
        if (err) {
            res.send({
                "status": {
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }

            });
        } else {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                }

            });
        }
    })
};
var deleteSession = function (req, res, cb) {
    delete req.session.uid;
    delete req.session.password;
    cb();
};