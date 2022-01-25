const express =require("express");
const Resultat = require("../models/resultat");
const router = express.Router();



router.post('/resultat', (req,res,next)=> {
    const resultat = new Resultat({
      num: req.body.num,
      object: req.body.object,
      filePath: req.body.filePath,
      userId:req.body.userId,
    });
    resultat.save()
    .then(result => {
    res.status(201).json({
      message : 'post added succesfully'
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
    });
});


module.exports = router;
