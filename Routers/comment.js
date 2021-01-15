var express = require("express");
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var router = express.Router();
var Middleware = require("../Middleware");


router.post("/blogs/:id/comments", function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err)
            console.log("Blog not found. Comment unsuccessful")
        else
            Comment.create(req.body.comments, function (err, comment) {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                blog.comments.push(comment);
                blog.save();
                res.redirect("/blogs/" + req.params.id);
            })
    })
})

router.get("/blogs/:id/:comment_id/edit", Middleware.isLoggedIn, Middleware.CheckCommentOwnership, function (req, res) {

    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err)
            console.log("Error")
        else
            res.render("./comments/edit", { comment: foundComment, blog_id: req.params.id });
    })
})

router.put("/blogs/:id/:comment_id", function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function (err, updatedComment) {
        if (err)
            console.log("Error")
        else
            res.redirect("/blogs/" + req.params.id);
    })
})

router.delete("/blogs/:id/:comment_id/delete", Middleware.isLoggedIn, Middleware.CheckCommentOwnership, function (req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function (err, comment) {
        if (err)
            console.log("Comment not deleted");
        else
            res.redirect("/blogs/" + req.params.id);
    })
})

module.exports = router;