const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let industryyield = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'industoryyield',
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
        'CPid': {
            'type': Sequelize.INTEGER(11), // 产品id
            'allowNull': false,     
        }, 
        'sum': {
            'type': Sequelize.DOUBLE(11), // 生产线产量
            'allowNull': false,     
        }, 
        'condition': {
            'type': Sequelize.INTEGER(11), // 生产线状态
            'allowNull': false,     
        }, 
    }
);

module.exports={
    industryyield,
    //查询所有
    findAll:function(req,res){
        industryyield.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        industryyield.create({
            'Sid':req.query.Sid,
            'Cid':req.query.Cid,
            'thingid':req.query.thingid,
            'CPid':req.query.CPid,
            'sum':req.query.sum,
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
        industryyield.destroy({
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
        industryyield.update(
            {
                'Sid':req.query.Sid,
                'Cid':req.query.Cid,
                'thingid':req.query.thingid,
                'CPid':req.query.CPid,
                'sum':req.query.sum,
                'condition':req.query.condition,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


