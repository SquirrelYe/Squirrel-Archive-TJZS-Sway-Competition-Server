const Sequelize = require("sequelize");
const conn = require("../../promise/promise").connection();
const judge = require("../../interface/TrueOrFalse").judge;

// 模型层定义
let research = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "research",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: Sequelize.CHAR(255), //研究所型号
      allowNull: judge,
    },
    brand: {
      type: Sequelize.DOUBLE(255), //研究所品牌提升
      allowNull: judge,
    },
    formula: {
      type: Sequelize.DOUBLE(255), //配方工艺
      allowNull: judge,
    },
    price: {
      type: Sequelize.DOUBLE(255), //研究所价值
      allowNull: judge,
    },
    conrequire: {
      type: Sequelize.DOUBLE(255), //建设要求
      allowNull: judge,
    },
  }
);

module.exports = {
  research,
  //查询所有
  findAll: function (req, res) {
    research.findAll().then(
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
    research
      .create({
        id: req.query.id,
        model: req.query.model,
        brand: req.query.brand,
        formula: req.query.formula,
        price: req.query.price,
        conrequire: req.query.conrequire,
      })
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
  //删除
  delete: function (req, res) {
    research
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
    research
      .update(
        {
          model: req.query.model,
          brand: req.query.brand,
          formula: req.query.formula,
          price: req.query.price,
          conrequire: req.query.conrequire,
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
    research.findById(req.query.id).then(
      (msg) => {
        res.send(msg);
      },
      function (err) {
        console.log(err);
      }
    );
  },
};
