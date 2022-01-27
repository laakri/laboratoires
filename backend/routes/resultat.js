const express =require("express");
const Resultat = require("../models/resultat");
const router = express.Router();
const checkAuth =require("../middleware/check-user")
const multer = require("multer")

const MIME_TYPE_MAP = {
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/file-folder");
  },
  filename:(req ,file ,cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
router.post('',multer({ storage: storage }).single("file"),
 (req,res,next)=> {
  const url = req.protocol + "://" + req.get("host");
    const resultat = new Resultat({
      num: req.body.num,
      object: req.body.object,
      filePath: url + "/file-folder/" + req.body.filename,
      userId:req.body.userId,
    });
    resultat.save()
    .then(result => {
    res.status(201).json({
      message : 'Result added succesfully',
      result:{
        ...result,
        id: result._id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Couldn't add result !",
      error: err
    });
    });
});

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
      message : 'Results fetched seccesfully !',
      results :documents
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message : 'Couldn"t fetch result !',
      error: err
    });
  });
});







module.exports = router;
