const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();
var co = require('co');

var user = conn.define('user', {
    'name': {
        'type': Sequelize.CHAR(10),
        'allowNull': false,
        'unique': true //唯一性
    }
});
var note = conn.define('note', {
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
});
/*User   getAccount setAccount addAccount */
user.hasOne(note);
/*Account  getUser setUser addUser */
note.belongsTo(user);

module.exports = {
    creat: function (req, res) {
        //强制自动建表
        user.sync();
        note.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        //增加一条数据 关联 note -> user
        co(function* () {
            var u = yield user.create({'name': '2'});
            var n = yield note.findById('1') 
            // console.log(u)
            yield u.getNote(n)
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
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
        user.findAll({
            // where: {}, user的查询条件
            include: {
                model: note, // 关联查询
                // where: {} // Account的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}