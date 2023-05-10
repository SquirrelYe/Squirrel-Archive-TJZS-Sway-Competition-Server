//导入模型
const company = require("../../interface/user&admin/company").company;
const transaction =
  require("../../interface/operation/transaction").transaction;
//yield
var co = require("co");

//外键在
company.hasMany(transaction, {
  foreignKey: "me",
  constraints: false,
});
transaction.belongsTo(company, {
  foreignKey: "me",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    company.sync();
    transaction.sync().then((msg) => {
      res.send(msg);
    });
  },
  add: function (req, res) {
    co(function* () {
      var transaction1 = yield transaction.create({
        id: req.query.transaction_id,
      });
      var company1 = yield company.findById(req.query.company_id);
      yield transaction1.setCompany(company1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var transaction1 = yield transaction.findById(req.query.transaction_id);
      var company1 = yield company.findById(req.query.company_id);
      yield transaction1.setCompany(company1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  del: function (req, res) {
    co(function* () {
      var transaction1 = yield transaction.findById(req.query.transaction_id);
      yield transaction1.setCompany(null).then((msg) => {
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
          model: transaction,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_transaction: function (req, res) {
    transaction
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
