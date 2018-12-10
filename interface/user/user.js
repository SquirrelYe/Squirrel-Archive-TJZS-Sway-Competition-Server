const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let user = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'user',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Pid': {
            'type': Sequelize.INTEGER(11), // 用户管理
            'allowNull': false,     
        },   
    
    }
);

module.exports={
    user,
    //查询所有
    findAll:function(req,res){
        user.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        user.create({
            'Pid':req.query.Pid,

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
        user.destroy({
            'where':{
                'Pid':req.query.Pid,
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
}


