const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mail = require('./mail/mail')
const test = require('./interface/test/test')
const log=require('./log/log')

const admin = require('./interface/user&admin/admin')
const sway = require('./interface/user&admin/sway')
const company=require('./interface/user&admin/company')
const user=require('./interface/user/user')
const game=require('./interface/game/game')
const commerland=require('./interface/initial/commerland')
const digger=require('./interface/initial/digger')
const factory=require('./interface/initial/factory')
const indusland=require('./interface/initial/indusland')
const line=require('./interface/initial/line')
const mining=require('./interface/initial/mining')
const research=require('./interface/initial/research')
const source=require('./interface/initial/source')
const commerresearch=require('./interface/operation/commerresearch')
const compete=require('./interface/operation/compete')
const industryyield=require('./interface/operation/industryyield')
const loan=require('./interface/operation/loan')
const miniyield=require('./interface/operation/miniyield')
const transaction=require('./interface/operation/transaction')
const statistic=require('./interface/competition&statistical/statistic')
const oem=require('./interface/operation/oem')
const avemining=require('./interface/game/avemining')
const aveindusland=require('./interface/game/aveindusland')
const avecommerland=require('./interface/game/avecommerland')

//关系
const route=require('./route/route')

//测试
const oneToOne=require('./interface/test/oneToOne')
const oneToMany=require('./interface/test/oneToMany')
const manyToMany=require('./interface/test/manyToMany')

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
// 加载外部router
server.use('/ass',route);

server.get('/index', function (req, res) {
    res.redirect('./WWW/cs.html');
});

server.use('/admin', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) admin.login(req, res)
    if(req.query.judge==1) admin.findAll(req, res)
    if(req.query.judge==2) admin.delete(req,res)
    if(req.query.judge==3) admin.findById(req,res)
});
server.use('/sway', function (req, res) { //用户
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) sway.findAll(req, res)
    if(req.query.judge==1) sway.selectNameFirst(req, res)
    if(req.query.judge==2) sway.selectUsersByEmail(req, res)
    if(req.query.judge==3) sway.login(req, res)
    if(req.query.judge==4) sway.create(req, res)
    if(req.query.judge==5) sway.updatePass(req, res)
    if(req.query.judge==6) sway.delete(req,res)
    if(req.query.judge==7) sway.update(req,res)
    if(req.query.judge==8) sway.findById(req,res)
    if(req.query.judge==9) sway.selectUsersHaveCompany(req,res)
    if(req.query.judge==10) sway.findByCompanyId(req,res)
    if(req.query.judge==11) sway.updateOffice(req,res)
});
server.use('/company', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) company.findAll(req, res)
    if(req.query.judge==1) company.create(req,res)
    if(req.query.judge==2) company.update(req,res)
    if(req.query.judge==3) company.delete(req,res)
    if(req.query.judge==4) company.findById(req,res)
});
server.use('/user', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) user.findAll(req, res)
    if(req.query.judge==1) user.create(req,res)
    if(req.query.judge==2) user.update(req,res)
    if(req.query.judge==3) user.delete(req,res)
});
server.use('/system', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) system.findAll(req, res)
    if(req.query.judge==1) system.create(req,res)
    if(req.query.judge==2) system.update(req,res)
    if(req.query.judge==3) system.delete(req,res)
});
server.use('/commerresearch', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) commerresearch.findAll(req, res)
    if(req.query.judge==1) commerresearch.create(req,res)
    if(req.query.judge==2) commerresearch.update(req,res)
    if(req.query.judge==3) commerresearch.delete(req,res)
    if(req.query.judge==4) commerresearch.findByYl(req,res)
    if(req.query.judge==5) commerresearch.findAllByCompany(req,res)
//    if(req.query.judge==6) commerresearch.findByCom(req,res)
    if(req.query.judge==7) commerresearch.findById(req,res)
});
server.use('/compete', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) compete.findAll(req,res)
    if(req.query.judge==1) compete.create(req,res)
    if(req.query.judge==2) compete.update(req,res)
    if(req.query.judge==3) compete.delete(req,res)
    if(req.query.judge==4) compete.updatePrice(req,res)
    if(req.query.judge==5) compete.findMaxPrice(req,res)
    if(req.query.judge==6) compete.findByCompanyId(req,res)
    if(req.query.judge==7) compete.findOneByPrice(req,res)
});
server.use('/industryyield', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) industryyield.findAll(req, res)
    if(req.query.judge==1) industryyield.create(req,res)
    if(req.query.judge==2) industryyield.update(req,res)
    if(req.query.judge==3) industryyield.delete(req,res)
    if(req.query.judge==4) industryyield.findByCompany(req,res)
    if(req.query.judge==5) industryyield.findByPublic(req,res)
    if(req.query.judge==6) industryyield.updateSum(req,res)
});
server.use('/loan', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) loan.findAll(req, res)
    if(req.query.judge==1) loan.create(req,res)
    if(req.query.judge==2) loan.update(req,res)
    if(req.query.judge==3) loan.delete(req,res)
    if(req.query.judge==4) loan.findByCompany(req,res)
});

server.use('/miniyield', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) miniyield.findAll(req, res)
    if(req.query.judge==1) miniyield.create(req,res)
    if(req.query.judge==2) miniyield.update(req,res)
    if(req.query.judge==3) miniyield.delete(req,res)
    if(req.query.judge==4) miniyield.findByCompany(req,res)
    if(req.query.judge==5) miniyield.findByPublic(req,res)
    if(req.query.judge==6) miniyield.updateSum(req,res)
});
server.use('/transaction', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) transaction.findAll(req, res)
    if(req.query.judge==1) transaction.create(req,res)
    if(req.query.judge==2) transaction.update(req,res)
    if(req.query.judge==3) transaction.delete(req,res)
    if(req.query.judge==4) transaction.findCommer(req,res)
    if(req.query.judge==5) transaction.findSource(req,res)
    if(req.query.judge==6) transaction.findByCommer(req,res)
    if(req.query.judge==7) transaction.findBySource(req,res)
    if(req.query.judge==8) transaction.findByCompany(req,res)
    if(req.query.judge==9) transaction.findByCompanyAndType(req,res)
});
server.use('/commerland', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) commerland.findAll(req, res)
    if(req.query.judge==1) commerland.create(req,res)
    if(req.query.judge==2) commerland.update(req,res)
    if(req.query.judge==3) commerland.delete(req,res)
    if(req.query.judge==4) commerland.selectLevel(req,res)
    if(req.query.judge==5) commerland.findAllByCondition(req,res)
    if(req.query.judge==6) commerland.findById(req,res)
    if(req.query.judge==7) commerland.getSumofBrand(req,res)
    if(req.query.judge==8) commerland.getSumofCommerland(req,res)
    if(req.query.judge==9) commerland.findByCompany(req,res)
});
server.use('/digger', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) digger.findAll(req, res)
    if(req.query.judge==1) digger.create(req,res)
    if(req.query.judge==2) digger.update(req,res)
    if(req.query.judge==3) digger.delete(req,res)
});
server.use('/factory', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) factory.findAll(req, res)
    if(req.query.judge==1) factory.create(req,res)
    if(req.query.judge==2) factory.update(req,res)
    if(req.query.judge==3) factory.delete(req,res)
});
server.use('/indusland', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) indusland.findAll(req, res)
    if(req.query.judge==1) indusland.create(req,res)
    if(req.query.judge==2) indusland.update(req,res)
    if(req.query.judge==3) indusland.delete(req,res)
    if(req.query.judge==4) indusland.findByCompany(req,res)
    if(req.query.judge==5) indusland.findAllByCondition(req,res)
    if(req.query.judge==6) indusland.getSumofIndusland(req,res)
});
server.use('/line', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) line.findAll(req, res)
    if(req.query.judge==1) line.create(req,res)
    if(req.query.judge==2) line.update(req,res)
    if(req.query.judge==3) line.delete(req,res)
});
server.use('/mining', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) mining.findAll(req, res)
    if(req.query.judge==1) mining.create(req,res)
    if(req.query.judge==2) mining.update(req,res)
    if(req.query.judge==3) mining.delete(req,res)
    if(req.query.judge==4) mining.findAllByCondition(req,res)
    if(req.query.judge==5) mining.getSumofMining(req,res)
    if(req.query.judge==6) mining.findByCompany_id(req,res)
});
server.use('/research', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) research.findAll(req, res)
    if(req.query.judge==1) research.create(req,res)
    if(req.query.judge==2) research.update(req,res)
    if(req.query.judge==3) research.delete(req,res)
});
server.use('/source', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) source.findAll(req, res)
    if(req.query.judge==1) source.create(req,res)
    if(req.query.judge==2) source.update(req,res)
    if(req.query.judge==3) source.delete(req,res)
});
server.use('/game', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) game.findAll(req, res)
    if(req.query.judge==1) game.create(req,res)
    if(req.query.judge==2) game.update(req,res)
    if(req.query.judge==3) game.delete(req,res)
    if(req.query.judge==4) game.findById(req,res)
    if(req.query.judge==5) game.findByCondition(req,res)
    if(req.query.judge==6) game.findLast(req,res)
});
server.use('/avemining', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) avemining.findAll(req, res)
    if(req.query.judge==1) avemining.create(req,res)
    if(req.query.judge==2) avemining.update(req,res)
    if(req.query.judge==3) avemining.delete(req,res)
    if(req.query.judge==4) avemining.findById(req,res)
});
server.use('/aveindusland', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) aveindusland.findAll(req, res)
    if(req.query.judge==1) aveindusland.create(req,res)
    if(req.query.judge==2) aveindusland.update(req,res)
    if(req.query.judge==3) aveindusland.delete(req,res)
    if(req.query.judge==4) aveindusland.findById(req,res)
});
server.use('/avecommerland', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) avecommerland.findAll(req, res)
    if(req.query.judge==1) avecommerland.create(req,res)
    if(req.query.judge==2) avecommerland.update(req,res)
    if(req.query.judge==3) avecommerland.delete(req,res)
    if(req.query.judge==4) avecommerland.findById(req,res)
});
server.use('/statistic', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) statistic.findAll(req, res)
    if(req.query.judge==1) statistic.create(req,res)
    if(req.query.judge==2) statistic.update(req,res)
    if(req.query.judge==3) statistic.delete(req,res)
    if(req.query.judge==4) statistic.updateMoney(req,res)
    if(req.query.judge==5) statistic.findByCompany(req,res)
    if(req.query.judge==6) statistic.deleteAll(req,res)
});

server.use('/oem', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) oem.findAll(req, res)
    if(req.query.judge==1) oem.create(req,res)
    if(req.query.judge==2) oem.update(req,res)
    if(req.query.judge==3) oem.delete(req,res)
    if(req.query.judge==4) oem.findById(req,res)
    if(req.query.judge==5) oem.findByCompany(req,res)
    if(req.query.judge==6) oem.deleteByOem(req,res)
    if(req.query.judge==7) oem.deleteByOemAndCompany(req,res)
    if(req.query.judge==8) oem.findByOther(req,res)
    if(req.query.judge==9) oem.findByCompanyAndCommerresearch(req,res)
});


server.use('/mail',function(req,res){    
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0)  mail.register(req,res); 
    if(req.query.judge==null) res.redirect('./WWW/404/QYZQ.html');
})

//测试
//-----------------------------------------------------------------------------------
server.use('/onetoone',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) oneToOne.creat(req,res);
    if(req.query.judge==0) oneToOne.add(req,res);
    if(req.query.judge==1) oneToOne.update(req,res);
    if(req.query.judge==2) oneToOne.del(req,res);
    if(req.query.judge==3) oneToOne.find(req,res);
})

server.use('/onetomany',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) oneToMany.creat(req,res);
    if(req.query.judge==0) oneToMany.add(req,res);
    if(req.query.judge==1) oneToMany.update(req,res);
    if(req.query.judge==2) oneToMany.del(req,res);
    if(req.query.judge==3) oneToMany.find(req,res);
})

server.use('/manytomany',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) manyToMany.create(req,res);
    if(req.query.judge==0) manyToMany.add(req,res);
    if(req.query.judge==1) manyToMany.update(req,res);
    if(req.query.judge==2) manyToMany.del(req,res);
    if(req.query.judge==3) manyToMany.find(req,res);
})

server.use('/source_mine',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) source_mine.add(req,res);
    if(req.query.judge==1) source_mine.find(req,res);

})


//-----------------------------------------------------------------------------------
