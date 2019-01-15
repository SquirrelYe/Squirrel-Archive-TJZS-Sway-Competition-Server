const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;

// 模型层定义
let statistic = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'statistic',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'Yearid': {
            'type': Sequelize.INTEGER(11), // 财年
            'allowNull': judge,        
        },
        'float': {
            'type': Sequelize.DOUBLE(2), // 流动资金
            'allowNull': judge,
        },
        'fixed':{
            'type':Sequelize.DOUBLE(2), // 固定资金
            'allowNull':judge,
        },
        'total':{
            'type':Sequelize.DOUBLE(2), // 总资产
            'allowNull':judge,
        },
        'brand':{
            'type':Sequelize.CHAR(255), // 品牌价值
            'allowNull':judge,
        },
        'condition':{
            'type':Sequelize.INTEGER(255), // 状态
            'allowNull':judge,
        },
        'company_id':{
            'type':Sequelize.INTEGER(11),
            'allowNull':judge,
        }
    }
);

module.exports={
    statistic,
    //查询所有
    findAll:function(req,res){
        statistic.findAll(
            {
                'order': [
                    ['auction', 'DESC'],
                ]
            }
        ).then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        statistic.create({
            'id':req.query.id,
            'Yearid':req.query.Yearid,
            'float':req.query.float,
            'fixed':req.query.fixed,
            'total':req.query.total,
            'brand':req.query.brand,
            'condition':req.query.condition,
            'company_id':req.query.company_id,
        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
    //删除
    delete:function(req,res){
        statistic.destroy({
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
        statistic.update(
            {
                'Yearid':req.query.Yearid,
                'float':req.query.float,
                'fixed':req.query.fixed,
                'total':req.query.total,
                'brand':req.query.brand,
                'condition':req.query.condition,
                'company_id':req.query.company_id,
            },
            {'where':{
                'id':req.query.id,
            }
        }).then(msg=>{
            res.send(`{ "success": "true" }`);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
    //更新
    updateMoney:function(req,res){
        statistic.update(
            {
                'Yearid':req.query.Yearid,
                'float':req.query.float,
                'fixed':req.query.fixed,
                'total':req.query.total,
                'brand':req.query.brand,
                'condition':req.query.condition,
            },
            {'where':{
                'company_id':req.query.company_id,
            }
        })
        .then(msg=>{
            res.send(msg);
        });
    },
    //按ID查询
    findById:function(req,res){
        statistic.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    findByCompany:function(req,res){
        statistic.findOne({
            where:{
                'company_id':req.query.company_id,
            },
        }
        ).then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    deleteAll(req,res){
        conn.query('delete from statistics;')
        .then(msg=>{
            res.send(`{ "success": "true" }`);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    }

}


