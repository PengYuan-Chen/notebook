const express = require('express');    //導入express
const router = express.Router();    //創建路由對象
const shortid=require('shortid')    //npm shortid:生成隨機id
const moment=require('moment')    //npm moment:把字串轉日期對象
// console.log(moment('2023-12-20').toDate())
const accountModel=require('../../data/accountModel')    //導入db配置


//中間件處理有無session，沒有就不能跳轉
const checkLogin=(req,res,next)=>{
  if(!req.session.username){   
    res.render('login')
  }
  next()
}
//首頁
router.get('/',(req,res)=>{
  res.redirect('/account')
})
//列表(路由中間件)
router.get('/account',checkLogin,function(req, res, next) {
  accountModel.find().sort({time:-1}).then(data=>{
     res.render('list',{data,moment});
  })
}); 
//添加
router.get('/account/create',checkLogin,function(req, res, next) {
  res.render('create'); 
});
//提交後
router.post('/account',checkLogin,function(req, res, next) {
  accountModel.create({
      ...req.body,    //es6 把對象結構都拆開
      time:moment(req.body.time).toDate()   //time要轉換覆蓋掉原本的
  }).then(d=>{
    console.log(d)
  }).catch(err=>{
      res.end('錯誤')
  })
  res.render('sucess',{top:'新增成功',msg:'查看清單',url:'/account'}) 
});
//刪除 用url params傳id
router.get('/account/:id',checkLogin,function(req, res, next) {
  //獲取params的id參數
  let id=req.params.id;
  //刪除db
  accountModel.deleteOne({_id:id}).then().catch()
  res.render('sucess',{top:'刪除成功',msg:'查看清單',url:'/account'})
});

//修改
router.get('/account/change/:id',checkLogin,function(req, res, next) {
    let id=req.params.id;
    accountModel.find({_id:id}).then(data=>{ 
      res.render('change',{data,moment});
   }).catch(err=>{
      console.log('錯誤')
   })
});
//修改後
router.post('/change/:id',checkLogin, function(req, res, next) {
  accountModel.create({
      ...req.body,    //es6 把對象結構都拆開
      time:moment(req.body.time).toDate()   //time要轉換覆蓋掉原本的
  }).then(d=>{
    let id=req.params.id;               //新增完新的舊的要刪除，不然會有兩筆資料
    accountModel.deleteOne({_id:id}).then().catch()
    res.render('sucess',{top:'修改成功',msg:'查看清單',url:'/account'}) 
  }).catch(err=>{
      res.end('錯誤')
  })
});
module.exports = router;
