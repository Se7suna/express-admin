// user模型
const mongoose = require('mongoose')

// 创建用户规则
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  status: Number
})
// 生成用户模型
module.exports = mongoose.model('User', userSchema)