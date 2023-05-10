//导入模型
const commerresearch =
  require("../../interface/operation/commerresearch").commerresearch;
const industryyield =
  require("../../interface/operation/industryyield").industryyield;
//yield
var co = require("co");

//外键在
commerresearch.hasMany(industryyield, {
  foreignKey: "commerresearch_id",
  constraints: false,
});
industryyield.belongsTo(commerresearch, {
  foreignKey: "commerresearch_id",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    commerresearch.sync();
    industryyield.sync().then((msg) => {
      res.send(msg);
    });
  },
  add: function (req, res) {
    co(function* () {
      var industryyield1 = yield industryyield.create({
        id: req.query.industryyield_id,
      });
      var commerresearch1 = yield commerresearch.findById(
        req.query.commerresearch_id
      );
      yield industryyield1.setCommerresearch(commerresearch1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var industryyield1 = yield industryyield.findById(
        req.query.industryyield_id
      );
      var commerresearch1 = yield commerresearch.findById(
        req.query.commerresearch_id
      );
      yield industryyield1.setCommerresearch(commerresearch1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  del: function (req, res) {
    co(function* () {
      var industryyield1 = yield industryyield.findById(
        req.query.industryyield_id
      );
      yield industryyield1.setCommerresearch(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_commerresearch: function (req, res) {
    commerresearch
      .findAll({
        include: {
          model: industryyield,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_industryyield: function (req, res) {
    industryyield
      .findAll({
        include: {
          model: commerresearch,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
