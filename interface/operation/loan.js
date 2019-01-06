const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;
const company=require('../user&admin/company').company

// 模型层定义
let loan = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'loan',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'from': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': judge,     
        }, 
        'stay': {
            'type': Sequelize.INTEGER(11), // 贷款公司id
            'allowNull': judge,        
        }, 
        'end': {
            'type': Sequelize.INTEGER(11), // 应还财年
            'allowNull': judge,     
        },
        'rate': {
            'type': Sequelize.DOUBLE(11), // 利率
            'allowNull': judge,     
        },
        'money':{
            'type':Sequelize.DOUBLE(11),
            'allowNull':judge,
        },
        'send': {
            'type': Sequelize.DOUBLE(11), // 应还
            'allowNull': judge,     
        },
        'condition': {
            'type': Sequelize.INTEGER(11), // 贷款状态
            'allowNull': judge,     
        },
        'company_id':{
            'type':Sequelize.INTEGER(11),
            'allowNull':judge,
        },
        'detail':{
            'type':Sequelize.CHAR(11),
            'allowNull':judge
        }
    }
);

module.exports={
    loan,
    //查询所有
    findAll:function(req,res){
        loan.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        loan.findOrCreate({
            where: {
                'condition':req.query.condition,
                'company_id':req.query.company_id
            },
            defaults: {                
                'id':req.query.id,
                'from':req.query.from,
                'stay':req.query.stay,
                'end':req.query.end,
                'rate':req.query.rate,
                'money':req.query.money,
                'send':req.query.send,
                'condition':req.query.condition,
                'company_id':req.query.company_id,
                'detail':req.query.detail,
            }
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
        loan.destroy({
            'where':{
                'id':req.query.id,
            }
        }).then(row=> {
            if(row === 0){
                console.log('删除记录失败');
                res.send(`{ "success": false }`);
             }else{
                console.log('成功删除记录');
                res.send(`{ "success": true }`);
             }
          },
          function(err){
              console.log(err); 
        });
    },
    //更新
    update:function(req,res){
        loan.update(
            {
                'from':req.query.from,
                'stay':req.query.stay,
                'end':req.query.end,
                'rate':req.query.rate,
                'money':req.query.money,
                'send':req.query.send,
                'condition':req.query.condition,
                'company_id':req.query.company_id,
                'detail':req.query.detail
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
    //按ID查询
    findById:function(req,res){
        loan.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    findByCompany:function(req,res){
        loan.findAll(
          {
               where:{'company_id':req.query.company_id },
               include:{
                   model:company,
               }

         }
        )
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },

}


