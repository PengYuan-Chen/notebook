var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
var app = express();
//session相關匯入
const MongoStore = require('connect-mongo')
const session = require('express-session')
const {DBHOST,DBPORT,DBNAME}=require('./data/config')

//設置session中間件
app.use(session({
    name:'sid',    //cookie的name
    secret:'att',    //加密的東西
    saveUninitialized:false,    //每次請求都會給一個sid
    resave:true,    //是否在每次請求時重新保存session
    store:MongoStore.create({
        mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`   //db配置
    }),
    cookie:{
      httpOnly:true,    //開啟後前端無法通過js操作
      maxAge:1000 * 60 * 60 * 24    //sid存在時間
    }
}))

const accountRouter=require('./routes/api/account')
var regRouter = require('./routes/web/reg');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//在前面加/api是進入accountrouter的路由規則
app.use('/api',accountRouter)
app.use('/', regRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
