const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const resultatRoutes = require("./routes/resultat");




const app = express();



//conection to data
mongoose.connect(
    "mongodb+srv://laakri:s8R9DM2NMRst2sdh@cluster0.2cxzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended :false}));
  app.use("/file-folder", express.static(path.join("backend/file-folder")));


  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET , POST,PATCH,DELETE, OPTIONS"
    );

    next();

  });
app.use("/api/resultats",resultatRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
