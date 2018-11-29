// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    email: String,
    password: String,
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
    emailVerificationToken: String,
    roles: Array

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