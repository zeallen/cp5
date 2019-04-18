const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const quizzes = require("./quizzes.js");
const Quiz = quizzes.model;

const questionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    quizID: String,
    questionString: String,
    optionA: String,
    optionB: String,
    optionC: String,
    correctChoice: Number,
})

questionSchema.virtual('id')
    .get(function () {
        return this._id.toHexString();
    });

questionSchema.set('toJSON', {
    virtuals: true
});

const Question = mongoose.model("Question", questionSchema);

//add a question
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    try {
        if (!req.body.questionString || !req.body.correctChoice) {
            return res.status(400).send({
                message: "Must upload a question with an answer."
            });
        }
        const question = new Question({
            user: req.user,
            quizID: req.body.quiz._id,
            questionString: req.body.questionString,
            optionA: req.body.optionA,
            optionB: req.body.optionB,
            optionC: req.body.optionC,
            correctChoice: req.body.correctChoice,
        })
        await question.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//Get all questions from a quizID
router.get("/:id", async (req, res) => {
    try {
        let questions = await Question.find({
            quizID: req.params.id
        }).sort({
            created: -1
        }).populate('user').populate('user');
        return res.send(questions);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//Delete a question
router.delete('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        await Question.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Question,
    routes: router,
}