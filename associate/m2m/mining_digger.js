//导入模型
const digger = require('../../interface/initial/digger').digger;
const mining = require('../../interface/initial/mining').mining;
const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();


// 中间表
var mining_digger = conn.define('mining_digger',{
'id':
{
    'type':Sequelize.INTEGER(11),
    'allowNull': true,
    'primaryKey':true,
},
'start':{
    'type':Sequelize.DATE(0),
    'allowNull': true,
},
'stay':{
    'type':Sequelize.DOUBLE(2),
    'allowNull': true,
},
'condition':{
    'type':Sequelize.INTEGER(11),
    'allowNull': true,
},
'number':{
    'type':Sequelize.INTEGER(11),
    'allowNull':true,
}


});
//yield
var co = require('co');
//外键在 
mining.belongsToMany(digger, 
    {'through': mining_digger} 
);
digger.belongsToMany(mining,  
    {'through': mining_digger}
    );

module.exports = {
    add: function (req, res) {
        co(function* () {
            var mining1 = yield mining.create({'id': req.query.mining_id});

            var digger1 = yield digger.findById(req.query.digger_id);
            yield mining1.addDigger(digger1).then(msg => {
                res.send(msg);
            });
        }).catch(function (e) {
            console.log(e);
        });
    },
    //
    findOrCreate:function(req,res){
        mining_digger.findOrCreate({
            where: {
                'mining_id':req.query.mining_id,
                'digger_id':req.query.digger_id
            },
            defaults: {                
                'id':req.query.id,
                'mining_id':req.query.mining_id,
                'digger_id':req.query.digger_id,
                'number':req.query.number,
                'condition':0
            }
        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
    update: function (req, res) {
        co(function* () {
            var digger1 = yield digger.findById(req.query.digger_id)  
            var mining1 = yield mining.findById(req.query.mining_id)  
            yield mining1.addDigger(digger1) 
            .then(msg => {
                res.send(`{ "success": true }`);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update_number:function(req,res){
        mining_digger.update(
            {
                'number':req.query.number,
                'condition':0
            },
            {'where':{
                'mining_id':req.query.mining_id,
                'digger_id':req.query.digger_id
            }
        }
        ).then(msg => {
            res.send(`{ "success": true }`);
        })
    },
    //更新
    update_md:function(req,res){
        mining_digger.update(
            {
                'condition':req.query.condition,
                'start':req.query.start,
                'stay':req.query.stay
            },
            {'where':{
                'id':req.query.mining_digger_id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    },
    del: function (req, res) {
        co(function* () {
            var mining1 = yield mining.findById(req.query.mining_id) 
            yield mining1.setDiggers(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_digger: function (req, res) {
        digger.findAll({
            include: {
                model: mining, // 关联查询，关联外键模型
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_mining: function (req, res) {
        mining.findAll({
            where:{
                'company_id':req.query.company_id,
                'condition':3
            },
            include: {
                model: digger, // 关联查询，关联外键模型
            }       
        }).then(msg => {
            res.send(msg);
        })
    },

    find_All: function (req, res) {
        mining.findAll({
            include: {
                model: digger, // 关联查询，关联外键模型
            }       
    }).then(msg => {
            res.send(msg);
        })
    },
    selectNumber:function(req,res){
        mining_digger.findAndCountAll({
                'attributes':['number']
            ,
            'where':{ 
                'mining_id':req.query.mining_id,
            }
        }).then(msg=>{ 
                res.send(msg);
        },
        function(err){
            console.log(err); 
        });        
    },
    selectOneNumber:function(req,res){
        mining_digger.findAll({
            'attributes':['number']
        ,
        'where':{ 
            'mining_id':req.query.mining_id,
            'digger_id':req.query.digger_id
        }
    }).then(msg=>{ 
            res.send(msg);
    },
    function(err){
        console.log(err); 
    });      
    }

}