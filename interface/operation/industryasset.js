const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let industryasset = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'industryasset',
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
            'type': Sequelize.INTEGER(11), // 工业用地id
            'allowNull': false,     
        }, 
        'type': {
            'type': Sequelize.CHAR(255), // 资产物品种类
            'allowNull': false,     
        }, 
        'GCid': {
            'type': Sequelize.INTEGER(11), // 工厂id
            'allowNull': false,     
        }, 
    }
);

module.exports={
    industryasset,
    //查询所有
    findAll:function(req,res){
        fixed.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        industryasset.create({
            'Sid':req.query.Sid,
            'Cid':req.query.Cid,
            'thingid':req.query.thingid,
            'type':req.query.type,
            'GCid':req.query.GCid,
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
        industryasset.destroy({
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
        industryasset.update(
            {
                'Sid':req.query.Sid,
                'Cid':req.query.Cid,
                'thingid':req.query.thingid,
                'type':req.query.type,
                'GCid':req.query.GCid,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


