//导入模型
const company = require('../../interface/user&admin/company').company;
const loan = require('../../interface/operation/loan').loan;
//yield
var co = require('co');



//外键在 
company.hasMany(loan, {
    foreignKey: 'company_id',
    constraints: false
});
loan.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        company.sync();
        loan.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var loan1 = yield loan.create({'id':req.query.loan_id}); 
            var company1 = yield company.findById(req.query.company_id)  
            yield loan1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var loan1 = yield loan.findById(req.query.loan_id)  
            var company1 = yield company.findById(req.query.company_id)  
            yield loan1.setCompany(company1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var loan1 = yield loan.findById(req.query.loan_id)   
            yield loan1.setCompany(null) 
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
                model: loan, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_loan: function (req, res) {
        loan.findAll({
            'order': [
                ['end', 'DESC'],
            ],
            include: {
                model: company, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}