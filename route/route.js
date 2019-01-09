const express = require('express')
const router = express.Router()

//1对多
const commerresearch_transaction=require('../associate/o2m/commerresearch_transaction')
const commerresearch_industryyield=require('../associate/o2m/commerresearch_industryyield')
const company_commerland=require('../associate/o2m/company_commerland')
const company_indusland=require('../associate/o2m/company_indusland')
const company_loan=require('../associate/o2m/company_loan')
const company_mining=require('../associate/o2m/company_mining')
const company_sway=require('../associate/o2m/company_sway')
const source_mining=require('../associate/o2m/source_mining')
const source_transaction=require('../associate/o2m/source_transaction')
const commerresearch_commerland=require('../associate/o2m/commerresearch_commerland')
const industryyield_commerresearch=require('../associate/o2m/industryyield_commerresearch')


//1对1
const company_transaction=require('../associate/o2m/company_transaction')
const indusland_industryyield=require('../associate/o2o/indusland_industryyield')
const mining_miniyield=require('../associate/o2o/mining_miniyield')
const miniyield_source=require('../associate/o2o/miniyield_source')
const company_statistic=require('../associate/o2o/company_statistic')

//多对多
const mining_digger=require('../associate/m2m/mining_digger')
const indusland_factory_line=require('../associate/m2m/indusland_factory_line')
const commerland_research=require('../associate/m2m/commerland_research')
const company_compete=require('../associate/m2m/company_compete')
const indusland_factory=require('../associate/m2m/indusland_factory')

 
router.use('/name', function (req, res) {
 res.send('hello, ' + req.params.name)
})
 
module.exports = router

//1对多
router.use('/commerresearch_transaction',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) commerresearch_transaction.create(req,res);
    if(req.query.judge==0) commerresearch_transaction.add(req,res);
    if(req.query.judge==1) commerresearch_transaction.update(req,res);
    if(req.query.judge==2) commerresearch_transaction.del(req,res);
    if(req.query.judge==3) commerresearch_transaction.find_commerresearch(req,res);
    if(req.query.judge==4) commerresearch_transaction.find_transaction(req,res);
})
router.use('/commerresearch_industryyield',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) commerresearch_industryyield.create(req,res);
    if(req.query.judge==0) commerresearch_industryyield.add(req,res);
    if(req.query.judge==1) commerresearch_industryyield.update(req,res);
    if(req.query.judge==2) commerresearch_industryyield.del(req,res);
    if(req.query.judge==3) commerresearch_industryyield.find_commerresearch(req,res);
    if(req.query.judge==4) commerresearch_industryyield.find_industryyield(req,res);
})
router.use('/company_commerland',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_commerland.create(req,res);
    if(req.query.judge==0) company_commerland.add(req,res);
    if(req.query.judge==1) company_commerland.update(req,res);
    if(req.query.judge==2) company_commerland.del(req,res);
    if(req.query.judge==3) company_commerland.find_company(req,res);
    if(req.query.judge==4) company_commerland.find_commerland(req,res);
})
router.use('/company_indusland',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_indusland.create(req,res);
    if(req.query.judge==0) company_indusland.add(req,res);
    if(req.query.judge==1) company_indusland.update(req,res);
    if(req.query.judge==2) company_indusland.del(req,res);
    if(req.query.judge==3) company_indusland.find_company(req,res);
    if(req.query.judge==4) company_indusland.find_indusland(req,res);
})
router.use('/company_loan',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_loan.create(req,res);
    if(req.query.judge==0) company_loan.add(req,res);
    if(req.query.judge==1) company_loan.update(req,res);
    if(req.query.judge==2) company_loan.del(req,res);
    if(req.query.judge==3) company_loan.find_company(req,res);
    if(req.query.judge==4) company_loan.find_loan(req,res);
})
router.use('/industryyield_commerresearch',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
 //   if(req.query.judge==-1) industryyield_commerresearch.create(req,res);
    if(req.query.judge==0) industryyield_commerresearch.add(req,res);
    if(req.query.judge==1) industryyield_commerresearch.update(req,res);
    if(req.query.judge==2) industryyield_commerresearch.del(req,res);
    if(req.query.judge==3) industryyield_commerresearch.findByCompany(req,res);
    if(req.query.judge==4) industryyield_commerresearch.findAll(req,res)
})
router.use('/company_mining',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_mining.create(req,res);
    if(req.query.judge==0) company_mining.add(req,res);
    if(req.query.judge==1) company_mining.update(req,res);
    if(req.query.judge==2) company_mining.del(req,res);
    if(req.query.judge==3) company_mining.find_company(req,res);
    if(req.query.judge==4) company_mining.find_mining(req,res);
})
router.use('/company_sway',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_sway.create(req,res);
//    if(req.query.judge==0) company_sway.add(req,res);
    if(req.query.judge==0) company_sway.update(req,res);
    if(req.query.judge==1) company_sway.del(req,res);
    if(req.query.judge==2) company_sway.find_company(req,res);
    if(req.query.judge==3) company_sway.find_sway(req,res);
})
router.use('/source_mining',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) source_mining.create(req,res);
    if(req.query.judge==0) source_mining.add(req,res);
    if(req.query.judge==1) source_mining.update(req,res);
    if(req.query.judge==2) source_mining.del(req,res);
    if(req.query.judge==3) source_mining.find_source(req,res);
    if(req.query.judge==4) source_mining.find_mining(req,res);
})

router.use('/source_transaction',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) source_transaction.create(req,res);
    if(req.query.judge==0) source_transaction.add(req,res);
    if(req.query.judge==1) source_transaction.update(req,res);
    if(req.query.judge==2) source_transaction.del(req,res);
    if(req.query.judge==3) source_transaction.find_source(req,res);
    if(req.query.judge==4) source_transaction.find_transaction(req,res);
})


router.use('/commerresearch_commerland',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) commerresearch_commerland.create(req,res);
    if(req.query.judge==0) commerresearch_commerland.add(req,res);
    if(req.query.judge==1) commerresearch_commerland.update(req,res);
    if(req.query.judge==2) commerresearch_commerland.del(req,res);
    if(req.query.judge==3) commerresearch_commerland.find_commerland(req,res);
    if(req.query.judge==4) commerresearch_commerland.find_commerresearch(req,res);
    if(req.query.judge==5) commerresearch_commerland.findAll(req,res);
    
})

router.use('/commerland_research',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) commerland_research.create(req,res);
//    if(req.query.judge==0) commerland_research.add(req,res);
    if(req.query.judge==1) commerland_research.update(req,res);
    if(req.query.judge==2) commerland_research.del(req,res);
    if(req.query.judge==3) commerland_research.find_research(req,res);
    if(req.query.judge==4) commerland_research.find_commerland(req,res);
    if(req.query.judge==5) commerland_research.selectNumber(req,res);
    if(req.query.judge==6) commerland_research.updateResearch(req,res);
    if(req.query.judge==6) commerland_research.updateResearch(req,res);
    if(req.query.judge==6) commerland_research.find_commerland_1(req,res);
})


//1对1
router.use('/company_transaction',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_transaction.create(req,res);
    if(req.query.judge==0) company_transaction.add(req,res);
    if(req.query.judge==1) company_transaction.update(req,res);
    if(req.query.judge==2) company_transaction.del(req,res);
    if(req.query.judge==3) company_transaction.find_company(req,res);
    if(req.query.judge==4) company_transaction.find_transaction(req,res);
})
router.use('/indusland_industryyield',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) indusland_industryyield.create(req,res);
    if(req.query.judge==0) indusland_industryyield.add(req,res);
    if(req.query.judge==1) indusland_industryyield.update(req,res);
    if(req.query.judge==2) indusland_industryyield.del(req,res);
    if(req.query.judge==3) indusland_industryyield.find_indusland(req,res);
    if(req.query.judge==4) indusland_industryyield.find_industryyield(req,res);
})
router.use('/mining_miniyield',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) mining_miniyield.create(req,res);
    if(req.query.judge==0) mining_miniyield.add(req,res);
    if(req.query.judge==1) mining_miniyield.update(req,res);
    if(req.query.judge==2) mining_miniyield.del(req,res);
    if(req.query.judge==3) mining_miniyield.find_mining(req,res);
    if(req.query.judge==4) mining_miniyield.find_miniyield(req,res);
})
router.use('/miniyield_source',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) miniyield_source.create(req,res);
    if(req.query.judge==0) miniyield_source.add(req,res);
    if(req.query.judge==1) miniyield_source.update(req,res);
    if(req.query.judge==2) miniyield_source.del(req,res);
    if(req.query.judge==3) miniyield_source.find_source(req,res);
    if(req.query.judge==4) miniyield_source.find_miniyield(req,res);
    if(req.query.judge==5) miniyield_source.findByCompany(req,res);
})
router.use('/company_statistic',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_statistic.create(req,res);
    if(req.query.judge==0) company_statistic.add(req,res);
    if(req.query.judge==1) company_statistic.update(req,res);
    if(req.query.judge==2) company_statistic.del(req,res);
    if(req.query.judge==3) company_statistic.find_company(req,res);
    if(req.query.judge==4) company_statistic.find_statistic(req,res);
    if(req.query.judge==5) company_statistic.findByCompany(req,res);
})


//多对多
router.use('/mining_digger',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) mining_digger.create(req,res);
    if(req.query.judge==0) mining_digger.add(req,res);
    if(req.query.judge==1) mining_digger.update(req,res);
    if(req.query.judge==2) mining_digger.update_md(req,res);
    if(req.query.judge==3) mining_digger.del(req,res);
    if(req.query.judge==4) mining_digger.find_more_1(req,res);
    if(req.query.judge==5) mining_digger.find_more_2(req,res); 
    if(req.query.judge==6) mining_digger.update_number(req,res);
    if(req.query.judge==7) mining_digger.selectNumber(req,res);
    if(req.query.judge==8) mining_digger.selectOneNumber(req,res);
    if(req.query.judge==9) mining_digger.find_All(req,res);
    if(req.query.judge==10) mining_digger.findOrCreate(req,res);
})

router.use('/indusland_factory_line',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) indusland_factory_line.create(req,res);
    if(req.query.judge==0) indusland_factory_line.add(req,res);
    if(req.query.judge==1) indusland_factory_line.update(req,res);
    if(req.query.judge==2) indusland_factory_line.update_ifl(req,res);
    if(req.query.judge==3) indusland_factory_line.del(req,res); 
    if(req.query.judge==4) indusland_factory_line.find_more_1(req,res);
    if(req.query.judge==5) indusland_factory_line.find_more_2(req,res);
    if(req.query.judge==6) indusland_factory_line.updateNumber(req,res);
    if(req.query.judge==7) indusland_factory_line.selectNumber(req,res);
    if(req.query.judge==8) indusland_factory_line.find_more_3(req,res);

})

router.use('/company_compete',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) company_compete.create(req,res);
    if(req.query.judge==0) company_compete.add(req,res);
    if(req.query.judge==1) company_compete.update(req,res);
    if(req.query.judge==2) company_compete.del(req,res);
    if(req.query.judge==3) company_compete.find_more_1(req,res);
    if(req.query.judge==4) company_compete.find_more_2(req,res);
    if(req.query.judge==5) company_compete.findOneByPrice(req,res)
})
router.use('/indusland_factory',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==-1) indusland_factory.create(req,res);
    if(req.query.judge==0) indusland_factory.add(req,res);
    if(req.query.judge==1) indusland_factory.update(req,res);
    if(req.query.judge==2) indusland_factory.del(req,res);
    if(req.query.judge==3) indusland_factory.find_more_1(req,res);
    if(req.query.judge==4) indusland_factory.find_more_2(req,res);
    if(req.query.judge==5) indusland_factory.update_number(req,res);
    if(req.query.judge==6) indusland_factory.selectNumber(req,res);
    if(req.query.judge==7) indusland_factory.selectId(req,res);
    if(req.query.judge==8) indusland_factory.find_more_3(req,res);
    if(req.query.judge==9) indusland_factory.findAll(req,res)
})
