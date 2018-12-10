const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let commerresearch = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'commerresearch',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'CPid': {
            'type': Sequelize.INTEGER(11), // 申请产品研发id
            'allowNull': false,        
        },
        'Cid': {
            'type': Sequelize.INTEGER(11), // 公司id
            'allowNull': false,        
        },
        'thingid': {
            'type': Sequelize.INTEGER(11), //商业用地id
            'allowNull': false
        },
        'Yid': {
            'type': Sequelize.INTEGER(11), // 研究所id
            'allowNull': false
        },
        'name': {
            'type': Sequelize.CHAR(255), // 研发产品名称
            'allowNull': false
        },
        'function': {
            'type': Sequelize.CHAR(255), // 研发产品原理
            'allowNull': false
        },
        'introduction': {
            'type': Sequelize.CHAR(255), // 研发产品介绍
            'allowNull': false
        },
        'YLids': {
            'type': Sequelize.CHAR(255), // 申请配方原料组成
            'allowNull': false
        },
        'condition': {
            'type': Sequelize.CHAR(255), // 申请产品状态
            'allowNull': false
        },
        'maxprice': {
            'type': Sequelize.DECIMAL(10), // 研发产品最高单价
            'allowNull': false
        },
    }
);

module.exports={
    commerresearch,
    //查询所有
    findAll:function(req,res){
        commerresearch.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        commerresearch.create({
            'Sid':req.query.Sid,
            'CPid':req.query.CPid,
            'Cid':req.query.Cid,
            'thingid':req.query.thingid,
            'Yid':req.query.Yid,
            'name':req.query.name,
            'function':req.query.function,
            'introduction':req.query.introduction,
            'YLids':req.query.YLids,
            'condition':req.query.condition,
            'maxprice':req.query.maxprice,
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
        commerresearch.destroy({
            'where':{
                'CPid':req.query.CPid,
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
        commerresearch.update(
            {
                'Sid':req.query.Sid,
                'Cid':req.query.Cid,
                'thingid':req.query.thingid,
                'Yid':req.query.Yid,
                'name':req.query.name,
                'function':req.query.function,
                'introduction':req.query.introduction,
                'YLids':req.query.YLids,
                'condition':req.query.condition,
                'maxprice':req.query.maxprice,
            },
            {'where':{
                'CPid':req.query.CPid,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


