//导入模型
const company = require('../../interface/user&admin/company').company;
const indusland = require('../../interface/initial/indusland').indusland;
//yield
var co = require('co');



//外键在 
company.hasMany(indusland, {
    foreignKey: 'company_id',
    constraints: false
});
indusland.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        company.sync();
        indusland.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var indusland1 = yield indusland.create({'id':req.query.indusland_id}); 
            var company1 = yield company.findById(req.query.company_id)  
            yield indusland1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var indusland1 = yield indusland.findById(req.query.indusland_id)  
            var company1 = yield company.findById(req.query.company_id)  
            yield indusland1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var indusland1 = yield indusland.findById(req.query.indusland_id)   
            yield indusland1.setCompany(null) 
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
                model: indusland, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_indusland: function (req, res) {
        indusland.findAll({
            include: {
                model: company, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}