//导入模型
const research = require('../../interface/initial/research').research;
const commerland = require('../../interface/initial/commerland').commerland;
//yield
var co = require('co');



//外键在 
research.hasMany(commerland, {
    foreignKey: 'research_id',
    constraints: false
});
commerland.belongsTo(research, {
    foreignKey: 'research_id',
    constraints: false
});



module.exports = {
    creat: function (req, res) {
        //强制自动建表
        research.sync();
        commerland.sync().then(msg => {
            res.send(msg);
        });
    },
    // add: function (req, res) {
    //     co(function* () {
    //         var commerland1 = yield commerland.create({'id':req.query.commerland_id}); 
    //         var research1 = yield research.findById(req.query.research_id)  
    //         yield commerland1.setresearch(research1) 
    //         .then(msg => {
    //             res.send(msg);
    //         })
    //     }).catch(function (e) {
    //         console.log(e);
    //     });
    // },
    update: function (req, res) {
        co(function* () {
            var commerland1 = yield commerland.findById(req.query.commerland_id)  
            var research1 = yield research.findById(req.query.research_id)
            if(research1==null||commerland1==null){
                res.send(`{ "success": false }`);
            } 
            else{
                yield commerland1.setResearch(research1) 
                .then(msg => {
                    res.send(`{ "success": true }`);
                },
                function(err){
                    res.send(`{ "success": "false" }`);
                    console.log(err);  
                })
            }            
        }).catch(function (e) {
            res.send(`{ "success": false }`);
        });
    },
    del: function (req, res) {
        co(function* () {
            var commerland1 = yield commerland.findById(req.query.commerland_id)   
            yield commerland1.setResearch(null) 
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find_research: function (req, res) {
        research.findAll({
            include: {
                model: commerland, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_commerland: function (req, res) {
        commerland.findAll({
            where:{'company_id':req.query.company_id},
            include: {
                model: research, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    find_commerland_1: function (req, res) {
        commerland.findAll({
            include: {
                model: research, 
            }
        }).then(msg => {
            res.send(msg);
        })
    },
    selectNumber:function(req,res){
        commerland.findAndCountAll({
                'attributes':['research_id']
            ,
            'where':{ 
                'id':req.query.commerland_id,
            }
        }).then(msg=>{ 
                res.send(msg);
        },
        function(err){
            console.log(err); 
        });        
    },
    updateResearch:function(req,res){
        commerland.update(
            {
                'research_id':req.query.research_id
            },
            {'where':{
                'id':req.query.commerland_id
            }
        }
        ).then(msg => {
            res.send(`{ "success": true }`);
        })
    },
}