const mongoose = require("mongoose");
const User = require("./user");


const resultat = mongoose.Schema({
  num:{ type: String, required: true , unique: true},
  object: { type: String, required: true },
  filePath:{type:String , required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
}
,{ timestamps: true }
);



module.exports = mongoose.model("Resultat", resultat);
