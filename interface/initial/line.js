const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let line = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'line',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'Lid': {
            'type': Sequelize.INTEGER(11), // 生产线id
            'allowNull': false,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), // 管理员id
            'allowNull': false,        
        },
        'model': {
            'type': Sequelize.CHAR(255), //生产线型号
            'allowNull': false
        },
        'capacity': {
            'type': Sequelize.DOUBLE(255), //生产线产能
            'allowNull': false
        },
        'relief': {
            'type': Sequelize.DOUBLE(255), //产线价值折旧率
            'allowNull': false
        },
        'yield': {
            'type': Sequelize.CHAR(255), //良品率
            'allowNull': false
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //生产线价值
            'allowNull': false
        },
        'conrequire': {
            'type': Sequelize.CHAR(255), //建设要求
            'allowNull': false
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
            'Sid':req.query.Sid,
            'Lid':req.query.Lid,
            'Aid':req.query.Aid,
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
                'Lid':req.query.Lid,
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
        line.update(
            {
                'Sid':req.query.Sid,
                'Aid':req.query.Aid,
                'model':req.query.model,
                'capacity':req.query.capacity,
                'relief':req.query.relief,
                'yield':req.query.yield,
                'price':req.query.price,
                'conrequire':req.query.conrequire,
            },
            {'where':{
                'Lid':req.query.Lid,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


