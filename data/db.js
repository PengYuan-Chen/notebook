
module.exports=function(success,error){
    const mongoose=require('mongoose')
    if(typeof error !='function'){
        error=()=>{
            console.log('連接失敗')
        }
    }
    const {DBHOST,DBPORT,DBNAME}=require('./config')
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    mongoose.connection.once('open',()=>{
        success()
        console.log('成功')
    })
    mongoose.connection.once('error',()=>{
        error()
        console.log('失敗')
    })
    mongoose.connection.once('close',()=>{
        console.log('關閉')
    })
}


