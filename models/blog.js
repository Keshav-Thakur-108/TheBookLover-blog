const mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    title: String,
    text: String,
    created: { type: Date, default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Blog", blogSchema);