const express=require('express')
var router = express.Router();
const userModel=require('../../data/userModel')
const md5=require('md5')    //給密碼加密用的

//註冊
router.get('/reg',(req,res)=>{
    res.render('reg')
})
//註冊提交
router.post('/reg',(req,res)=>{
    userModel.create({
        username:req.body.username,
        password:md5(req.body.password),    //密碼加密
    })
    .then((data)=>{
        res.render('sucess',{top:'註冊成功',msg:'點擊登入',url:'/login'})
    })
})
//登入
router.get('/login',(req,res)=>{
    res.render('login')
})
//登入提交
router.post('/login',(req,res)=>{
    let {username,password}=req.body
    userModel.findOne({username:username,password:md5(password)})
    .then(data=>{
        //沒找到
        if(!data){
            return res.send('帳密錯誤')
        }
        //自訂session信息
        req.session.username = data.username
        req.session._id = data._id     
        res.render('sucess',{top:'登入成功',msg:'查看清單',url:'/account'})
    })
    .catch(err=>{
        res.send('登入失敗')
    })  
})

//退出登入
router.get('/logout',(req,res)=>{
    res.clearCookie('sid')    //刪除cookies
    req.session.destroy(()=>{    //刪除內容不是刪除sid
        res.render('sucess',{top:'退出成功',msg:'已登出',url:'/login'})
    })
})
module.exports = router;