// 二级路由配置
const admin = require('express').Router()

admin.get('/login', require('../controller/admin/loginPage'))
admin.post('/login', require('../controller/admin/reqLogin'))
admin.get('/user', require('../controller/admin/userPage'))
admin.get('/user-add', require('../controller/admin/userAddPage'))
admin.post('/user-add', require('../controller/admin/userAdd'))
admin.post('/user-edit', require('../controller/admin/userEdit'))
admin.post('/delete', require('../controller/admin/delete'))

module.exports = admin