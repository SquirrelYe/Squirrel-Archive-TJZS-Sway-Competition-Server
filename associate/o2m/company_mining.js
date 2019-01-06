//导入模型
const company = require('../../interface/user&admin/company').company;
const mining = require('../../interface/initial/mining').mining;
//yield
var co = require('co');



//外键在 
company.hasMany(mining, {
    foreignKey: 'company_id',
    constraints: false
});
mining.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        company.sync();
        mining.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var mining1 = yield mining.create({'id':req.query.mining_id}); 
            var company1 = yield company.findById(req.query.company_id)  
            yield mining1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var mining1 = yield mining.findById(req.query.mining_id)  
            var company1 = yield company.findById(req.query.company_id)  
            yield mining1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var mining1 = yield mining.findById(req.query.mining_id)   
            yield mining1.setCompany(null) 
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
                model: mining, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_mining: function (req, res) {
        mining.findAll({
            include: {
                model: company, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}