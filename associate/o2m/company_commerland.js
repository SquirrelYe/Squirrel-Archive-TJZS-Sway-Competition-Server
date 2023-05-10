//导入模型
const company = require("../../interface/user&admin/company").company;
const commerland = require("../../interface/initial/commerland").commerland;
//yield
var co = require("co");

//外键在
company.hasMany(commerland, {
  foreignKey: "company_id",
  constraints: false,
});
commerland.belongsTo(company, {
  foreignKey: "company_id",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    company.sync();
    commerland.sync().then((msg) => {
      res.send(msg);
    });
  },
  add: function (req, res) {
    co(function* () {
      var commerland1 = yield commerland.create({
        id: req.query.commerland_id,
      });
      var company1 = yield company.findById(req.query.company_id);
      yield commerland1.setCompany(company1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var commerland1 = yield commerland.findById(req.query.commerland_id);
      var company1 = yield company.findById(req.query.company_id);
      yield commerland1.setCompany(company1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  del: function (req, res) {
    co(function* () {
      var commerland1 = yield commerland.findById(req.query.commerland_id);
      yield commerland1.setCompany(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_company: function (req, res) {
    company
      .findAll({
        include: {
          model: commerland,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_commerland: function (req, res) {
    commerland
      .findAll({
        include: {
          model: company,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
