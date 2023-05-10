const Sequelize = require("sequelize");
const conn = require("../../promise/promise").connection();
const judge = require("../../interface/TrueOrFalse").judge;
const company = require("../user&admin/company").company;
const commerresearch = require("../operation/commerresearch").commerresearch;

// 模型层定义
let oem = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "oem",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
      primaryKey: true,
      autoIncrement: true,
    },
    me: {
      type: Sequelize.INTEGER(11), // 委托方公司
      allowNull: judge,
    },
    other: {
      type: Sequelize.INTEGER(11), // 受委托方公司
      allowNull: judge,
    },
    commerresearch_id: {
      type: Sequelize.INTEGER(11), // 代工产品id
      allowNull: judge,
    },
  }
);

//关联公司
company.hasMany(oem, {
  foreignKey: "me",
  as: "me_2",
  constraints: false,
});
oem.belongsTo(company, {
  foreignKey: "me",
  as: "me_2",
  constraints: false,
});

//关联公司
company.hasMany(oem, {
  foreignKey: "other",
  as: "other_2",
  constraints: false,
});
oem.belongsTo(company, {
  foreignKey: "other",
  as: "other_2",
  constraints: false,
});

//关联商品
commerresearch.hasMany(oem, {
  foreignKey: "commerresearch_id",
  constraints: false,
});
oem.belongsTo(commerresearch, {
  foreignKey: "commerresearch_id",
  constraints: false,
});

module.exports = {
  oem,
  //查询所有
  findAll: function (req, res) {
    oem
      .findAll({
        include: [
          { model: company, as: "me_2" },
          { model: company, as: "other_2" },
          { model: commerresearch },
        ],
      })
      .then(
        (msg) => {
          res.send(msg);
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //增加
  create: function (req, res) {
    oem
      .findOrCreate({
        where: {
          me: req.query.me,
          other: req.query.other,
          commerresearch_id: req.query.commerresearch_id,
        },
        defaults: {
          me: req.query.me,
          other: req.query.other,
          commerresearch_id: req.query.commerresearch_id,
        },
      })
      .then(
        (msg) => {
          res.send(msg);
        },
        function (err) {
          res.send(`{ "success": "false" }`);
          console.log(err);
        }
      );
  },
  //删除
  delete: function (req, res) {
    oem
      .destroy({
        where: {
          id: req.query.id,
        },
      })
      .then(
        (row) => {
          if (row === 0) {
            console.log("删除记录失败");
            res.send(`{ "success": false }`);
          } else {
            console.log("成功删除记录");
            res.send(`{ "success": true }`);
          }
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //更新
  update: function (req, res) {
    oem
      .update(
        {
          me: req.query.me,
          other: req.query.other,
          commerresearch_id: req.query.commerresearch_id,
        },
        {
          where: {
            id: req.query.id,
          },
        }
      )
      .then(
        (msg) => {
          res.send(`{ "success": "true" }`);
        },
        function (err) {
          res.send(`{ "success": "false" }`);
          console.log(err);
        }
      );
  },
  //按ID查询
  findById: function (req, res) {
    oem.findById(req.query.id).then(
      (msg) => {
        res.send(msg);
      },
      function (err) {
        console.log(err);
      }
    );
  },
  //
  findByCompany: function (req, res) {
    oem
      .findAll({
        where: { me: req.query.me },
        include: [
          { model: company, as: "me_2" },
          { model: company, as: "other_2" },
          { model: commerresearch },
        ],
      })
      .then(
        (msg) => {
          res.send(msg);
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //
  findByCompanyAndCommerresearch: function (req, res) {
    oem
      .findAll({
        where: {
          me: req.query.me,
          commerresearch_id: req.query.commerresearch_id,
        },
        include: [
          { model: company, as: "me_2" },
          { model: company, as: "other_2" },
          { model: commerresearch },
        ],
      })
      .then(
        (msg) => {
          res.send(msg);
        },
        function (err) {
          console.log(err);
        }
      );
  },

  findByOther: function (req, res) {
    oem
      .findAll({
        where: { other: req.query.other },
        include: [
          { model: company, as: "me_2" },
          { model: company, as: "other_2" },
          { model: commerresearch },
        ],
      })
      .then(
        (msg) => {
          res.send(msg);
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //删除某一个物品全部的代工权限
  deleteByOem: function (req, res) {
    oem
      .destroy({
        where: {
          commerresearch_id: req.query.commerresearch_id,
        },
      })
      .then(
        (row) => {
          if (row === 0) {
            console.log("删除记录失败");
            res.send(`{ "success": false }`);
          } else {
            console.log("成功删除记录");
            res.send(`{ "success": true }`);
          }
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //删除某一个物品和公司的代工权限
  deleteByOemAndCompany: function (req, res) {
    oem
      .destroy({
        where: {
          commerresearch_id: req.query.commerresearch_id,
          other: req.query.other,
        },
      })
      .then(
        (row) => {
          if (row === 0) {
            console.log("删除记录失败");
            res.send(`{ "success": false }`);
          } else {
            console.log("成功删除记录");
            res.send(`{ "success": true }`);
          }
        },
        function (err) {
          console.log(err);
        }
      );
  },
};
