//导入模型
const mining = require("../../interface/initial/mining").mining;
const miniyield = require("../../interface/operation/miniyield").miniyield;
//yield
var co = require("co");
//外键在
mining.hasOne(miniyield, {
  foreignKey: "mining_id",
  constraints: false,
});
miniyield.belongsTo(mining, {
  foreignKey: "mining_id",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    mining.sync();
    miniyield.sync().then((msg) => {
      res.send(msg);
    });
  },
  add: function (req, res) {
    co(function* () {
      var miniyield1 = yield miniyield.create({ id: req.query.miniyield_id });
      var mining1 = yield mining.findById(req.query.mining_id);
      yield miniyield1.setMining(mining1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var miniyield1 = yield miniyield.findById(req.query.miniyield_id);
      var mining1 = yield mining.findById(req.query.mining_id);
      yield miniyield1.setMining(mining1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  del: function (req, res) {
    co(function* () {
      var miniyield1 = yield miniyield.findById(req.query.miniyield_id);
      yield miniyield1.setMining(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_mining: function (req, res) {
    mining
      .findAll({
        include: {
          model: miniyield,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_miniyield: function (req, res) {
    miniyield
      .findAll({
        include: {
          model: mining,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
