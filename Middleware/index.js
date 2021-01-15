var Blog = require("../models/blog");
var Comment = require("../models/comment");

var middleware = {

    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();
    },

    isAdmin: function (req, res, next) {
        if (req.user.username == "Admin")
            return next();
    },

    CheckCommentOwnership: function (req, res, next) {

        foundComment = Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err)
                console.log("Comment not found")
            else {
                if (foundComment.author.id.equals(req.user.id)) {
                    return next();
                }
                else
                    console.log("Error");
            }
        });

    }

}

module.exports = middleware;

