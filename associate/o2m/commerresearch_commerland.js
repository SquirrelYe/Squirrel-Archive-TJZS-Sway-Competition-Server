//导入模型
const commerland = require("../../interface/initial/commerland").commerland;
const commerresearch =
  require("../../interface/operation/commerresearch").commerresearch;
const company = require("../../interface/user&admin/company").company;
//yield
var co = require("co");

//外键在
commerland.hasMany(commerresearch, {
  foreignKey: "commerland_id",
  constraints: false,
});
commerresearch.belongsTo(commerland, {
  foreignKey: "commerland_id",
  constraints: false,
});

company.hasMany(commerresearch, {
  foreignKey: "company_id",
  constraints: false,
});
commerresearch.belongsTo(company, {
  foreignKey: "company_id",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    commerland.sync();
    commerresearch.sync().then((msg) => {
      res.send(msg);
    });
  },
  add: function (req, res) {
    co(function* () {
      var commerresearch1 = yield commerresearch.create({
        id: req.query.commerresearch_id,
      });
      var commerland1 = yield commerland.findById(req.query.commerland_id);
      yield commerresearch1.setCommerland(commerland1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var commerresearch1 = yield commerresearch.findById(
        req.query.commerresearch_id
      );
      var commerland1 = yield commerland.findById(req.query.commerland_id);
      yield commerresearch1.setCommerland(commerland1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  del: function (req, res) {
    co(function* () {
      var commerresearch1 = yield commerresearch.findById(
        req.query.commerresearch_id
      );
      yield commerresearch1.setCommerland(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_commerland: function (req, res) {
    commerland
      .findAll({
        where: {
          company_id: req.query.company_id,
        },
        include: {
          model: commerresearch,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_commerresearch: function (req, res) {
    commerresearch
      .findAll({
        include: {
          model: commerland,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  findAll: function (req, res) {
    commerland
      .findAll({
        where: {
          company_id: req.query.company_id,
        },
        include: [{ model: commerresearch }, { model: company }],
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
