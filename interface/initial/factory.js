const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let factory = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'factory',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'GCid': {
            'type': Sequelize.INTEGER(11), // 工厂id
            'allowNull': false,        
        },
        'Aid': {
            'type': Sequelize.INTEGER(11), // 管理员id
            'allowNull': false,        
        },
        'model': {
            'type': Sequelize.CHAR(255), //工厂型号
            'allowNull': false
        },
        'measure': {
            'type': Sequelize.DOUBLE(255), //占用面积
            'allowNull': false
        },
        'includeline': {
            'type': Sequelize.DOUBLE(255), //容纳生产线
            'allowNull': false
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //建设成本
            'allowNull': false
        },
    }
);

module.exports={
    factory,
    //查询所有
    findAll:function(req,res){
        factory.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        factory.create({
            'Sid':req.query.Sid,
            'GCid':req.query.GCid,
            'Aid':req.query.Aid,
            'model':req.query.model,
            'measure':req.query.measure,
            'includeline':req.query.includeline,
            'price':req.query.price,
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
        factory.destroy({
            'where':{
                'GCid':req.query.GCid,
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
        factory.update(
            {
                'Sid':req.query.Sid,
                'Aid':req.query.Aid,
                'model':req.query.model,
                'measure':req.query.measure,
                'includeline':req.query.includeline,
                'price':req.query.price,
            },
            {'where':{
                'GCid':req.query.GCid
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


