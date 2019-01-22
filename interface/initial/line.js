const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;

// 模型层定义
let line = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'line',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'model': {
            'type': Sequelize.CHAR(255), //生产线型号
            'allowNull': judge,
        },
        'capacity': {
            'type': Sequelize.DOUBLE(255), //生产线产能
            'allowNull': judge,
        },
        'relief': {
            'type': Sequelize.DOUBLE(255), //产线价值折旧率
            'allowNull': judge,
        },
        'yield': {
            'type': Sequelize.CHAR(255), //良品率
            'allowNull': judge,
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //生产线价值
            'allowNull': judge,
        },
        'conrequire': {
            'type': Sequelize.CHAR(255), //建设要求
            'allowNull': judge,
        },
    }
);

module.exports={
    line,
    //查询所有
    findAll:function(req,res){
        line.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
       line.create({
            'id':req.query.id,
            'model':req.query.model,
            'capacity':req.query.capacity,
            'relief':req.query.relief,
            'yield':req.query.yield,
            'price':req.query.price,
            'conrequire':req.query.conrequire,
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
        line.destroy({
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
        line.update(
            {
                'model':req.query.model,
                'capacity':req.query.capacity,
                'relief':req.query.relief,
                'yield':req.query.yield,
                'price':req.query.price,
                'conrequire':req.query.conrequire,
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
        line.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },

}


