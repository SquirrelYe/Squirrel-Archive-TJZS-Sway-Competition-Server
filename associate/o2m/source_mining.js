//导入模型
const source = require("../../interface/initial/source").source;
const mining = require("../../interface/initial/mining").mining;
//yield
var co = require("co");

//外键在
source.hasMany(mining, {
  foreignKey: "source_id",
  constraints: false,
});
mining.belongsTo(source, {
  foreignKey: "source_id",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    source.sync();
    mining.sync().then((msg) => {
      res.send(msg);
    });
  },
  add: function (req, res) {
    co(function* () {
      var mining1 = yield mining.create({ id: req.query.mining_id });
      var source1 = yield source.findById(req.query.source_id);
      yield mining1.setSource(source1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var mining1 = yield mining.findById(req.query.mining_id);
      var source1 = yield source.findById(req.query.source_id);
      yield mining1.setSource(source1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  del: function (req, res) {
    co(function* () {
      var mining1 = yield mining.findById(req.query.mining_id);
      yield mining1.setSource(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_source: function (req, res) {
    source
      .findAll({
        include: {
          model: mining,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_mining: function (req, res) {
    mining
      .findAll({
        include: {
          model: source,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
