const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;

// 模型层定义
let admin = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'admin',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },    
        'name': {
            'type': Sequelize.CHAR(255), // 中文名
            'allowNull': judge,        
        },
        'pass': {
            'type': Sequelize.CHAR(255), //密码
            'allowNull': judge,
        },
        'juris': {
            'type': Sequelize.CHAR(255), // 权限
            'allowNull': judge,        
        },
        'email': {
            'type': Sequelize.CHAR(255), // 邮箱
            'allowNull': judge,        
        },
        'cname':{
            'type':Sequelize.CHAR(255),
            'allowNull':judge,
        }
    }
);

module.exports={
    admin,
    //查询所有
    findAll:function(req,res){
        admin.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //登录
    login:function(req,res){
        admin.findOne({
            'where':{
                'name':req.query.name,
                'pass':req.query.pass
            }
        }).then(msg=>{
            res.send(msg);
        })
    },
    //增加
    create:function(req,res){
        admin.create({
            'id':req.query.id,
            'name':req.query.name,
            'pass':req.query.pass,
        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //删除
    delete:function(req,res){
        admin.destroy({
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
        admin.update(
            {'name':req.query.name},
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
        admin.findById(req.query.id).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    
}


