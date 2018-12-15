const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();
var co = require('co');

var User_otm = conn.define('user_otm', {
    'name': {
        'type': Sequelize.CHAR(10),
        'allowNull': false,
        'unique': true
    }
});
var Note_otm = conn.define('note_otm', {
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
});
/* User   getNote_otms setNote_otms addNote_otm createNote_otm removeNote_otm hasNo */
User_otm.hasMany(Note_otm,{
    foreignKey:'unid',
    constraints: false
});
/* Note_otm    getUser setUser createUser*/
Note_otm.belongsTo(User_otm,{
    foreignKey:'unid',
    constraints: false
});

module.exports = {
    creat:function(req, res){
        //强制自动建表
        User_otm.sync({force: true});
        Note_otm.sync({force: true}).then(msg => {
            res.send(msg);
        });
    },
    add: function(req, res) {
        co(function* () {
            // code here
            var u = yield User_otm.create({'name': '2'});
            var n = yield Note_otm.create({'title': '2'});
            yield u.addNote_otm(n, {'type': 1});
            // let t = await Tag.findAll()//找到对应的tagId对象
        }).catch(function(e) {
            console.log(e);
      });
    },
    update: function (req, res) {
        User_otm.update({
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
        User_otm.destroy({
            'where': {
                'id': '1'
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find: function (req, res) {
        User_otm.findAll({
            // where: {}, user的查询条件
            include: {
                model: Note_otm, // 关联查询
                // where: {} // Account的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}