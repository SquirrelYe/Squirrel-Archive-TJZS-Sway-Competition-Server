const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;

// 模型层定义
let digger = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'digger',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'model': {
            'type': Sequelize.CHAR(255), //挖掘机型号
            'allowNull': judge,
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //购置价格
            'allowNull': judge,
        },
        'efficient': {
            'type': Sequelize.DOUBLE(255), //挖掘效率
            'allowNull': judge,
        },
        'deprelief': {
            'type': Sequelize.DOUBLE(255), //价值折扣
            'allowNull': judge,
        },
    }
);

module.exports={
    digger,
    //查询所有
    findAll:function(req,res){
        digger.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        digger.create({
            'id':req.query.id,
            'model':req.query.model,
            'price':req.query.price,
            'efficient':req.query.efficient,
            'deprelief':req.query.deprelief,
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
        digger.destroy({
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
        digger.update(
            {
                'model':req.query.model,
                'price':req.query.price,
                'efficient':req.query.efficient,
                'deprelief':req.query.deprelief,
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
        digger.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },

}


