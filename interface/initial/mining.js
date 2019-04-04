const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;
const company=require('../user&admin/company').company
const source=require('../initial/source').source

// 模型层定义
let mining = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'mining',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'star': {
            'type': Sequelize.CHAR(255), //矿区星级
            'allowNull': judge
        },
        'totalreserve': {
            'type': Sequelize.DOUBLE(255), //总储量（恒定不变）
            'allowNull': judge
        },
        'reserve': {
            'type': Sequelize.DOUBLE(255), //储量
            'allowNull': judge
        },
        'deprelief': {
            'type': Sequelize.DOUBLE(255), //折旧减免
            'allowNull': judge
        },
        'repurchase': {
            'type': Sequelize.DOUBLE(255), //回购价值
            'allowNull': judge
        },
        'startprice':{
            'type':Sequelize.DOUBLE(10),
            'allowNull': judge
        },
        'price': {
            'type': Sequelize.DOUBLE(10), //成交价
            'allowNull': judge
        },
        'condition': {
            'type': Sequelize.INTEGER(10), //状态
            'allowNull': judge
        },
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': judge,        
        },
        'source_id':{
            'type': Sequelize.INTEGER(10),
            'allowNull': judge
        },
        'company_id': {
            'type': Sequelize.INTEGER(10), //竞得公司
            'allowNull': judge
        },
    }
);

company.hasOne(mining, {
    foreignKey: 'company_id',
    constraints: false
});
mining.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});

source.hasOne(mining, {
    foreignKey: 'source_id',
    constraints: false
});
mining.belongsTo(source, {
    foreignKey: 'source_id',
    constraints: false
});

module.exports={
    mining,
    findAll:function(req,res){
        mining.findAll(
            {
                'order': [
                    ['created_at', 'DESC'],
                ],
                include:{
                    model:company
                }
            }
        ).then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        mining.create({
            'id':req.query.id,
            'star':req.query.star,
            'totalreserve':req.query.totalreserve,
            'reserve':req.query.reserve,
            'deprelief':req.query.deprelief,
            'repurchase':req.query.repurchase,
            'startprice':req.query.startprice,
            'price':req.query.price,
            'condition':req.query.condition,
            'Yearid':req.query.Yearid,
            'source_id':req.query.source_id,
            'company_id':req.query.company_id,
        }).then(msg=>{
            res.send(`{ "success": "true" }`);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
    //删除
    delete:function(req,res){
        mining.destroy({
            'where':{
                'id':req.query.id,
            }
        }).then(row=> {
            if(row === 0){
                console.log('删除记录失败');
                res.send(`{ "success": false }`);
             }else{
                console.log('成功删除记录');
                res.send(`{ "success": true }`);
             }
          },
          function(err){
              console.log(err); 
        });
    },
    //更新
    update:function(req,res){
        mining.update(
            {
                'star':req.query.star,
                'reserve':req.query.reserve,
                'deprelief':req.query.deprelief,
                'repurchase':req.query.repurchase,
                'startprice':req.query.startprice,
                'price':req.query.price,
                'condition':req.query.condition,
                'Yearid':req.query.Yearid,
                'source_id':req.query.source_id,
                'company_id':req.query.company_id,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(`{ "success": "true" }`);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
    //按ID查询
    findById:function(req,res){
        mining.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //查询未开启竞拍的矿区
    findAllByCondition:function(req,res){
        mining.findAll(
            {
                where:{
                    'Yearid':req.query.Yearid,
                    'condition':-2,
                    'company_id':null
                },
                include:{
                    model:source
                }
            }
        ).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    // 按company_id查询
    findByCompany_id:function(req,res){
        mining.findAndCountAll({
            where:{
                'company_id':req.query.company_id,
                'condition':3
            },
        })
        .then(msg =>{
            res.send(msg);
        })
    },
    //计算某个财年矿区的总成交价
    getSumofMining:function(req,res){
        mining.findAndCountAll({
            attributes: [[conn.literal('SUM(price)'), 'result']],
            where:{
                'Yearid':req.query.Yearid,
                'condition':1
            },
          } ).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    }
}


