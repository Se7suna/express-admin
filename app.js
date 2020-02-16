const express = require('express')
const session = require('express-session')
const path = require('path')
const admin = require('./route/admin')
// 连接数据库
require('./model')
// 创建服务器实例
const app = express()
// 配置模版引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'html')

// 注意中间件的顺序, 静态 > session > 权鉴 > parser > 路由 > 错误处理 next(str) 触发
app.use(express.static(path.join(__dirname, 'public')))
  .use(session({
    // 建议配置
    secret: 'session key',
    resave: true,
    saveUninitialized: false,
    cookie: {
      // secure: true, 将cookie标记为仅与HTTPS一起使用。
      httpOnly: true,
      maxAge: 30 * 60 * 1000
    }
  }))
  // .use(require('./middeware/auth'))
  .use(require('body-parser').urlencoded({ extended: false }))
  .use('/admin', admin)
  .use((err, req, res, next) => {
    const data = JSON.parse(err)
    const query = []
    for (let key in data) {
      if (key !== 'url') {
        query.push(`${key}=${data[key]}`)
      }
    }
    res.status(400).redirect(`${data.url}?${query.join('&')}`)
  })
// 监听端口, 启动服务
app.listen(3000, () => {
  console.log('服务器启动成功')
})