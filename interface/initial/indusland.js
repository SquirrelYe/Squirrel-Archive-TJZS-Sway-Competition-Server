const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;
const company=require('../user&admin/company').company

// 模型层定义
let indusland = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'indusland',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {  
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'model': {
            'type': Sequelize.CHAR(255), //工业用地型号
            'allowNull': judge,
        },
        'measure': {
            'type': Sequelize.DOUBLE(255), //面积
            'allowNull': judge,
        },
        'efficient': {
            'type': Sequelize.DOUBLE(255), //生产效率提升
            'allowNull': judge,
        },
        'repurchase': {
            'type': Sequelize.DOUBLE(255), //产线价值折旧减免
            'allowNull': judge,
        },
        'improve': {
            'type': Sequelize.DOUBLE(255), //改良花费
            'allowNull': judge,
        },
        'isimprove': {
            'type': Sequelize.INTEGER(2), //是否改良
            'allowNull': judge,
        },
        'startprice':{
            'type':Sequelize.DOUBLE(10),  //起拍价
            'allowNull':judge,
        },
        'price': {
            'type': Sequelize.DOUBLE(10), //成交价
            'allowNull': judge,
        },
        'condition': {
            'type': Sequelize.INTEGER(11), //状态
            'allowNull': judge,
        },
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': judge,        
        },
        'company_id': {
            'type': Sequelize.INTEGER(11), //成交公司
            'allowNull': judge,
        },
    }
);

company.hasOne(indusland, {
    foreignKey: 'company_id',
    constraints: false
});
indusland.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});

module.exports={
    indusland,
    //查询所有
    findAll:function(req,res){
        indusland.findAll(
            {
                'order': [
                    ['updated_at', 'DESC'],
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
        indusland.create({
            'id':req.query.id,
            'model':req.query.model,
            'measure':req.query.measure,
            'efficient':req.query.efficient,
            'repurchase':req.query.repurchase,
            'improve':req.query.improve,
            'isimprove':req.query.isimprove,
            'startprice':req.query.startprice,
            'price':req.query.price,
            'condition':req.query.condition,
            'Yearid':req.query.Yearid,
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
        indusland.destroy({
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
        indusland.update(
            {
                'model':req.query.model,
                'measure':req.query.measure,
                'efficient':req.query.efficient,
                'repurchase':req.query.repurchase,
                'improve':req.query.improve,
                'isimprove':req.query.isimprove,
                'startprice':req.query.startprice,
                'price':req.query.price,
                'condition':req.query.condition,
                'Yearid':req.query.Yearid,
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
        indusland.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //查询所有
    findByCompany:function(req,res){
        indusland.findAll(
          {  where:{
              'company_id':req.query.company_id
          }}
        ).then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //查询未开启竞拍的工业用地
    findAllByCondition:function(req,res){
        indusland.findAll(
            {
                where:{
                    'Yearid':req.query.Yearid,
                    'condition':-2,
                    'company_id':null
                }
            }
        ).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //计算工业用地的总成交价
    getSumofIndusland:function(req,res){
        indusland.findAndCountAll({
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


