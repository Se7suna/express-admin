const user = require('../../model/user')
module.exports = async (req, res) => {
  const PAGE_SIZE = 2
  const current = +req.query.current || 1
  const total = Math.ceil(await user.countDocuments({}) / PAGE_SIZE)
  const data = await user.find().limit(PAGE_SIZE).skip((current - 1) * PAGE_SIZE)
  res.render('admin/user', { data, total, current })
}