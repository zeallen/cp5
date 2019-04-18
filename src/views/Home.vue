<template>
  <div class="home">
    <h1>Quizzes</h1>
    <div>
      <div class="image" v-for="quiz in quizzes" v-bind:key="quiz._id">
        <router-link
          :to="{ name: 'runquiz', params: { id: quiz._id }}"
          class="pure-button pure-input-1-4 pure-button-primary"
        >{{quiz.title}}</router-link>&nbsp;
        <p class="quizDate">
          <span v-if="quiz.user.name">{{quiz.user.name}},</span>
          {{formatDate(quiz.created)}}
        </p>
      </div>
    </div>

    <footer id="sticky">
      <a href="https://github.com/zeallen/cp5">Github</a>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizList from "@/components/QuizList.vue";
import Footer from "@/components/Footer.vue";
import moment from "moment";

//random
export default {
  name: "home",
  components: {
    QuizList
  },
  computed: {
    quizzes() {
      return this.$store.state.quizzes;
    }
  },
  async created() {
    await this.$store.dispatch("getAllQuizzes");
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
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

#sticky {
  width: 100%;
  height: 44px;
  padding-top: 10px;
  background: black;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  position: fixed; /*Here's what sticks it*/
  bottom: 0; /*to the bottom of the window*/
  left: 0; /*and to the left of the window.*/
}
</style>
