const express =require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const router = express.Router();
const checkAuth =require("../middleware/check-admin")


router.post("/signup", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const admin = new Admin({
      name: req.body.name,
      tel:  req.body.tel,
      password : hash
      });
    admin.save()
    .then(result => {
      res.status(201).json({
        message:"admin created!",
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message:"This phone number already exited !",
      });
    });

  });

});
/*
router.post("/login", (req, res, next) => {
  let fetchedAdmin;
  Admin.findOne({ tel: req.body.tel })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({
          message: "Incorrect phone number !"
        });
      }
      fetchedAdmin = admin;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect password !"
        });
      }
      const token = jwt.sign(
        { tel: fetchedUser.tel, userId: fetchedUser._id },
        "secret_this_should_be_longer_fdskl",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 28800,
        userId: fetchedUser._id,
        userName: fetchedUser.name
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentication failed !"
      });
    });
});
*/

















module.exports = router;
