const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;
const company=require('../user&admin/company').company

// 模型层定义
let compete = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'compete',
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
        'type': {
            'type': Sequelize.INTEGER(11), // 竞标物品种类
            'allowNull': judge,     
        }, 
        'thingid': {
            'type': Sequelize.INTEGER(11), // 竞拍物品id
            'allowNull': judge,     
        }, 
        'auction': {
            'type': Sequelize.DOUBLE(255), // 竞拍价
            'allowNull': judge,     
        }, 
        'condition': {
            'type': Sequelize.INTEGER(11), // 竞拍状态
            'allowNull': judge,     
        },
        'company_id':{
            'type': Sequelize.INTEGER(11),
            'allowNull': judge,
        } 
    }
);

//关联公司
company.hasMany(compete, {
    foreignKey: 'company_id',
    constraints: false
});
compete.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});

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
        compete.findOrCreate({
            where:{
                'type':req.query.type,
                'thingid':req.query.thingid,
                'company_id':req.query.company_id,
            },
            defaults:{
                'id':req.query.id,
                'Yearid':req.query.Yearid,
                'type':req.query.type,
                'thingid':req.query.thingid,
                'auction':req.query.auction,
                'condition':req.query.condition,
                'company_id':req.query.company_id,
            }
        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            res.send(`{ "success": "false" }`);
        });
    },
    //删除
    delete:function(req,res){
        compete.destroy({
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
        compete.update(
            {
                'Yearid':req.query.Yearid,
                'type':req.query.type,
                'thingid':req.query.thingid,
                'auction':req.query.auction,
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
    updatePrice:function(req,res){
        compete.update(
            {
                'auction':req.query.auction,
                'condition':req.query.condition,
                'Yearid':req.query.Yearid

            },
            {'where':{
                'type':req.query.type,
                'thingid':req.query.thingid,
                'company_id':req.query.company_id
            }
        }).then(msg=>{
            res.send(`{ "success": "true" }`);
        },
        function(err){
            res.send(`{ "success": "false" }`);
            console.log(err); 
        });
    },
    updateCondition:function(req,res){
        compete.update(
            {
                'condition':req.query.condition,
            },
            {'where':{
                'type':req.query.type,
                'thingid':req.query.thingid,
                'company_id':req.query.company_id
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
    findByCompanyId:function(req,res){
        compete.findAll({
            where:{'company_id':req.query.company_id}}
            )
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    findMaxPrice:function(req,res){
        compete.findOne({
            'attributes':['auction']
        ,
        'where':{ 
            'type':req.query.type,
            'thingid':req.query.thingid,
            'company_id':req.query.company_id
        }
    }).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //查询某一个矿区的最高出价者
    findOneByPrice:function(req,res){
        compete.findAll({
            'order': [
                ['auction', 'DESC'],
            ],
            where:{
                'thingid':req.query.thingid,
                'type':req.query.type,
            },
            include:{
                model:company
            }
        }).then(msg => {
            res.send(msg);
        })
    }

}


