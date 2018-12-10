const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let digger = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'digger',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'Wid': {
            'type': Sequelize.INTEGER(11), // 挖掘机id
            'allowNull': false,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), // 管理员id
            'allowNull': false,        
        },
        'model': {
            'type': Sequelize.CHAR(255), //挖掘机型号
            'allowNull': false
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //购置价格
            'allowNull': false
        },
        'efficient': {
            'type': Sequelize.DOUBLE(255), //挖掘效率
            'allowNull': false
        },
        'deprelief': {
            'type': Sequelize.DOUBLE(255), //价值折扣
            'allowNull': false
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
            'Sid':req.query.Sid,
            'Wid':req.query.Wid,
            'Aid':req.query.Aid,
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
        digger.update(
            {
                'Sid':req.query.Sid,
                'Wid':req.query.Wid,
                'Aid':req.query.Aid,
                'model':req.query.model,
                'price':req.query.price,
                'efficient':req.query.efficient,
                'deprelief':req.query.deprelief,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


