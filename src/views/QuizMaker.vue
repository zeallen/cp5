<template>
  <div>
    <h1>Question editor</h1>
    <p>
      <router-link to="/MyPage" class="pure-button">Back</router-link>
    </p>
    <h3>Add a question</h3>

    <form class="pure-form" v-on:submit.prevent="addQuestion">
      <fieldset class="pure-group">
        <textarea class="pure-input-1" v-model="questionString" placeholder="Question"></textarea>
      </fieldset>
      <input v-model="optionA" placeholder="Option A">
      <input v-model="optionB" placeholder="Option B">
      <input v-model="optionC" placeholder="Option C">
      <div class="top_margin">
        <p>Correct Answer:</p>
      </div>
      <p>
        <button
          class="pure-button pure-input-1-4 pure-button-primary"
          v-on:click="changeCorrectAnswer(1)"
        >Option A</button>
        &nbsp;
        <button
          class="pure-button pure-input-1-4 pure-button-primary"
          v-on:click="changeCorrectAnswer(2)"
        >Option B</button>
        &nbsp;
        <button
          class="pure-button pure-input-1-4 pure-button-primary"
          v-on:click="changeCorrectAnswer(3)"
        >Option C</button>
      </p>
    </form>

    <p></p>
    <h3>Questions</h3>
    <div v-for="question in questions" v-bind:key="question._id">
      <form class="pure-form" v-on:submit.prevent>
        <p>
          {{question.questionString}}
          <button
            class="rightAlign"
            v-on:click="removeQuestion(question)"
          >X</button>
        </p>
        <ul>
          <li>
            {{question.optionA}}
            <span v-if="question.correctChoice === 1">&#10003;</span>
          </li>
          <li>
            {{question.optionB}}
            <span v-if="question.correctChoice === 2">&#10003;</span>
          </li>
          <li>
            {{question.optionC}}
            <span v-if="question.correctChoice === 3">&#10003;</span>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "quizmaker",
  data() {
    return {
        onAnswer: false,
      questionString: "",
      optionA: "",
      optionB: "",
      optionC: "",
      correctChoice: 1
    };
  },
  computed: {
    quiz() {
      return this.$store.state.quiz;
    },
    user() {
      return this.$store.state.user;
    },
    questions() {
      return this.$store.state.questions;
    }
  },
  async created() {
    await this.$store.dispatch("getOneQuiz", {
      id: this.$route.params.id
    });
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getQuestions", {
      quiz: this.$store.state.quiz
    });
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },

    async addQuestion() {
      if (this.questionString === "") return;
      try {
        await this.$store.dispatch("postQuestion", {
          quiz: this.$store.state.quiz,
          questionString: this.questionString,
          optionA: this.optionA,
          optionB: this.optionB,
          optionC: this.optionC,
          correctChoice: this.correctChoice
        });
        //return strings to blank
        this.questionString = "";
        this.optionA = "";
        this.optionB = "";
        this.optionC = "",
        this.correctChoice = 1;
      } catch (error) {
        console.log(error);
      }
    },

    changeCorrectAnswer(num) {
      this.correctChoice = num;
    },

    async removeQuestion(question) {
      try {
        let response = await this.$store.dispatch("deleteQuestion", {
          id: question.id
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
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

.rightAlign {
  float: right;
}

.top_margin {
    margin-top: 1em;
}

form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}
</style>