const express =require("express");
const Resultat = require("../models/resultat");
const router = express.Router();
const checkAuth =require("../middleware/check-user")


router.get('/data/:id',checkAuth, (req,res,next)=> {

  Resultat.find({userId: req.params.id})
  .then(documents => {
    res.status(200).json({
      message : 'post runs seccesfully !',
      results :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
});

router.get('/datas/:code', (req,res,next)=> {

  Resultat.findOne({num: req.params.code})
  .then(documents => {
    res.status(200).json({
      message : 'post runs seccesfully !',
      results :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
});




router.post('/resultat',checkAuth, (req,res,next)=> {
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
