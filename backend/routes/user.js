const express =require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const  { checkAuth, checkAuthAdmin } =require("../middleware/check-user");







router.post("/signup", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
      name: req.body.name,
      tel:  req.body.tel,
      password : hash
      });

    user.save()
    .then(result => {
      res.status(201).json({
        message:"user created!",
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

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ tel: req.body.tel })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Incorrect phone number !"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect password !"
        });
      }
      const token = jwt.sign(
        { tel: fetchedUser.tel, userId: fetchedUser._id },"secret_this_should_be_longer",{ expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
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
router.get('/data',checkAuthAdmin, (req,res,next)=> {

  User.find().select(['-password','-__v'])
  .then(documents => {
    res.status(200).json({
      message : 'Users Fetched!',
      users :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message : 'Can"t fetch Users!',
      error: err
    });
  });
});
router.delete("/:id",checkAuthAdmin, (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "User deleted !" })
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      message: "Problem In deleting Users !"
    });
  });
});



module.exports = router;

