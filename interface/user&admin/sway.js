const Sequelize = require("sequelize");
const conn = require("../../promise/promise").connection();
const judge = require("../../interface/TrueOrFalse").judge;
const company = require("../../interface/user&admin/company").company;

// 模型层定义
let sway = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  "sway",
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.CHAR(255), // 用户名
      allowNull: judge,
    },
    pass: {
      type: Sequelize.CHAR(255), //密码
      allowNull: judge,
    },
    email: {
      type: Sequelize.CHAR(255), // 邮箱
      allowNull: judge,
    },
    office: {
      type: Sequelize.CHAR(255), // 邮箱
      allowNull: judge,
    },
    company_id: {
      type: Sequelize.INTEGER(11),
      allowNull: judge,
    },
    cname: {
      type: Sequelize.CHAR(255),
      allowNull: judge,
    },
  }
);

//外键在
company.hasMany(sway, {
  foreignKey: "company_id",
  constraints: false,
});
sway.belongsTo(company, {
  foreignKey: "company_id",
  constraints: false,
});

module.exports = {
  //查询所有
  sway,
  findAll: function (req, res) {
    sway.findAll().then(
      (msg) => {
        res.send(msg);
      },
      function (err) {
        console.log(err);
      }
    );
  },
  //查询注册时用户名是否被占用
  selectNameFirst: function (req, res) {
    sway
      .findAll({
        where: {
          name: req.query.name,
        },
      })
      .then(
        (msg) => {
          if (msg.length == 0) {
            res.send(`{ "success": true }`);
          } else {
            res.send(`{ "success": "oversize" }`);
          }
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //查询注册时邮箱是否被占用
  selectUsersByEmail: function (req, res) {
    sway
      .findAll({
        where: {
          email: req.query.email,
        },
      })
      .then(
        (msg) => {
          if (msg.length == 0) {
            res.send(`{ "success": true }`);
          } else {
            res.send(`{ "success": "oversize" }`);
          }
        },
        function (err) {
          console.log(err);
        }
      );
  },
  //查询参赛者是否有公司
  selectUsersHaveCompany: function (req, res) {
    sway
      .findOne({
        attributes: ["company_id"],
        where: {
          id: req.query.sway_id,
        },
      })
      .then(
        (msg) => {
          console.log(msg);
          if (msg.company_id == null) {
            res.send(`{ "success": true }`);
          } else {
            res.send(`{ "success": false }`);
          }
        },
        function (err) {
          console.log(err);
        }
      );
  },

  //登录
  login: function (req, res) {
    sway
      .findOne({
        where: {
          name: req.query.name,
          pass: req.query.pass,
        },
        include: { model: company },
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

  //注册用户
  create: function (req, res) {
    sway
      .findOrCreate({
        where: {
          name: req.query.name,
          email: req.query.email,
        },
        defaults: {
          name: req.query.name,
          pass: req.query.pass,
          email: req.query.email,
          office: null,
          company_id: null,
          cname: req.query.cname,
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
  //更新密码（密码找回）
  updatePass: function (req, res) {
    sway
      .update(
        { pass: req.query.pass },
        {
          where: {
            email: req.query.email,
          },
        }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
  //删除
  delete: function (req, res) {
    sway
      .destroy({
        where: {
          id: req.query.id,
        },
      })
      .then((row) => {
        if (row === 0) {
          console.log("删除记录失败");
          res.send(`{ "success": false }`);
        } else {
          console.log("成功删除记录");
          res.send(`{ "success": true }`);
        }
      });
  },
  //更新
  update: function (req, res) {
    sway
      .update(
        {
          name: req.query.name,
          pass: req.query.pass,
          email: req.query.email,
          cname: req.query.cname,
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
    sway
      .findById(req.query.id, {
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
  //查询一个公司的所有人员信息
  findByCompanyId: function (req, res) {
    sway
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

  //更新职位
  updateOffice: function (req, res) {
    sway
      .update(
        {
          office: req.query.office,
        },
        {
          where: {
            id: req.query.sway_id,
          },
        }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
};
