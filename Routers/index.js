var express = require("express");
var router = express.Router();
var passport = require("passport");
var Middleware = require("../Middleware");

router.get("/", function (req, res) {
    res.redirect("/blogs")
})

router.get("/about", function (req, res) {
    res.render("about")
})

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have logged out");
    res.redirect("/login")
})

router.get("/register", function (req, res) {

    res.render("register");
})

router.post("/register", passport.authenticate('signup', {
    failureRedirect: '/register'

}), function (req, res) {
    req.flash("success", "You have registered successfully");
    res.redirect("/blogs");
});


router.get("/login", function (req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate('login', {

    failureRedirect: '/login',

}), function (req, res) {
    if (req.isAuthenticated()) {
        req.flash("success", "You have logged in successfully");
        res.redirect("/blogs");
    }
})

module.exports = router;