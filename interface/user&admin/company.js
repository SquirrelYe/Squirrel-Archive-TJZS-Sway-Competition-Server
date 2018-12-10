const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let company = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'company',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Sid': {
            'type': Sequelize.INTEGER(11), // 赛事id
            'allowNull': false,     
        },   
        'Pid': {
            'type': Sequelize.INTEGER(11), // 用户管理id
            'allowNull': false,        
        },
        'Cid': {
            'type': Sequelize.INTEGER(11), // 公司id
            'allowNull': false,        
        },
        'name': {
            'type': Sequelize.CHAR(255), //公司名称
            'allowNull': false
        },
        'legal': {
            'type': Sequelize.CHAR(255), //法人
            'allowNull': false
        },
        'code': {
            'type': Sequelize.CHAR(255), //统一社会信用代码
            'allowNull': true
        },
        'area': {
            'type': Sequelize.CHAR(255), //经营范围
            'allowNull': false
        },
        'condition': {
            'type':  Sequelize.INTEGER(11), //状态
            'allowNull': false
        },
        'other':{
            'type': Sequelize.CHAR(255),
            'allowNull':false,
        }
    }
);

module.exports={
    company,
    //查询所有
    findAll:function(req,res){
        company.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //增加
    create:function(req,res){
        company.create({
            'Sid':req.query.Pid,
            'Pid':req.query.Pid,
            'Cid':0,
            'name':req.query.name,
            'legal':req.query.legal,
            'code':req.query.code,
            'area':req.query.area,
            'condition':0,
            'other':req.query.others,
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
        company.destroy({
            'where':{
                'Cid':req.query.Cid,
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
        company.update(
            {
                'Sid':req.query.Sid,
                'Pid':req.query.Pid,
                'name':req.query.name,
                'legal':req.query.legal,
                'code':req.query.code,
                'area':req.query.area,
                'condition':req.query.condition,
                'other':req.query.other,
            },
            {'where':{
                'Cid':req.query.Cid,
            }
        }).then(msg=>{
            res.send(msg);
        })
    }

}


