const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let sway = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'sway',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Pid': {
            'type': Sequelize.INTEGER(11), // pid
            'allowNull': false,     
        },   
        'Cid': {
            'type': Sequelize.INTEGER(11), // aid
            'allowNull': false,        
        },
        'name': {
            'type': Sequelize.CHAR(255), // 用户名
            'allowNull': false,        
        },
        'cname': {
            'type': Sequelize.CHAR(255), // 中文名
            'allowNull': false,        
        },
        'pass': {
            'type': Sequelize.CHAR(255), //密码
            'allowNull': false
        },
        'email': {
            'type': Sequelize.CHAR(255), // 邮箱
            'allowNull': false,        
        }
    }
);

module.exports={
    //查询所有
    findAll:function(req,res){
        sway.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //查询注册时用户名是否被占用
    selectNameFirst:function(req,res){
        sway.findAll({
            'where':{
                'name':req.query.name
            }
        }).then(msg=>{
            if(msg.length==0){
                res.send(`{ "success": "true" }`);
            }else{
                res.send(`{ "success": "oversize" }`);
            }
        },
        function(err){
            console.log(err); 
        });        
    },
    //查询注册时邮箱是否被占用
    selectUsersByEmail:function(req,res){
        sway.findAll({
            'where':{
                'email':req.query.email
            }
        }).then(msg=>{
            if(msg.length==0){
                res.send(`{ "success": "true" }`);
            }else{
                res.send(`{ "success": "oversize" }`);
            }
        },
        function(err){
            console.log(err); 
        });        
    },
    //登录
    login:function(req,res){
        sway.findAll({
            'where':{
                'name':req.query.name,
                'pass':req.query.pass
            }
        }).then(msg=>{
            res.send(msg);
        })
    },
    //注册用户
    create:function(req,res){
        sway.create({
            'Pid':1,
            'Cid':1,
            'name':req.query.name,
            'cname':req.query.cname,
            'pass':req.query.pass,
            'email':req.query.email,

        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //更新密码（密码找回）
    updatePass:function(req,res){
        sway.update(
            {'pass':req.query.pass},
            {'where':{
                'email':req.query.email
            }
        }).then(msg=>{
            res.send(msg);
        })
    },
    //删除
    delete:function(req,res){
        sway.destroy({
            'where':{
                'username':'1'
            }
        }).then(row=> {
            if(row === 0){
                console.log('删除记录失败');
                res.send('error')
             }else{
                console.log('成功删除记录');
                res.send('msg')
             }
          },
          function(err){
              console.log(err); 
        });
    },
    //更新
    update:function(req,res){
        var s='yexuan'
        sway.update(
            {'username':`${s}`},
            {'where':{
                'id':'1'
            }
        }).then(msg=>{
            res.send(msg);
        })
    }
}


