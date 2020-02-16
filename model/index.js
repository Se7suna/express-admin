// 连接数据库
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  const { name } = db.connections[0]
  console.log(`${name} 连接成功`)
}).catch(err => {
  console.log('数据库连接失败:', err.message)
})