const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let admininit = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'admininit',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Aid': {
            'type': Sequelize.INTEGER(11), // 管理员id
            'allowNull': false,     
        },   
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,        
        },
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': false,        
        },
        
    }
);

module.exports={
    admininit,
    //查询所有
    findAll:function(req,res){
        admininit.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        admininit.create({
            'Aid':req.query.Aid,
            'Sid':req.query.Sid,
            'Yearid':req.query.Yearid,
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
        admininit.destroy({
            'where':{
                'Aid':req.query.Aid,
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
        admininit.update(
            {
                'Sid':req.query.Sid,
                'Yearid':req.query.Yearid,
            },
            {'where':{
                'Aid':req.query.Aid
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


