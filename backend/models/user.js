const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require('mongoose-enumvalues');

const userSchema = mongoose.Schema({
  name:{ type: String, required: true },
  tel: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [{
        type: String,
        enum: ['user', 'admin']
    }],
    default: 'user'
},
},{ timestamps: true }
);


const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);



userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
