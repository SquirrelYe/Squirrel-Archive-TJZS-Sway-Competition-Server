//导入模型
const compete = require('../../interface/operation/compete').compete;
const company = require('../../interface/user&admin/company').company;
const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();


// 中间表
var company_compete = conn.define('company_compete');
//yield
var co = require('co');
//外键在 
company.belongsToMany(compete, 
    {'through': company_compete} 
);
compete.belongsToMany(company,  
    {'through': company_compete}
    );

module.exports = {
    add: function (req, res) {
        co(function* () {
            var company1 = yield company.create({'id': req.query.company_id});

            var compete1 = yield compete.findById(req.query.compete_id);
            yield company1.addCompete(compete1).then(msg => {
                res.send(msg);
            });
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var compete1 = yield compete.findById(req.query.compete_id)  
            var company1 = yield company.findById(req.query.company_id)  
            yield company1.setCompetes(compete1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var company1 = yield company.findById(req.query.company_id) 
            yield company1.setCompetes(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_more_1: function (req, res) {
        compete.findAll({
            include: {
                model: company, // 关联查询，关联外键模型
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_more_2: function (req, res) {
        company.findAll({
            include: {
                model: compete, // 关联查询，关联外键模型
            }
        }).then(msg => {
            res.send(msg);
        })
    },
 //查询某一个矿区的最高出价者
    findOneByPrice:function(req,res){
        compete.findAll({
            'order': [
                ['auction', 'DESC'],
            ],
            where:{
                'thingid':req.query.thingid,
                'type':req.query.type,
            },
            include:{
                model:company
            }
        }).then(msg => {
            res.send(msg);
        })
    }

}