const Sequelize = require("sequelize");
const conn = require("../../promise/promise").connection();
const judge = require("../../interface/TrueOrFalse").judge;
const company = require("../user&admin/company").company;

// 模型层定义
let commerresearch = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "commerresearch",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.CHAR(255), // 研发产品名称
      allowNull: judge,
    },
    function: {
      type: Sequelize.CHAR(255), // 研发产品原理
      allowNull: judge,
    },
    introduction: {
      type: Sequelize.CHAR(255), // 研发产品介绍
      allowNull: judge,
    },
    condition: {
      type: Sequelize.INTEGER(11), // 申请产品状态
      allowNull: judge,
    },
    price: {
      type: Sequelize.DOUBLE(10),
      allowNull: judge,
    },
    maxprice: {
      type: Sequelize.DOUBLE(10), // 研发产品最高单价
      allowNull: judge,
    },
    commerland_id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    company_id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    law: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    s1: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    s2: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    s3: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    s4: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    s5: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
  }
);

company.hasOne(commerresearch, {
  foreignKey: "company_id",
  constraints: false,
});
commerresearch.belongsTo(company, {
  foreignKey: "company_id",
  constraints: false,
});

module.exports = {
  commerresearch,
  findAll: function (req, res) {
    commerresearch
      .findAll({
        include: [{ model: company }],
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
  findAllByCompany: function (req, res) {
    commerresearch
      .findAll({
        where: {
          company_id: req.query.company_id,
        },
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
    commerresearch
      .create({
        id: req.query.id,
        name: req.query.name,
        function: req.query.function,
        introduction: req.query.introduction,
        condition: req.query.condition,
        price: req.query.price,
        maxprice: req.query.maxprice,
        commerland_id: req.query.commerland_id,
        company_id: req.query.company_id,
        law: req.query.law,
        s1: req.query.s1,
        s2: req.query.s2,
        s3: req.query.s3,
        s4: req.query.s4,
        s5: req.query.s5,
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
    commerresearch
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
    commerresearch
      .update(
        {
          name: req.query.name,
          function: req.query.function,
          introduction: req.query.introduction,
          condition: req.query.condition,
          price: req.query.price,
          maxprice: req.query.maxprice,
          commerland_id: req.query.commerland_id,
          company_id: req.query.company_id,
          law: req.query.law,
          s1: req.query.s1,
          s2: req.query.s2,
          s3: req.query.s3,
          s4: req.query.s4,
          s5: req.query.s5,
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
  findByYl: function (req, res) {
    commerresearch
      .findAndCountAll({
        attributes: ["law", "condition"],
        where: {
          s1: req.query.s1,
          s2: req.query.s2,
          s3: req.query.s3,
          s4: req.query.s4,
          s5: req.query.s5,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  findById: function (req, res) {
    commerresearch.findById(req.query.id).then((msg) => {
      res.send(msg);
    });
  },
};
