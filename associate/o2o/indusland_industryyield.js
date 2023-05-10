//导入模型
const indusland = require("../../interface/initial/indusland").indusland;
const industryyield =
  require("../../interface/operation/industryyield").industryyield;
//yield
var co = require("co");
//外键在
indusland.hasOne(industryyield, {
  foreignKey: "indusland_id",
  constraints: false,
});
industryyield.belongsTo(indusland, {
  foreignKey: "indusland_id",
  constraints: false,
});

module.exports = {
  creat: function (req, res) {
    //强制自动建表
    indusland.sync();
    industryyield.sync().then((msg) => {
      res.send(msg);
    });
  },
  // add: function (req, res) {
  //     co(function* () {
  //         var industryyield1 = yield industryyield.create({'id':req.requry.industryyield_id});
  //         var indusland1 = yield indusland.findById(req.query.indusland_id)
  //         yield industryyield1.setIndusland(indusland1)
  //         .then(msg => {
  //             res.send(msg);
  //         })
  //     }).catch(function (e) {
  //         console.log(e);
  //     });
  // },
  update: function (req, res) {
    co(function* () {
      var industryyield1 = yield industryyield.findById(
        req.query.industryyield_id
      );
      var indusland1 = yield indusland.findById(req.query.indusland_id);
      yield industryyield1.setIndusland(indusland1).then((msg) => {
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
      yield industryyield1.setIndusland(null).then((msg) => {
        res.send(msg);
      });
    }).catch(function (e) {
      console.log(e);
    });
  },
  find_indusland: function (req, res) {
    indusland
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
          model: indusland,
        },
      })
      .then((msg) => {
        res.send(msg);
      });
  },
};
