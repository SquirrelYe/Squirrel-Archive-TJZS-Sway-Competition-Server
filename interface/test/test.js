const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let UserTest = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'usertest',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'username': {
            'type': Sequelize.CHAR(10), // 字段类型
            'allowNull': false,         // 是否允许为NULL
        },
        'password': {
            'type': Sequelize.CHAR(10),
            'allowNull': false
        }
    }
);

module.exports={
    //查询所有
    findAll:function(req,res){
        UserTest.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        UserTest.create({
            'username':'yx',
            'password':'yexuan'
        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //删除
    delete:function(req,res){
        UserTest.destroy({
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
        UserTest.update(
            {'username':`${s}`},
            {'where':{
                'id':'1'
            }
        }).then(msg=>{
            res.send(msg);
        })
    }
}


