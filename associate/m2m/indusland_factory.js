//导入模型
const factory = require('../../interface/initial/factory').factory;
const indusland = require('../../interface/initial/indusland').indusland;
const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();


// 中间表
var indusland_factory = conn.define('indusland_factory',
{
    'id':{
    'type':Sequelize.INTEGER(11),
    'allowNull': true,
    'primaryKey':true,
    'autoIncrement':true
},
'number':{
    'type':Sequelize.INTEGER(11),
    'allowNull': true,
}
}
);
//yield
var co = require('co');
//外键在 
indusland.belongsToMany(factory, 
    {'through': indusland_factory} 
);
factory.belongsToMany(indusland,  
    {'through': indusland_factory}
    );

module.exports = {
    indusland_factory,
    add: function (req, res) {
        co(function* () {
            var indusland1 = yield indusland.create({'id': req.query.indusland_id});

            var factory1 = yield factory.findById(req.query.factory_id);
            yield indusland1.addFactory(factory1).then(msg => {
                res.send(msg);
            });
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var factory1 = yield factory.findById(req.query.factory_id)  
            var indusland1 = yield indusland.findById(req.query.indusland_id)  
            yield indusland1.addFactory(factory1,{
                
            }) 
            .then(msg => {
                res.send(`{ "success": true }`);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var indusland1 = yield indusland.findById(req.query.indusland_id) 
            yield indusland1.addFactory(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_more_1: function (req, res) {
        factory.findAll({
            include: {
                model: indusland, // 关联查询，关联外键模型
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_more_2: function (req, res) {
        indusland.findAll({
            where:{'company_id':req.query.company_id},
            include: {
                model: factory, // 关联查询，关联外键模型
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_more_3: function (req, res) {
        indusland.findAll({
            include: {
                model: factory, // 关联查询，关联外键模型
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    update_number:function(req,res){
        indusland_factory.update(
            {
                'number':req.query.number,
                'condition':req.query.condition
            },
            {'where':{
                'indusland_id':req.query.indusland_id,
                'factory_id':req.query.factory_id
            }
        }
        ).then(msg => {
            res.send(`{ "success": true }`);
        })
    },
    selectNumber:function(req,res){
        indusland_factory.findAndCountAll({
                'attributes':['number','factory_id']
            ,
            'where':{ 
                'indusland_id':req.query.indusland_id,
            }
        }).then(msg=>{ 
                res.send(msg);
        },
        function(err){
            console.log(err); 
        });        
    },
    selectId:function(req,res){
        indusland_factory.findOne({
            'attributes':['id']
        ,
        'where':{ 
            'indusland_id':req.query.indusland_id,
            'factory_id':req.query.factory_id
        }
    }).then(msg=>{ 
            res.send(msg);
    },
    function(err){
        console.log(err); 
    }); 
    }

    

}