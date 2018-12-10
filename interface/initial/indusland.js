const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let indusland = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'indusland',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': false,        
        },
        'GYid': {
            'type': Sequelize.INTEGER(11), // 工业用地id
            'allowNull': false,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), //管理员id
            'allowNull': false
        },
        'model': {
            'type': Sequelize.CHAR(255), //工业用地型号
            'allowNull': false
        },
        'measure': {
            'type': Sequelize.DOUBLE(255), //面积
            'allowNull': false
        },
        'efficient': {
            'type': Sequelize.DOUBLE(255), //生产效率提升
            'allowNull': false
        },
        'repurchase': {
            'type': Sequelize.DOUBLE(255), //产线价值折旧减免
            'allowNull': false
        },
        'improve': {
            'type': Sequelize.DOUBLE(255), //改良花费
            'allowNull': false
        },
        'price': {
            'type': Sequelize.DOUBLE(10), //成交价
            'allowNull': false
        },
        'condition': {
            'type': Sequelize.INTEGER(11), //状态
            'allowNull': false
        },
        'belong': {
            'type': Sequelize.CHAR(255), //成交公司
            'allowNull': false
        },
    }
);

module.exports={
    indusland,
    //查询所有
    findAll:function(req,res){
        indusland.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        indusland.create({
            'Sid':req.query.Sid,
            'Yearid':req.query.Yearid,
            'GYid':req.query.GYid,
            'Aid':req.query.Aid,
            'model':req.query.model,
            'measure':req.query.measure,
            'efficient':req.query.efficient,
            'repurchase':req.query.repurchase,
            'improve':req.query.improve,
            'price':req.query.price,
            'condition':req.query.condition,
            'belong':req.query.belong,
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
        indusland.destroy({
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
        indusland.update(
            {
                'Sid':req.query.Sid,
                'Yearid':req.query.Yearid,
                'GYid':req.query.GYid,
                'Aid':req.query.Aid,
                 'model':req.query.model,
                 'measure':req.query.measure,
                 'efficient':req.query.efficient,
                 'repurchase':req.query.repurchase,
                'improve':req.query.improve,
                'price':req.query.price,
                'condition':req.query.condition,
                'belong':req.query.belong,},
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


