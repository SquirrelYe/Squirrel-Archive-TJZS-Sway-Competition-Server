const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;

// 模型层定义
let game = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'game',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {  
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'name': {
            'type': Sequelize.CHAR(255), 
            'allowNull': judge,        
        },
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': judge,        
        },
        'start': {
            'type': Sequelize.CHAR(255), 
            'allowNull': judge,        
        },
        'stay': {
            'type': Sequelize.CHAR(255), // 持续时间
            'allowNull': judge,        
        },
        'detail': {
            'type': Sequelize.CHAR(255), 
            'allowNull': judge,        
        },
        'condition': {
            'type': Sequelize.INTEGER(11),
            'allowNull': judge,        
        },
    }
);

module.exports={
    game,
    //查询所有
    findAll:function(req,res){
        game.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        game.create({
            'id':req.query.id,
            'name':req.query.name,
            'Yearid':req.query.Yearid,
            'start':req.query.start,
            'stay':req.query.stay,
            'detail':req.query.detail,
            'condition':req.query.condition
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
        game.destroy({
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
        game.update(
            {
                'name':req.query.name,
                'Yearid':req.query.Yearid,
                'start':req.query.start,
                'stay':req.query.stay,
                'detail':req.query.detail,
                'condition':req.query.condition
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
        game.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //按Condition查询
    findByCondition:function(req,res){
        game.findAll(
            {
                where:{
                    'condition':req.query.condition
                }
            }
        )
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    findLast:function(req,res){
        game.findOne({
            'order': [
            ['id', 'DESC'],
        ]})
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },

}


