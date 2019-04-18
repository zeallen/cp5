<template>
  <div>
    <div v-if="onResults">
      <h2>
        {{failString}} <p>&nbsp;</p>
        <router-link to="/" class="pure-button">Back</router-link>
      </h2>

    </div>
    <div v-else>
      <div v-if="onAnswer">
        <h3>{{failString}}</h3>
        <button v-on:click="getNextQuestion">Next Question</button>
        <p>&nbsp;</p>
      </div>
      <h3>{{questionString}}</h3>
      <button v-on:click="checkAnswer(1)">{{optionA}}</button>&nbsp;
      <button v-on:click="checkAnswer(2)">{{optionB}}</button>&nbsp;
      <button v-on:click="checkAnswer(3)">{{optionC}}</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "runquiz",
  data() {
    return {
      questionString: "",
      optionA: "",
      optionB: "",
      optionC: "",
      correctChoice: 1,
      failString: "",
      onAnswer: false,
      currentQuestion: 1,
      onResults: false,
      gotCorrect: 0
    };
  },
  computed: {
    quiz() {
      return this.$store.state.quiz;
    },
    questions() {
      return this.$store.state.questions;
    }
  },
  async created() {
    await this.$store.dispatch("getOneQuiz", {
      id: this.$route.params.id
    });
    await this.$store.dispatch("getQuestions", {
      quiz: this.$store.state.quiz
    });
    this.beginGame();
  },
  methods: {
    beginGame() {
      if (this.questions.length == 0) {
        this.failString =
          "You need to make some questions before running a trivia session.";
      } else {
        this.frontPage = false;
        this.currentQuestion = 0;
        this.getNextQuestion();
        this.gotCorrect = 0;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    getNextQuestion() {
      if (this.questions[this.currentQuestion] == undefined) {
        this.finishQuiz();
        return;
      }
      this.questionString = this.questions[this.currentQuestion].questionString;
      this.optionA = this.questions[this.currentQuestion].optionA;
      this.optionB = this.questions[this.currentQuestion].optionB;
      this.optionC = this.questions[this.currentQuestion].optionC;
      this.correctChoice = this.questions[this.currentQuestion].correctChoice;
      this.currentQuestion++;
      this.onAnswer = false;
    },
    checkAnswer(val) {
      if (this.onAnswer === true) return;

      if (val === this.correctChoice) {
        this.failString = "You are correct!";
        this.onAnswer = true;
        this.gotCorrect++;
      } else {
        this.failString =
          "Sorry, the correct answer is " + this.getCorrectChoice();
        this.onAnswer = true;
      }
    },
    getCorrectChoice() {
      if (this.correctChoice === 1) return "A";
      else if (this.correctChoice === 2) return "B";
      else return "C";
    },
    finishQuiz() {
      this.failString =
        "You got " +
        this.gotCorrect +
        " out of " +
        this.currentQuestion +
        " questions correct!";
      if (this.gotCorrect === this.currentQuestion)
        this.failString += " Great job, you got them all right!";
      if (this.gotCorrect === 0)
        this.failString += " Wow, you didn't get any right. That's just sad!";
      this.questionString = "";
      this.optionA = "";
      this.optionB = "";
      this.optionC = "";
      this.onResults = true;
      this.onAnswer = false;
    }
  }
};
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: auto;
  width: 100%;
  text-align: center;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}

form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}
</style>