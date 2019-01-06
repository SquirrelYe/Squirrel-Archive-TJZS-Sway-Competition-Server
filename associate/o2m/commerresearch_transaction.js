//导入模型
const commerresearch = require('../../interface/operation/commerresearch').commerresearch;
const transaction = require('../../interface/operation/transaction').transaction;
//yield
var co = require('co');



//外键在 
commerresearch.hasMany(transaction, {
    foreignKey: 'commerresearch_id',
    constraints: false
});
transaction.belongsTo(commerresearch, {
    foreignKey: 'commerresearch_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        commerresearch.sync();
        transaction.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var transaction1 = yield transaction.create({'id':req.query.transaction_id}); 
            var commerresearch1 = yield commerresearch.findById(req.query.commerresearch_id)  
            yield transaction1.setCommerresearch(commerresearch1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var transaction1 = yield transaction.findById(req.query.transaction_id)  
            var commerresearch1 = yield commerresearch.findById(req.query.commerresearch_id)  
            yield transaction1.setCommerresearch(commerresearch1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var transaction1 = yield transaction.findById(req.query.transaction_id)   
            yield transaction1.setCommerresearch(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_commerresearch: function (req, res) {
        commerresearch.findAll({
            include: {
                model: transaction, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_transaction: function (req, res) {
        transaction.findAll({
            include: {
                model: commerresearch, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}