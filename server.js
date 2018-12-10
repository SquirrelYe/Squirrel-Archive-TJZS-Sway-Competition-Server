const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mail = require('./mail/mail')
const test = require('./interface/test/test')
const admin = require('./interface/user&admin/admin')
const sway = require('./interface/user&admin/sway')
const log=require('./log/log')
const company=require('./interface/user&admin/company')
const officer=require('./interface/user&admin/officer')
const user=require('./interface/user/user')
const system=require('./interface/system/system')
const game=require('./interface/game/game')
const admininit=require('./interface/initial/admininit')
const commerland=require('./interface/initial/commerland')
const digger=require('./interface/initial/digger')
const factory=require('./interface/initial/factory')
const indusland=require('./interface/initial/indusland')
const line=require('./interface/initial/line')
const mining=require('./interface/initial/mining')
const research=require('./interface/initial/research')
const source=require('./interface/initial/source')
const commerasset=require('./interface/operation/commerasset')
const commerresearch=require('./interface/operation/commerresearch')
const companyinit=require('./interface/operation/companyinit')
const compete=require('./interface/operation/compete')
const factorysetting=require('./interface/operation/factorysetting')
const fixed=require('./interface/operation/fixed')
const industoryyield=require('./interface/operation/industoryyield')
const industryproduct=require('./interface/operation/industryproduct')
const loan=require('./interface/operation/loan')
const miniasset=require('./interface/operation/miniasset')
const miniproduct=require('./interface/operation/miniproduct')
const miniyield=require('./interface/operation/miniyield')
const transaction=require('./interface/operation/transaction')
const statistic=require('./interface/competition&statistical/statistic')


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

server.use('/admin', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) admin.login(req, res)
});

server.use('/sway', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) company.login(req, res)
});

server.use('/company', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) company.findAll(req, res)
});
server.use('/officer', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) officer.findAll(req, res)
});
server.use('/user', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) user.findAll(req, res)
});
server.use('/system', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) system.findAll(req, res)
});
server.use('/commerasset', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) commerasset.findAll(req, res)
});
server.use('/commerresearch', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) commerresearch.findAll(req, res)
});
server.use('/companyinit', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) companyinit.findAll(req, res)
});
server.use('/compete', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) compete.findAll(req, res)
});
server.use('/factorysetting', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) factorysetting.findAll(req, res)
});
server.use('/fixed', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) fixed.findAll(req, res)
});
server.use('/industoryyield', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) industoryyield.findAll(req, res)
});
server.use('/industryproduct', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) industryproduct.findAll(req, res)
});
server.use('/loan', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) loan.findAll(req, res)
});
server.use('/miniasset', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) miniasset.findAll(req, res)
});
server.use('/miniproduct', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) miniproduct.findAll(req, res)
});
server.use('/miniyield', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) miniyield.findAll(req, res)
});
server.use('/transaction', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) transaction.findAll(req, res)
});
server.use('/admininit', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) admininit.findAll(req, res)
});
server.use('/commerland', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) commerland.findAll(req, res)
});
server.use('/digger', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) digger.findAll(req, res)
});
server.use('/factory', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) factory.findAll(req, res)
});
server.use('/indusland', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) indusland.findAll(req, res)
});
server.use('/line', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) line.findAll(req, res)
});
server.use('/mining', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) mining.findAll(req, res)
});
server.use('/research', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) research.findAll(req, res)
});
server.use('/source', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) source.findAll(req, res)
});
server.use('/game', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) game.findAll(req, res)
});
server.use('/statistic', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) statistic.findAll(req, res)
});


server.use('/mail',function(req,res){    
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  mail.register(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
})
