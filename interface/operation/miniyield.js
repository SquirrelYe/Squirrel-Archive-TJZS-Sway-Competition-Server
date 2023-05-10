const Sequelize = require("sequelize");
const conn = require("../../promise/promise").connection();
const judge = require("../../interface/TrueOrFalse").judge;
const source = require("../../interface/initial/source").source;
const company = require("../../interface/user&admin/company").company;

// 模型层定义
let miniyield = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "miniyield",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
      primaryKey: true,
      autoIncrement: true,
    },
    mining_id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    source_id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    company_id: {
      type: Sequelize.INTEGER(11), // 矿区id
      allowNull: judge,
    },
    sum: {
      type: Sequelize.DOUBLE(11), // 原料产量
      allowNull: judge,
    },
    ispublic: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
  }
);

source.hasMany(miniyield, {
  foreignKey: "source_id",
  constraints: false,
});
miniyield.belongsTo(source, {
  foreignKey: "source_id",
  constraints: false,
});

company.hasMany(miniyield, {
  foreignKey: "company_id",
  constraints: false,
});
miniyield.belongsTo(company, {
  foreignKey: "company_id",
  constraints: false,
});

module.exports = {
  miniyield,
  //查询所有
  findAll: function (req, res) {
    miniyield
      .findAll({
        include: [{ model: source }, { model: company }],
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
    miniyield
      .findOrCreate({
        where: {
          source_id: req.query.source_id,
          company_id: req.query.company_id,
        },
        defaults: {
          id: req.query.id,
          source_id: req.query.source_id,
          sum: req.query.sum,
          company_id: req.query.company_id,
        },
      })
      .then(
        (msg) => {
          res.send(msg);
        },
        function (err) {
          res.send(`{ "success": false }`);
          console.log(err);
        }
      );
  },
  //删除
  delete: function (req, res) {
    miniyield
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
    miniyield
      .update(
        {
          mining_id: req.query.mining_id,
          source_id: req.query.source_id,
          company_id: req.query.company_id,
          sum: req.query.sum,
          ispublic: req.query.ispublic,
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
  //更新
  updateSum: function (req, res) {
    miniyield
      .update(
        //更改数量
        {
          sum: req.query.sum,
        },
        {
          where: {
            source_id: req.query.source_id,
            company_id: req.query.company_id,
          },
        }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
  //按ID查询
  findById: function (req, res) {
    miniyield.findById(req.query.id).then(
      (msg) => {
        res.send(msg);
      },
      function (err) {
        console.log(err);
      }
    );
  },
  findByCompany: function (req, res) {
    miniyield
      .findAll({
        where: {
          company_id: req.query.company_id,
        },
        include: [{ model: source }, { model: company }],
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

  findByPublic: function (req, res) {
    miniyield
      .findAll({
        where: {
          ispublic: req.query.ispublic,
        },
        include: {
          model: source,
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
};
