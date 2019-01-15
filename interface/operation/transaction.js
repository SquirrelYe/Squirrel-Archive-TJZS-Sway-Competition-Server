const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();
const j=require('../../interface/TrueOrFalse').judge;
const source=require('../initial//source').source;
const commerresearch=require('../../interface/operation/commerresearch').commerresearch
const company=require('../user&admin/company').company
const digger=require('../initial/digger').digger
const mining=require('../initial/mining').mining
const indusland=require('../initial/indusland').indusland
const factory=require('../initial/factory').factory
const line=require('../initial/line').line
const commerland=require('../initial/commerland').commerland
const research=require('../initial/research').research

// 模型层定义
let transaction = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'transaction',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': j,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'Yearid': {
            'type': Sequelize.INTEGER(11),  //财年
            'allowNull': j,     
        }, 
        'inout': {
            'type': Sequelize.INTEGER(11),  //判断 支出还是流入
            'allowNull': j,        
        },
        'type': {
            'type': Sequelize.INTEGER(11),  //交易类型 
            'allowNull': j,     
        },
        'kind': {
            'type': Sequelize.INTEGER(11), // 订单类型
            'allowNull': j,     
        },
        'price': {
            'type': Sequelize.DOUBLE(10), // 单价
            'allowNull': j,     
        },
        'number': {
            'type': Sequelize.INTEGER(11), // 交易数量
            'allowNull': j,     
        },
        'detail': {
            'type': Sequelize.CHAR(255), // 交易明细
            'allowNull': j,     
        },
        'me':{
            'type':Sequelize.INTEGER(11), //甲方
            'allowNull':j,
        }, 
        'other': {
            'type': Sequelize.INTEGER(11), // 交易另一方
            'allowNull': j,     
        },
        'source_id':{                     //交易的原料的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j,
        },
        'commerresearch_id':{             //交易的产品的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'digger_id':{             //竞拍的挖掘机的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'mining_id':{             //竞拍的矿区的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'indusland_id':{             //竞拍的工业用地的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'factory_id':{             //竞拍的工厂的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'line_id':{             //竞拍的生产线的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'commerland_id':{             //竞拍的商业用地的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        },
        'research_id':{             //研究所的id
            'type':Sequelize.INTEGER(11),
            'allowNull':j
        }
    }
);


//关联研究产品
commerresearch.hasMany(transaction, {
    foreignKey: 'commerresearch_id',
    constraints: false
});
transaction.belongsTo(commerresearch, {
    foreignKey: 'commerresearch_id',
    constraints: false
});

//关联原料
source.hasMany(transaction, {
    foreignKey: 'source_id',
    constraints: false
});
transaction.belongsTo(source, {
    foreignKey: 'source_id',
    constraints: false
});

//关联公司
company.hasMany(transaction, {
    foreignKey: 'me',
    as:'me_1',
    constraints: false
});
transaction.belongsTo(company, {
    foreignKey: 'me',
    as:'me_1',
    constraints: false
});

//关联公司
company.hasMany(transaction, {
    foreignKey: 'other',
    as:'other_1',
    constraints: false
});
transaction.belongsTo(company, {
    foreignKey: 'other',
    as:"other_1",
    constraints: false
});

//关联挖掘机
digger.hasMany(transaction, {
    foreignKey: 'digger_id',
    constraints: false
});
transaction.belongsTo(digger, {
    foreignKey: 'digger_id',
    constraints: false
});

//关联矿区
mining.hasMany(transaction, {
    foreignKey: 'mining_id',
    constraints: false
});
transaction.belongsTo(mining, {
    foreignKey: 'mining_id',
    constraints: false
});

//关联工业用地
indusland.hasMany(transaction, {
    foreignKey: 'indusland_id',
    constraints: false
});
transaction.belongsTo(indusland, {
    foreignKey: 'indusland_id',
    constraints: false
});

//关联工厂
factory.hasMany(transaction, {
    foreignKey: 'factory_id',
    constraints: false
});
transaction.belongsTo(factory, {
    foreignKey: 'factory_id',
    constraints: false
});

//关联生产线
line.hasMany(transaction, {
    foreignKey: 'line_id',
    constraints: false
});
transaction.belongsTo(line, {
    foreignKey: 'line_id',
    constraints: false
});

//关联研究所
research.hasMany(transaction, {
    foreignKey: 'research_id',
    constraints: false
});
transaction.belongsTo(research, {
    foreignKey: 'research_id',
    constraints: false
});

//关联商业用地
commerland.hasMany(transaction, {
    foreignKey: 'commerland_id',
    constraints: false
});
transaction.belongsTo(commerland, {
    foreignKey: 'commerland_id',
    constraints: false
});

module.exports={
    transaction,
    //查询所有
    findAll:function(req,res){
        transaction.findAll(
            {
                include: [{model: source},{model:commerresearch},{model:digger},{model:mining},{model:indusland},{model:factory},{model:line},{model:commerland},{model:research},{model:company,as:'me_1',},{model:company,as:'other_1'}]
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
        transaction.create({
            'id':req.query.id,
            'Yearid':req.query.Yearid,
            'inout':req.query.inout,
            'type':req.query.type,
            'kind':req.query.kind,
            'price':req.query.price,
            'number':req.query.number,
            'detail':req.query.detail,
            'me':req.query.me,
            'other':req.query.other,
            'source_id':req.query.source_id,
            'commerresearch_id':req.query.commerresearch_id,
            'digger_id':req.query.digger_id,
            'mining_id':req.query.mining_id,
            'indusland_id':req.query.indusland_id,
            'factory_id':req.query.factory_id,
            'line_id':req.query.line_id,
            'research_id':req.query.research_id,
            'commerland_id':req.query.commerland_id,
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
        transaction.update(
            {
                'Yearid':req.query.Yearid,
                'inout':req.query.inout,
                'type':req.query.type, 
                'kind':req.query.kind,
                'price':req.query.price,
                'number':req.query.number,
                'detail':req.query.detail,
                'me':req.query.me,
                'other':req.query.other,
                'source_id':req.query.source_id,
                'commerresearch_id':req.query.commerresearch_id,
                'digger_id':req.query.digger_id,
                'mining_id':req.query.mining_id,
                'indusland_id':req.query.indusland_id,
                'factory_id':req.query.factory_id,
                'line_id':req.query.line_id,
                'research_id':req.query.research_id,
                'commerland_id':req.query.commerland_id,
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
    findCommer: function (req, res) {
        transaction.findAll({
            include: {
                model: commerresearch, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    findSource: function (req, res) {
        transaction.findAll({
            include: {
                model: source, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    findByCommer: function (req, res) {
        transaction.findAll({
            where:{
                source_id:null,
                other:null
            },
            include: [{model: commerresearch},{model:company}]
        }).then(msg => {
            res.send(msg);
        })
    },
    findBySource: function (req, res) {
        transaction.findAll({
            where:{
                commerresearch_id:null,
                other:null
            },
            include: [{model: source},{model:company}]
        }).then(msg => {
            res.send(msg);
        })
    },
    //查看自己公司的交易明细
    findByCompany:function(req,res){
        transaction.findAll(
        {
            where:{
               $or:[
                   {'me':req.query.company_id},
                {'other':req.query.company_id}
               ]
            },
         include: [{model: source},{model:commerresearch},{model:digger},{model:mining},{model:indusland},{model:factory},{model:line},{model:commerland},{model:research},{model:company,as:'me_1',},{model:company,as:'other_1'}]
        }).then(msg => {
            res.send(msg);
        })
    },
    //查看自己公司的交易明细
    findByCompanyAndType:function(req,res){
        transaction.findAll(
        {
            where:{
               $or:[
                    {'me':req.query.company_id},
                    {'other':req.query.company_id}
               ],
               type:req.query.type
            },
         include: [{model: source},{model:commerresearch},{model:digger},{model:mining},{model:indusland},{model:factory},{model:line},{model:commerland},{model:research},{model:company,as:'me_1',},{model:company,as:'other_1'}]
        }).then(msg => {
            res.send(msg);
        })
    }

}


