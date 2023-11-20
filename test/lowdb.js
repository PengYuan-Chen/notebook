const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// 初始化 db.defaults({ posts: [], user: {} }).write()

//添加一條數據
db.get('posts')
  .push({ id: 2, title: 'bbbbbbbbbbbbbb'})
  .write()
//獲取數據
console.log(db.get('posts').value())
//刪除
// db.get('posts')
//   .pop({ id: 2, title: 'bbbbbbbbbbbbbb'})
//   .write()