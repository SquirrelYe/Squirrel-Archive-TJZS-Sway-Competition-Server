//导入模型
const s = require('../interface/initial/source').source;
const m = require('../interface/initial/mining').mining;
//yield
var co = require('co');
//外键在 
m.belongsTo(s, {
    foreignKey: 'YLid',
    constraints: false
});
s.hasMany(m, {
    foreignKey: 'YLid',
    constraints: false
});

module.exports = {
    //增加 原料->矿区
    add: function (req, res) {
        co(function* () {
            var s1 = yield s.create({'Sid': '1'});
            // var m1 = yield m.create({'Sid': '1'});
            var m1 = yield m.findAll({
                where: {id: '1'}
            });
            yield s1.addMining(m1).then(msg => {
                res.send(msg);
            });
        }).catch(function (e) {
            console.log(e);
        });
    },
    //查找所有
    find: function (req, res) {
        m.findAll({
            // where: {}, m的查询条件
            include: {
                model: s, // 关联查询
                // where: {} // s的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }

}