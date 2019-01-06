const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;

// 模型层定义
let avecommerland = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'avecommerland',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {  
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': judge,        
        },
        'model': {
            'type': Sequelize.INTEGER(11), 
            'allowNull': judge,        
        },
        'average': {
            'type': Sequelize.DOUBLE(11), 
            'allowNull': judge,        
        },
    }
);

module.exports={
    avecommerland,
    //查询所有
    findAll:function(req,res){
        avecommerland.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        avecommerland.create({
            'id':req.query.id,
            'Yearid':req.query.Yearid,
            'model':req.query.model,
            'average':req.query.average,
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
        avecommerland.destroy({
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
        avecommerland.update(
            {
                'Yearid':req.query.Yearid,
                'model':req.query.model,
                'average':req.query.average,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(`{ "success": true }`);
        },
        function(err){
            res.send(`{ "success": false }`);
            console.log(err); 
        });
    },
    //按ID查询
    findById:function(req,res){
        avecommerland.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },

}


