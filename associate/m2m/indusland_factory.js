//导入模型
const factory = require('../../interface/initial/factory').factory;
const indusland = require('../../interface/initial/indusland').indusland;
const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();


// 中间表
var indusland_factory = conn.define('indusland_factory',
{
    'id':
    {
    'type':Sequelize.INTEGER(11),
    'allowNull': true,
    'primaryKey':true,
    'autoIncrement':true
    },
    'number':
    {
    'type':Sequelize.INTEGER(11),
    'allowNull': true,
    },
    'indusland_id': {
        'type': Sequelize.INTEGER(11),
        'allowNull': true,     
    },
    'factory_id':{
        'type': Sequelize.INTEGER(11),
        'allowNull': true,
    } 
}
);
//yield
var co = require('co');
//外键在 
indusland.belongsToMany(factory, 
    {
        'through': indusland_factory
    }
);
factory.belongsToMany(indusland,  
    {'through': indusland_factory}
    );

//关联工业用地
indusland.hasMany(indusland_factory, {
    foreignKey: 'indusland_id',
    constraints: false
});
indusland_factory.belongsTo(indusland, {
    foreignKey: 'indusland_id',
    constraints: false
});

//关联工厂
factory.hasMany(indusland_factory, {
    foreignKey: 'factory_id',
    constraints: false
});
indusland_factory.belongsTo(factory, {
    foreignKey: 'factory_id',
    constraints: false
});    

module.exports = {
    indusland_factory,
    //增加
    create:function(req,res){
        indusland_factory.create({
            'id':req.query.id,
            'indusland_id':req.query.indusland_id,
            'factory_id':req.query.factory_id,
        }).then(msg=>{
            res.send(`{ "success": "true" }`);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
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
    //公司对应的工厂
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
        indusland.findAndCountAll({
            where:{'id':req.query.id},
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
    },

    findAll:function(req,res){
        indusland_factory.findAll({
            include: [{model: indusland},{model:factory}]
            }
        ).then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },

    

}