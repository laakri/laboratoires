const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
  name:{ type: String, required: true },
  tel: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{ timestamps: true }
);

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admin", adminSchema);
