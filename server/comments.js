const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const photos = require("./photos.js");
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photoID : String,
  commentString: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model("Comment", commentSchema);

//upload comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    if (!req.body.commentString) {
      return res.status(400).send({
        message: "Must upload a comment."
      });
    }
    const comment = new Comment({
      user: req.user,
      photoID: req.body.photo._id,
      commentString: req.body.commentString
    })
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Get comments
router.get("/:id", async (req, res) => {
  try {
    let photo = await Photo.findOne({
      _id: req.params.id
    })
    let comments = await Comment.find({
      photoID: photo.id
    }).sort({
      created: -1
    }).populate('user').populate('photo');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}