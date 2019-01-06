const Sequelize=require('sequelize')
const commerresearch=require('../../interface/operation/commerresearch').commerresearch
const conn=require('../../promise/promise').connection();
const judge=require('../../interface/TrueOrFalse').judge;



// 模型层定义
let industryyield = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'industryyield',    
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    { 
        'id':{
            'type':Sequelize.INTEGER(11),
            'allowNull': judge,
            'primaryKey':true,
            'autoIncrement':true
        },  
        'kind' : {
            'type':Sequelize.INTEGER(11),
            'allowNull' : judge,
        },
        'sum' : {
            'type': Sequelize.DOUBLE(11), // 生产线产量
            'allowNull' : judge,     
        }, 
        'company_id':{
            'type':Sequelize.INTEGER(11),
            'allowNull' : judge,
        } ,
        'indusland_id' : {
            'type':Sequelize.INTEGER(11),
            'allowNull' : judge,
        } ,
        'commerresearch_id' : {
            'type':Sequelize.INTEGER(11),
            'allowNull' : judge,
        },
        'ispublic' : {
            'type':Sequelize.INTEGER(11),
            'allowNull' : judge,
        }
    }
);


commerresearch.hasMany(industryyield, {
    foreignKey: 'commerresearch_id',
    constraints: false
});
industryyield.belongsTo(commerresearch, {
    foreignKey: 'commerresearch_id',
    constraints: false
});


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
        industryyield.findOrCreate({
            where: {
                'commerresearch_id':req.query.commerresearch_id,
                'company_id':req.query.company_id
            },
            defaults: {                
                'id':req.query.id,
                'kind':req.query.kind,
                'sum':req.query.sum,
                'company_id':req.query.company_id,
                'commerresearch_id':req.query.cname,
                'ispublic':req.query.ispublic
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
        industryyield.destroy({
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
        industryyield.update(
            {
                'kind':req.query.kind,
                'sum':req.query.sum,
                'company_id':req.query.company_id,
                'indusland_id':req.query.indusland_id,
                'ispublic':req.query.ispublic,
                'commerresearch_id':req.query.commerresearch_id,
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
    updateSum:function(req,res){
        miniyield.update(     //更改数量
            {
                'sum':req.query.sum,
            },
            {'where':{
                'commerresearch_id':req.query.commerresearch_id,
                'company_id':req.query.company_id,
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
        industryyield.findById(req.query.id)
        .then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    findByPublic:function(req,res){
        industryyield.findAll(
            {
                where:{
                    'ispublic':req.query.ispublic
                },
                include: {
                    model: commerresearch,
            }
        }).then(msg=>{
            res.send(msg);
        },function(err){
            console.log(err); 
        });
    },
    findByCompany:function(req,res){
        industryyield.findAll(
            {  where:{
                'company_id':req.query.company_id
            },
            include: {
                model: commerresearch,
        }

        }
        ).then(msg=>{
                res.send(msg)
            },
            function(err){
                console.log(err); 
            });        
        },

}


