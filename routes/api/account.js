var express = require('express');
var router = express.Router();

const shortid=require('shortid')    //npm shortid:生成隨機id
const moment=require('moment')    //npm moment:把字串轉日期對象
// console.log(moment('2023-12-20').toDate())
const accountModel=require('../../data/accountModel')


//列表
router.get('/account', function(req, res, next) {
  accountModel.find().sort({time:-1})
  .then(data=>{
     //以前:返回處理好畫面
     //res.render('list',{data,moment});
     //新:返回json格式數據，不做處理，畫面交給前端做
     res.json({
        code:'0000',    //響應編號:0000表成功
        msg:'讀取成功~',    //響應信息
        data:data    //響應的數據
     })
  }).catch(err=>{
    res.json({
        code:'1001',
        msg:'讀取失敗~',  
        data:null        
    })
  })
}); 

//提交後
router.post('/account', function(req, res, next) {
  accountModel.create({
      ...req.body,    //es6 把對象結構都拆開
      time:moment(req.body.time).toDate()   //time要轉換覆蓋掉原本的
  }).then(data=>{
    res.json({
        code:'0000',    //響應編號:0000表成功
        msg:'創建成功~',    //響應信息
        data:data    //響應的數據
     })
  }).catch(err=>{
    res.json({
        code:'1002',
        msg:'創建失敗~',  
        data:null        
    })
  }) 
});

//刪除 用url params傳id
router.delete('/account/:id', function(req, res, next) {
  let id=req.params.id;
  accountModel.deleteOne({_id:id})
  .then(    
    res.json({
    code:'0000',    //響應編號:0000表成功
    msg:'刪除成功~',    //響應信息
    data:{}
 }))
  .catch(
    res.json({
        code:'1002',
        msg:'刪除失敗~',  
        data:null        
    })
  ) 
});

//獲取單個帳單信息
router.get('/account/:id',function(req,res){
    let id=req.params.id; 
    accountModel.findOne({_id:id})
    .then(data=>{
        res.json({
            code:'0000',    //響應編號:0000表成功
            msg:'獲得成功~',    //響應信息
            data:data
        })
    })
    .catch(err=>{
        res.json({
          code:'1002',
          msg:'獲得失敗~',  
          data:null        
      })
    })
})

//更新
router.patch('/account/:id',(req,res)=>{
   let id=req.params.id
   accountModel.updateOne({_id:id},req.body)
   .then(
    accountModel.findById(id)
    .then(data=>{
        res.json({
            code:'0000',    //響應編號:0000表成功
            msg:'更新成功~',    //響應信息
            data:data
        })
    })
    )
   .catch(err=>{
    res.json({
        code:'1002',
        msg:'更新失敗~',  
        data:null        
    })
   })
})


















// //修改
// router.get('/account/change/:id', function(req, res, next) {
//     let id=req.params.id;
//     accountModel.find({_id:id}).then(data=>{ 
//       res.render('change',{data,moment});
//    }).catch(err=>{
//       console.log('錯誤')
//    })
// });
// //修改後
// router.post('/change/:id', function(req, res, next) {
//   accountModel.create({
//       ...req.body,    //es6 把對象結構都拆開
//       time:moment(req.body.time).toDate()   //time要轉換覆蓋掉原本的
//   }).then(d=>{
//     let id=req.params.id;               //新增完新的舊的要刪除，不然會有兩筆資料
//     accountModel.deleteOne({_id:id}).then().catch()
//     res.render('sucess',{top:'修改成功',msg:'查看清單',url:'/account'}) 
//   }).catch(err=>{
//       res.end('錯誤')
//   })
// });
module.exports = router;
