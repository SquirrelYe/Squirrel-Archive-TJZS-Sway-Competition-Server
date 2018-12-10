const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let source = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'source',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'YLid': {
            'type': Sequelize.INTEGER(11), // 矿区原料id
            'allowNull': false,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), // 管理员id
            'allowNull': false,        
        },
        'name': {
            'type': Sequelize.CHAR(255), //原料名称
            'allowNull': false
        },
    }
);

module.exports={
    source,
    //查询所有
    findAll:function(req,res){
        source.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        source.create({
            'Sid':req.query.Sid,
            'YLid':0,
            'Aid':req.query.Aid,
            'name':req.query.name,
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
        source.destroy({
            'where':{
                'YLid':req.query.YLid,
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
        source.update(
            {
                'Sid':req.query.Sid,
                'Aid':req.query.Aid,
                'name':req.query.name,
            },
            {'where':{
                'YLid':req.query.YLid,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


