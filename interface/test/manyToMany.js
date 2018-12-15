const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var co = require('co');  //yield

var Note_mtm = conn.define('Note_mtm', {
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
});
var Tag = conn.define('tag', {
    'name': {
        'type': Sequelize.CHAR(64),
        'allowNull': false,
        'unique': true
    }
});
var Tagging = conn.define('tagging', {
    'type': {
        'type': Sequelize.INTEGER(),
        'allowNull': true
    }
});

Note_mtm.belongsToMany(Tag, {'through': Tagging});
Tag.belongsToMany(Note_mtm, {'through': Tagging});

module.exports = {
    creat:function(req, res){
        //强制自动建表
        Note_mtm.sync({force: true});
        Tag.sync({force: true});
        Tagging.sync({force: true}).then(msg => {
            res.send(msg);
        });
    },
    async create1(req,res) {
        //例如我们tag表有2条数据，[{id:1,name:'标签1'},{id:2,name:'标签2'}]
        //传递进来的data = {name:'文章1',tagIds:[1,2]}
            let n = await Note_mtm.create({title: '4'}); //返回创建的post对象
            let t = await Tag.findAll({where: {id: data['tagIds']}})//找到对应的tagId对象
            //let t = await Tag.findAll()//找到对应的tagId对象
            console.log(t);
            await n.setTags(t)//通过setTags方法在postTag表添加记录
            .then(msg=>{
                res.send(msg)
            })
            .catch(function (err) {
                console.log(err);
              }) 
            // return true
            
            //以上操作会给post表创建一条新的记录，{id:1,name:'文章1'}
            //给postTag表添加2条记录,[{id:1,postId:1,tagId:1},{id:2,post:1,tagId:2}]
        },
    add: function (req, res) {
        co(function* () {
            // code here
            var note = yield Note_mtm.create({'title': '6'});
            var tag = yield Tag.create({'name': '6'});
            yield note.addTag(tag, {'type': 1});
            // let t = await Tag.findAll()//找到对应的tagId对象
        }).catch(function(e) {
            console.log(e);
      });
    },
    
    update: function (req, res) {
        User2.update({
            'id': '2'
        }, {
            'where': {
                'id': '1'
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    del: function (req, res) {
        //User.hasOne(Account);
        //Account.belongsTo(User);
        //外键建立在Account端 
        //默认 删除设空，更新级联
        User2.destroy({
            'where': {
                'id': '1'
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find: function (req, res) {
        Note_mtm.findAll({
            // where: {}, user的查询条件
            include: {
                model: Tag, // 关联查询
                // where: {} // Account的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}