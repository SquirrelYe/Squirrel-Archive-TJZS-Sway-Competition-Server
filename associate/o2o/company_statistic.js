//导入模型
const company = require('../../interface/user&admin/company').company;
const statistic = require('../../interface/competition&statistical/statistic').statistic;
//yield
var co = require('co');
//外键在 
company.hasOne(statistic, {
    foreignKey: 'company_id',
    constraints: false
});
statistic.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});


module.exports = {
    creat: function (req, res) {
        //强制自动建表
        company.sync();
        statistic.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var statistic1 = yield statistic.create({'id':req.requry.statistic_id}); 
            var company1 = yield company.findById(req.query.company_id)  
            yield statistic1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var statistic1 = yield statistic.findById(req.query.statistic_id)  
            var company1 = yield company.findById(req.query.company_id)  
            yield company1.setStatistic(statistic1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var statistic1 = yield statistic.findById(req.query.statistic_id)  
            yield statistic1.setCompany(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_company: function (req, res) {
        company.findAll({
            include: {
                model: statistic, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    
    find_statistic:function(req,res){
        statistic.findAll({
            'order': [
                ['total', 'DESC'],
            ],
            include: {
                model: company, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    findByCompany:function(req,res){
        statistic.findOne({
            where:{
                'company_id':req.query.company_id
            },
            include: {
                model: company, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    
}