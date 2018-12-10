const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let commerasset = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'commerasset',
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
        'thingid': {
            'type': Sequelize.INTEGER(11), //商业用地id
            'allowNull': false
        },
        'type': {
            'type': Sequelize.CHAR(255), //资产物品分类
            'allowNull': false
        },
        'Yid': {
            'type': Sequelize.INTEGER(11), // 研究所id
            'allowNull': false
        },
    }
);

module.exports={
    commerasset,
    //查询所有
    findAll:function(req,res){
        commerasset.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },    
    //增加
    create:function(req,res){
        commerasset.create({
            'Sid':req.query.Sid,
            'Cid':req.query.Cid,
            'thingid':req.query.thingid,
            'type':req.query.type,
            'Yid':req.query.Yid,
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
        commerasset.destroy({
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
        commerasset.update(
            {
                'Sid':req.query.Sid,
                'Cid':req.query.Cid,
                'thingid':req.query.thingid,
                'type':req.query.type,
                'Yid':req.query.Yid,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


