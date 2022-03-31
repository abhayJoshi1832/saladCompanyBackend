const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type:String,
      required:true,
      trim:true,
      unique: true,
      lowercase:true,
      validate: {
        validator: function(email) {
          return validator.isEmail(email);
        }
      }

    },
    password: {
      type: String,
      required:true,
      trim:true,
      minLength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: {
      type: Number,
      require:true,
      default: 500
    },
    address: {
      type: String,
      default: config.default_address,
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
    collection: 'users'
  }
);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  //console.log('inside isEmail: ',email);
  const sameUser = await this.findOne({email: email});
  //console.log('in modeil user- ', sameUser);

  //console.log(sameUser);
  return Boolean(sameUser);

};


// userschema presave hook to save hashed password

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  next()
});

userSchema.statics.loginInDB = async function(email,password){
  const userPresent = await this.findOne({email: email});
  if(userPresent){
    passMatch = await bcrypt.compare(password,userPresent.password);
    if (passMatch) return userPresent;
    else throw new ApiError(401, "passwords do not match");
  }
  else throw new ApiError(401);
}

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.hasSetNonDefaultAddress = async function () {
  const user = this;
   return user.address !== config.default_address;
};





// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS
/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */

const User = mongoose.model('User',userSchema);


 module.exports = {User: User}
