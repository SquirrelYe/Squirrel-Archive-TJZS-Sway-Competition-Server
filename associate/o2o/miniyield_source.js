//导入模型
const source = require('../../interface/initial/source').source;
const miniyield = require('../../interface/operation/miniyield').miniyield;
//yield
var co = require('co');
//外键在 
source.hasOne(miniyield, {
    foreignKey: 'source_id',
    constraints: false
});
miniyield.belongsTo(source, {
    foreignKey: 'source_id',
    constraints: false
});


module.exports = {
    creat: function (req, res) {
        //强制自动建表
        source.sync();
        miniyield.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            var miniyield1 = yield miniyield.create({'id':req.query.miniyield_id}); 
            var source1 = yield source.findById(req.query.source_id)  
            yield miniyield1.setSource(source1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        co(function* () {
            var miniyield1 = yield miniyield.findById(req.query.miniyield_id)  
            var source1 = yield source.findById(req.query.source_id)  
            yield miniyield1.setSource(source1) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        co(function* () {
            var miniyield1 = yield miniyield.findById(req.query.miniyield_id)  
            yield miniyield1.setSource(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_source: function (req, res) {
        source.findAll({
            include: {
                model: miniyield, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_miniyield:function(req,res){
        miniyield.findAll({
            include: {
                model: source, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    findByCompany:function(req,res){
        miniyield.findAll({
            where:{
                'company_id':req.query.company_id,
            },
            include: {
                model: source, 
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}