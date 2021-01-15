var express = require("express");
var Blog = require("../models/blog");
var router = express.Router();
var Middleware = require("../Middleware");



router.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err)
            console.log("Error");
        else
            res.render("blogs", { blogs: blogs });
    })
})

router.get("/blogs/new", Middleware.isLoggedIn, Middleware.isAdmin, function (req, res) {
    res.render("blogs/new");
})

router.post("/blogs", function (req, res) {
    var title = req.body.title;
    var content = req.sanitize(req.body.body);
    var newBlog = { title: title, text: content }
    Blog.create(newBlog, function (err, blog) {
        if (err)
            console.log("Blog is not created");
        else
            res.redirect("/blogs");

    })
})

router.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
        if (err)
            console.log("No Blog found");
        else
            res.render("blog", { blog: foundBlog });
    });


})

router.get("/blogs/:id/edit", Middleware.isLoggedIn, Middleware.isAdmin, function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err)
            console.log("Error")
        else
            res.render("edit", { blog: blog });
    })
})

router.delete("/blogs/:id/delete", Middleware.isLoggedIn, Middleware.isAdmin, function (req, res) {
    Blog.findByIdAndDelete(req.params.id, function (err, blog) {
        if (err)
            console.log("Not delete")
        else
            res.redirect("/blogs");
    })
})

router.put("/blogs/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err)
            console.log("Blog not updated")
        else
            res.redirect("/blogs");
    })
})

module.exports = router;
