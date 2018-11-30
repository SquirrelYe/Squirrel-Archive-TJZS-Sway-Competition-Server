const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mail = require('./mail/mail')
const test = require('./interface/test/test')
const users = require('./interface/users/users')
const log=require('./log/log')

var objmulter = multer({
    dest: "./www/upload"
}); //dest指定上传文件地址
var pathlib = path;

var server = express();
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(objmulter.any());
server.use(express.static(__dirname));
server.listen(11111);

server.use(log.log4js.connectLogger(log.loggerExpress))

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(express.static(__dirname));

server.use('/', function (req, res, next) {
    next();
});
server.get('/index', function (req, res) {
    res.redirect('./WWW/cs.html');
});

server.use('/test', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    test.update(req, res)
});

server.use('/users', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.query.judge == 0) users.login(req, res);
    if (req.query.judge == null) res.redirect('./WWW/404/QYZQ.html');
});