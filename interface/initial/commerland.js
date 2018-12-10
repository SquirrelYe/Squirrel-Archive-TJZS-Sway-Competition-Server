const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let commerland = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'commerland',
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
        'SYid': {
            'type': Sequelize.INTEGER(11), // 商业用地id
            'allowNull': false,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), //管理员id
            'allowNull': false
        },
        'level': {
            'type': Sequelize.CHAR(255), //商业用地等级
            'allowNull': false
        },
        'brand': {
            'type': Sequelize.DOUBLE(255), //品牌价值
            'allowNull': false
        },
        'increment': {
            'type': Sequelize.DOUBLE(255), //增值空间
            'allowNull': false
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //成交价
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
    commerland,
    //查询所有
    findAll:function(req,res){
        commerland.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        commerland.create({
            'Sid':req.query.Sid,
            'Yearid':req.query.Yearid,
            'SYid':req.query.SYid,
            'Aid':req.query.Aid,
            'level':req.query.level,
            'brand':req.query.brand,
            'increment':req.query.increment,
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
        commerland.destroy({
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
        commerland.update(
            {
                'Sid':req.query.Sid,
                'Yearid':req.query.Yearid,
                'SYid':req.query.SYid,
                'Aid':req.query.Aid,
                'level':req.query.level,
                'brand':req.query.brand,
                'increment':req.query.increment,
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


