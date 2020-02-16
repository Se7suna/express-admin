const bcrypt = require('bcryptjs')
const user = require('../../model/user')
module.exports = async (req, res) => {
  const data = req.body
  if (data.email.trim() === '' || data.password.trim() === '') res.render('admin/error', { msg: '账号或密码错误' })
  const userData = await user.findOne({ email: data.email })
  if (!userData) {
    res.render('admin/error', { msg: '账号错误' })
  } else {
    const checkPass = bcrypt.compareSync(data.password, userData.password)
    if (!checkPass) {
      res.render('admin/error', { msg: '密码错误' })
    } else {
      req.session.username = userData.username
      res.redirect('/admin/user')
    }
  }
}