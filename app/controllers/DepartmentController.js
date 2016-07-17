/**
 * Created by Administrator on 2016/7/7.
 */
var mongoose = require("mongoose");
var DepartmentModel = require("../models/DepartmentModel");

exports.departmentList = function (req, res) {

    DepartmentModel.find({}, function (err, departments) {
        if (err) {
            res.send({
                "status":{
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
                "data": departments
            })
        }
        ;
    })
};

exports.findDepartmentByDid = function (req, res) {
    DepartmentModel.find({did: Number(req.query.did)}, function (err, departments) {
        if (err) {
            res.send({
                "status":{
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }
                
            });
        }
        if (departments) {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": departments
            });
        }
    });

};

exports.findDepartmentByDname=function (req,res) {
    console.log(req.query.dname);
    DepartmentModel.findOne({dname: req.query.dname}, function (err, departments) {
        if (err) {
            console.log(err);
            res.send({
                "status":{
                    "statusCode": 500,
                    "information": "Internal Server Error"
                }

            });
        }
        if (departments) {
            res.send({
                "status": {
                    "statusCode": 200,
                    "information": "success"
                },
                "data": departments
            });
        }
    });


}