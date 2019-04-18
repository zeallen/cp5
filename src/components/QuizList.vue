<template>
  <div>
    <div class="image" v-for="quiz in quizzes" v-bind:key="quiz._id">
      <router-link
        :to="{ name: 'quizmaker', params: { id: quiz._id }}"
        class="pure-button pure-input-1-4 pure-button-primary"
      >{{quiz.title}}</router-link> &nbsp;
      <button class="rightAlign" v-on:click="removeQuiz(quiz)">X</button>
      <p class="quizDate">
        <span v-if="quiz.user.name">{{quiz.user.name}},</span>
        {{formatDate(quiz.created)}}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "QuizList",
  props: {
    quizzes: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async removeQuiz(quiz) {
      try {
        let response = await this.$store.dispatch("deleteQuiz", {
          id: quiz.id
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
.quizTitle {
  margin: 0px;
  font-size: 1.2em;
}

.quizDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>