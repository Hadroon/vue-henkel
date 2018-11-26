// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({


    auth: Boolean,
    roles: Array,
    email: String,
    password: String,
    passwordTwo: String,
    firstName: String,
    lastName: String,
    zipCode: Number,
    city: String,
    street: String,
    houseNumber: String,
    phoneNumber: String,
    eula: Boolean,
    correctAge: Boolean,
    isEmailVerified: Boolean,
    registered: Date,
    emailVerificationToken: String
      

    // local            : {
    //     email        : String,
    //     password     : String,
    //     emailVerificationToken: String,
    //     resetPasswordToken: String,
    //     isEmailVerified: Boolean,
    //     registered: { type : Date },
    //     eula: Boolean,
    //     gdpr: Boolean
    // },
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     name         : String,
    //     email        : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);