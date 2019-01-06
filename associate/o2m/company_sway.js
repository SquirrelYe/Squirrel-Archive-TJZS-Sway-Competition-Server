//导入模型
const company = require('../../interface/user&admin/company').company;
const sway = require('../../interface/user&admin/sway').sway;
//yield
var co = require('co');



//外键在 
company.hasMany(sway, {
    foreignKey: 'company_id',
    constraints: false
});
sway.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        company.sync();
        sway.sync().then(msg => {
            res.send(msg);
        });
    },
    // add: function (req, res) {
    //     co(function* () {
    //         var sway1 = yield sway.create({'id':req.query.sway_id}); 
    //         var company1 = yield company.findById(req.query.company_id)  
    //         yield sway1.setCompany(company1) 
    //         .then(msg => {
    //             res.send(msg);
    //         })
    //     }).catch(function (e) {
    //         console.log(e);
    //     });
    // },
    update: function (req, res) {
        co(function* () {
            var sway1 = yield sway.findById(req.query.sway_id)  
            var company1 = yield company.findById(req.query.company_id)
            if(company1==null||sway1==null){
                res.send(`{ "success": false }`);
            } 
            else{
                yield sway1.setCompany(company1) 
                .then(msg => {
                    res.send(`{ "success": true }`);
                },
                function(err){
                    res.send(`{ "success": "false" }`);
                    console.log(err);  
                })
            }            
        }).catch(function (e) {
            res.send(`{ "success": false }`);
        });
    },
    del: function (req, res) {
        co(function* () {
            var sway1 = yield sway.findById(req.query.sway_id)   
            yield sway1.setCompany(null) 
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
                model: sway, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_sway: function (req, res) {
        sway.findAll({
            include: [{model:company}]
        }).then(msg => {
            res.send(msg);
        })
    }

}