const user = require('../../model/user')
module.exports = async (req, res) => {
  const { id } = req.body
  await user.findOneAndDelete({ _id: id })
  res.redirect('/admin/user')
}