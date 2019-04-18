const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");


const users = require("./users.js");
const User = users.model;

const questions = require("./questions.js");
const Question = questions.model;


const quizSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    created: {
        type: Date,
        default: Date.now
    }
});

//Make _id into id
quizSchema.virtual('id')
    .get(function () {
        return this._id.toHexString();
    });

quizSchema.set('toJSON', {
    virtuals: true
});

const Quiz = mongoose.model('Quiz', quizSchema);

//Add a quiz
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Must have a name"
            });
        }
        const quiz = new Quiz({
            user: req.user,
            title: req.body.title,
        })
        await quiz.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//Delete a quiz
router.delete('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        await Quiz.deleteOne({
            _id: req.params.id
        });
        await Question.deleteMany({
            quizID: req.params.id
        })
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return photos
    try {
      let quizzes = await Quiz.find({
        user: req.user
      }).sort({
        created: -1
      });
      return res.send(quizzes);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

//Get all quizzes
router.get("/all", async (req, res) => {
    try {
        let quizzes = await Quiz.find().sort({
            created: -1
        }).populate('user');
        return res.send(quizzes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//Get a single quiz
router.get("/:id", async (req, res) => {
    try {
        let quiz = await Quiz.findOne({
            _id: req.params.id
        }).populate('user');
        return res.send(quiz);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Quiz,
    routes: router,
}