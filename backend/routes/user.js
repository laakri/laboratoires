const express =require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get('/data', (req,res,next)=> {

  User.find().select(['-password','-__v'])
  .then(documents => {
    res.status(200).json({
      message : 'post runs seccesfully !',
      users :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
});



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
        error: err
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
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { tel: fetchedUser.tel, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});
router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "User deleted!" })
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      message: ""
    });
  });
});

module.exports = router;

