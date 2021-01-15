var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/User");
var bcrypt = require("bcrypt-nodejs");

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {

        findOrCreateUser = function () {
            User.findOne({ 'username': username }, function (err, user) {
                if (err) {
                    console.log("Error in signup");
                    return done(err);
                }

                if (user) {

                    return done(null, false, req.flash("error", "Username already exists"));
                }

                else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.gender = req.body.gender;

                    newUser.save(function (err) {
                        if (err) {
                            console.log("Error in saving");
                            throw err;
                        }
                        console.log("User registration successful");
                        return done(null, newUser);
                    })
                }
            })
        }
        process.nextTick(findOrCreateUser);
    }))
}

var createHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}