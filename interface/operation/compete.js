const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let compete = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'compete',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
          
        
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        }, 
        'Cid': {
            'type': Sequelize.INTEGER(11), // 公司id
            'allowNull': false,        
        },
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': false,     
        }, 
        'type': {
            'type': Sequelize.INTEGER(11), // 竞标物品种类
            'allowNull': false,     
        }, 
        'thingid': {
            'type': Sequelize.INTEGER(11), // 竞拍物品id
            'allowNull': false,     
        }, 
        'auction': {
            'type': Sequelize.DOUBLE(255), // 竞拍价
            'allowNull': false,     
        }, 
        'condition': {
            'type': Sequelize.INTEGER(11), // 竞拍状态
            'allowNull': false,     
        }, 

    }
);

module.exports={
    compete,
    //查询所有
    findAll:function(req,res){
        compete.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        compete.create({
            'Sid':req.query.Sid,
            'Cid':req.query.Cid,
            'Yearid':req.query.Yearid,
            'type':req.query.type,
            'thingid':req.query.thingid,
            'auction':req.query.auction,
            'condition':req.query.condition,
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
        compete.destroy({
            'where':{
                'thingid':req.query.thingid,
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
        compete.update(
            {
                'Sid':req.query.Sid,
                'Cid':req.query.Cid,
                'Yearid':req.query.Yearid,
                'type':req.query.type,
                'auction':req.query.auction,
                'condition':req.query.condition,
            },
            {'where':{
                'thingid':req.query.thingid,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


