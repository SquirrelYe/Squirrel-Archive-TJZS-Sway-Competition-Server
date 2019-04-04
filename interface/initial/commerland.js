const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;
const company=require('../user&admin/company').company

// 模型层定义
let commerland = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'commerland',
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
        'level': {
            'type': Sequelize.CHAR(255), //商业用地等级
            'allowNull': judge,
        },
        'brand': {
            'type': Sequelize.DOUBLE(255), //品牌价值
            'allowNull': judge,
        },
        'increment': {
            'type': Sequelize.DOUBLE(255), //增值空间
            'allowNull': judge,
        },
        'startprice':{
            'type':Sequelize.DOUBLE(10),
            'allowNull':judge,
        },
        'price': {
            'type': Sequelize.DOUBLE(255), //成交价
            'allowNull': judge,
        },
        'condition': {
            'type': Sequelize.INTEGER(11), //状态
            'allowNull': judge,
        },
        'company_id': {
            'type': Sequelize.INTEGER(255), //成交公司
            'allowNull': judge,
        },
        'research_id':{
            'type':Sequelize.INTEGER(11),  //研究所的类型
            'allowNull':judge,
        }
    }
);

company.hasOne(commerland, {
    foreignKey: 'company_id',
    constraints: false
});
commerland.belongsTo(company, {
    foreignKey: 'company_id',
    constraints: false
});

module.exports={
    commerland,
    //查询所有
    findAll:function(req,res){
        commerland.findAll(
            {
                'order': [
                    ['created_at', 'DESC'],
                ],
                include:{
                    model:company
                }
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
        commerland.create({
            'id':req.query.id,
            'Yearid':req.query.Yearid,
            'level':req.query.level,
            'brand':req.query.brand,
            'increment':req.query.increment,
            'startprice':req.query.startprice,
            'price':req.query.price,
            'condition':req.query.condition,
            'company_id':req.query.company_id,
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
        commerland.update(
            {
                'Yearid':req.query.Yearid,
                'level':req.query.level,
                'brand':req.query.brand,
                'increment':req.query.increment,
                'startprice':req.query.startprice,
                'price':req.query.price,
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

    //
    findByCompany:function(req,res){
        commerland.findAll(
            {
                include:{
                    model:company
                },
                where:{
                    company_id:req.query.company_id
                }

            }
        ).then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //按ID查询
    findById:function(req,res){
        commerland.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    selectLevel:function(req,res){
        commerland.findOne({
            'attributes':['level']
        ,
        'where':{ 
            'id':req.query.commerland_id,
        }
    })
    },
    //查询未开启竞拍的商业用地
    findAllByCondition:function(req,res){
        commerland.findAll(
            {
                where:{
                    'Yearid':req.query.Yearid,
                    'condition':-2,
                    'company_id':null
                }
            }
        ).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //计算某个公司商业用地带来的品牌提升
    getSumofBrand:function(req,res){
        commerland.findAll({
            attributes: [[conn.literal('SUM(brand)'), 'result']],
            where:{
                'company_id':req.query.company_id
            },
          } ).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //计算某个公司商业用地的总成交价
    getSumofCommerland:function(req,res){
        commerland.findAndCountAll({
            attributes: [[conn.literal('SUM(price)'), 'result']],
            where:{
                'Yearid':req.query.Yearid,
                'condition':1
            },
          } ).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    }

}


