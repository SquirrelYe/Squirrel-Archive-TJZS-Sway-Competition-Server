//导入模型
const line = require("../../interface/initial/line").line;
const indusland_factory =
  require("../../associate/m2m/indusland_factory").indusland_factory;
const Sequelize = require("sequelize");
const conn = require("../../promise/promise").connection();

// 中间表
var indusland_factory_line = conn.define("indusland_factory_line", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    primaryKey: true,
  },
  start: {
    type: Sequelize.DATE(0),
    allowNull: true,
  },
  stay: {
    type: Sequelize.DOUBLE(2),
    allowNull: true,
  },
  condition: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
  number: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
  commerresearch_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
  },
});
//yield
var co = require("co");
//外键在
indusland_factory.belongsToMany(line, {
  through: indusland_factory_line,
});
line.belongsToMany(indusland_factory, {
  through: indusland_factory_line,
});

module.exports = {
  add: function (req, res) {
    co(function* () {
      var indusland_factory1 = yield indusland_factory.create({
        id: req.query.indusland_factory_id,
      });
      var line1 = yield line.findById(req.query.line_id);

      yield indusland_factory1.addLine(line1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  update: function (req, res) {
    co(function* () {
      var line1 = yield line.findById(req.query.line_id);
      var indusland_factory1 = yield indusland_factory.findById(
        req.query.indusland_factory_id
      );
      yield indusland_factory1.addLine(line1).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  //更新
  update_ifl: function (req, res) {
    indusland_factory_line
      .update(
        {
          condition: req.query.condition,
          start: req.query.start,
          stay: req.query.stay,
          commerresearch_id: req.query.commerresearch_id,
        },
        {
          where: {
            id: req.query.indusland_factory_line_id,
          },
        }
      )
      .then((msg) => {
        res.send(msg);
      });
  },
  del: function (req, res) {
    co(function* () {
      var indusland_factory1 = yield indusland_factory.findById(
        req.query.indusland_factory_id
      );
      yield indusland_factory1.setLines(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_more_1: function (req, res) {
    line
      .findAll({
        include: {
          model: indusland_factory, // 关联查询，关联外键模型
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_more_2: function (req, res) {
    indusland_factory
      .findAll({
        include: {
          model: line, // 关联查询，关联外键模型
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
  find_more_3: function (req, res) {
    indusland_factory
      .findAll({
        where: {
          id: req.query.indusland_factory_id,
        },
        include: {
          model: line, // 关联查询，关联外键模型
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },

  updateNumber: function (req, res) {
    indusland_factory_line
      .update(
        {
          number: req.query.number,
          condition: req.query.condition,
        },
        {
          where: {
            indusland_factory_id: req.query.indusland_factory_id,
            line_id: req.query.line_id,
          },
        }
      )
      .then((msg) => {
        res.send(`{ "success": true }`);
      });
  },
  selectNumber: function (req, res) {
    indusland_factory_line
      .findAndCountAll({
        attributes: ["number"],
        where: {
          indusland_factory_id: req.query.indusland_factory_id,
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
