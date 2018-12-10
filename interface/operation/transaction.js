const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let transaction = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'transaction',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
          
        
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        }, 
        'Cid': {
            'type': Sequelize.INTEGER(11), // 参赛者id
            'allowNull': false,        
        },
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': false,     
        }, 
        'inout': {
            'type': Sequelize.INTEGER(11), // 支出 or 流入
            'allowNull': false,     
        },
        'other': {
            'type': Sequelize.CHAR(255), // 交易另一方
            'allowNull': false,     
        },
        'type': {
            'type': Sequelize.INTEGER(11), // 交易类型
            'allowNull': false,     
        },
        'kind': {
            'type': Sequelize.INTEGER(11), // 订单类型
            'allowNull': false,     
        },
        'YLid': {
            'type': Sequelize.INTEGER(11), // 交易原料
            'allowNull': false,     
        },
        'CPid': {
            'type': Sequelize.INTEGER(11), // 交易产品
            'allowNull': false,     
        },
        'price': {
            'type': Sequelize.DOUBLE(10), // 单价
            'allowNull': false,     
        },
        'number': {
            'type': Sequelize.INTEGER(11), // 交易数量
            'allowNull': false,     
        },
        'detail': {
            'type': Sequelize.CHAR(255), // 交易明细
            'allowNull': false,     
        },
    }
);

module.exports={
    transaction,
    //查询所有
    findAll:function(req,res){
        transaction.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        transaction.create({
            'Sid':req.query.Sid,
            'Cid':req.query.Cid,
            'Yearid':req.query.Yearid,
            'inout':req.query.inout,
            'other':req.query.other,
            'type':req.query.type,
            'kind':req.query.kind,
            'YLid':req.query.YLid,
            'CPid':req.query.CPid,
            'price':req.query.price,
            'number':req.query.number,
            'detail':req.query.detail,
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
        transaction.destroy({
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
        transaction.update(
            {
                'Sid':req.query.Sid,
                'Cid':req.query.Cid,
                'Yearid':req.query.Yearid,
                'inout':req.query.inout,
                'other':req.query.other,
                'type':req.query.type,
                'kind':req.query.kind,
                'YLid':req.query.YLid,
                'CPid':req.query.CPid,
                'price':req.query.price,
                'number':req.query.number,
                'detail':req.query.detail,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


