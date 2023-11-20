var express = require('express');
var router = express.Router();

//npm lowdb:提供json格式的資料庫可以儲存簡單資料
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname+'/../data/db.json')    //取哪裡存資料
const db = low(adapter)

const shortid=require('shortid')    //npm shortid:生成隨機id


//列表
router.get('/account', function(req, res, next) {
  let accounts=db.get('accounts').value()
  res.render('list',{accounts});
});
//添加
router.get('/account/create', function(req, res, next) {
  res.render('create'); 
});
//提交後
router.post('/account', function(req, res, next) {
  let id=shortid.generate()    //生成隨機id
  db.get('accounts')    //取得資料庫
  .unshift({id:id,...req.body})    //外面已預設設置好中間件所以可以直接這樣寫取得請求體參數
  .write()  
  res.render('sucess',{msg:'查看清單',url:'/account'}) 
});
//刪除 用url params傳id
router.get('/account/:id', function(req, res, next) {
  //獲取params的id參數
  let id=req.params.id;
  //刪除db
  db.get('accounts').remove({id:id}).write();
  res.end('delete finish')
});

//列表
router.get('/account/change/:id', function(req, res, next) {
    let id=req.params.id;
    let result=db.get('accounts').find({id:id}).value()
    db.get('accounts').remove({id:id}).write();
    res.render('change',{result}); 
});

module.exports = router;
