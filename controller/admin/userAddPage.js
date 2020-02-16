const user = require('../../model/user')
module.exports = async (req, res) => {
  const { msg, id } = req.query
  let userData = null
  if (id) {
    userData = await user.findOne({ _id: id })
  }
  res.render('admin/user-edit', { msg, userData })
}