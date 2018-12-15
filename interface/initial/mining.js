const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let mining = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'mining',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': true,     
        },   
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': true,        
        },
        'Kid': {
            'type': Sequelize.INTEGER(11), // 矿区id
            'allowNull': true,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), //管理员id
            'allowNull': true
        },
        'YLid': {
            'type': Sequelize.INTEGER(11), //矿区原料属性
            'allowNull': true
        },
        'star': {
            'type': Sequelize.CHAR(255), //矿区星级
            'allowNull': true
        },
        'reserve': {
            'type': Sequelize.DOUBLE(255), //储量
            'allowNull': true
        },
        'deprelief': {
            'type': Sequelize.DOUBLE(255), //折旧减免
            'allowNull': true
        },
        'repurchase': {
            'type': Sequelize.DOUBLE(255), //回购价值
            'allowNull': true
        },
        'price': {
            'type': Sequelize.DOUBLE(10), //成交价
            'allowNull': true
        },
        'condition': {
            'type': Sequelize.INTEGER(10), //状态
            'allowNull': true
        },
        'belong': {
            'type': Sequelize.INTEGER(10), //竞得公司
            'allowNull': true
        },
    }
);

module.exports={
    mining,
    //查询所有
    findAll:function(req,res){
        mining.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        mining.create({
            'Sid':req.query.Sid,
            'Yearid':req.query.Yearid,
            'Kid':req.query.Kid,
            'Aid':req.query.Aid,
            'YLid':req.query.YLid,
            'star':req.query.star,
            'reserve':req.query.reserve,
            'deprelief':req.query.deprelief,
            'repurchase':req.query.repurchase,
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
        mining.destroy({
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
        mining.update(
            {
                'Sid':req.query.Sid,
                'Yearid':req.query.Yearid,
                'Kid':req.query.Kid,
                'Aid':req.query.Aid,
                'Ylid':req.query.YLid,
                'star':req.query.star,
                'reserve':req.query.reserve,
                'deprelief':req.query.deprelief,
                'repurchase':req.query.repurchase,
                'price':req.query.price,
                'condition':req.query.condition,
                'belong':req.query.belong,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


