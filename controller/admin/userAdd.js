const Joi = require('@hapi/joi')
const user = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports = async (req, res, next) => {
  const data = req.body
  const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(8).required().error(new Error('用户名验证不通过')),
    password: Joi.string().min(3).max(8).required().error(new Error('密码验证不通过')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'cn'] } }),
    role: Joi.string().valid('admin', 'normal'),
    status: Joi.number().valid(0, 1)
  })
  try {
    await schema.validateAsync(data);
  }
  catch (err) {
    const data = {
      url: '/admin/user-add',
      msg: err.message
    }
    next(JSON.stringify(data))
    return
  }
  const userData = await user.findOne({ email: data.email })
  if (userData) {
    const data = {
      url: '/admin/user-add',
      msg: 'email已存在'
    }
    next(JSON.stringify(data))
    return
  }
  const salt = bcrypt.genSaltSync(10)
  data.password = bcrypt.hashSync(data.password, salt)
  await user.create(data)
  res.redirect('/admin/user')
}