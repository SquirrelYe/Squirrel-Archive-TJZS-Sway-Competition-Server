//导入模型
const source = require('../../interface/initial/source').source;
const transaction = require('../../interface/operation/transaction').transaction;
//yield
var co = require('co');



//外键在 
source.hasMany(transaction, {
    foreignKey: 'source_id',
    constraints: false
});
transaction.belongsTo(source, {
    foreignKey: 'source_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        source.sync();
        transaction.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var transaction1 = yield transaction.create({'id':req.query.transaction_id}); 
            var source1 = yield source.findById(req.query.source_id)  
            yield transaction1.setSource(source1) 
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
            var source1 = yield source.findById(req.query.source_id)  
            yield transaction1.setSource(source1) 
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
            yield transaction1.setSource(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_source: function (req, res) {
        source.findAll({
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
                model: source, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}