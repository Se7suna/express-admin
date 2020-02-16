const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const user = require('../../model/user')
// 用户编辑处理函数
module.exports = async (req, res, next) => {
  const { id } = req.query
  const { username, email, password, role, status } = req.body
  // 生成 Joi 验证对象
  const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(8).required().error(new Error('用户名验证不通过')),
    password: Joi.string().min(3).max(8).required().error(new Error('密码验证不通过')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'cn'] } }),
    role: Joi.string().valid('admin', 'normal'),
    status: Joi.number().valid(0, 1)
  })
  try {
    // 进行验证
    await schema.validateAsync(req.body)
  } catch (err) {
    // 验证失败
    const data = {
      url: '/admin/user-add',
      msg: err.message,
      id
    }
    next(JSON.stringify(data))
    return
  }
  // 验证成功
  const userData = await user.findById({ _id: id })
  const pwdCheck = bcrypt.compareSync(password, userData.password)
  const emailUser = await user.findOne({ email: email })
  const emailCheck = !emailUser || `${emailUser._id}` === id
  if (pwdCheck && emailCheck) {
    await user.updateOne({ _id: id }, { username, email, role, status })
    res.redirect('/admin/user')
    return
  }
  res.send('err')
}