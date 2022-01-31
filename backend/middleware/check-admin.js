const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "this_is_the_best_website_security");
    req.adminDatas = { tel: decodedToken.tel, adminId: decodedToken.adminId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed as admin !" });
  }
};