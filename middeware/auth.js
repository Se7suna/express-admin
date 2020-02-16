module.exports = (req, res, next) => {
  const LOGINURL = '/admin/login'
  // 根据 session 判断用户是否登陆
  if (!req.session.username && req.url !== LOGINURL) {
    res.redirect(LOGINURL)
    return
  }
  next()
}