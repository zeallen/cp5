<template>
  <div>
    <div v-if="user">
      <div class="header">
        <div>
          <h1>{{user.name}}</h1>
        </div>
        <div>
          <p>
            <a href="#" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </p>
        </div>
      </div>
      <router-link to="/newquiz" class="pure-button pure-input-1-4 pure-button-primary">New Quiz</router-link>
      <h1><u> My Quizzes </u></h1>
      <quiz-list :quizzes="quizzes"/>
    </div>
    <div v-else>
      <p>If you would like to make quizzes, please register for an account or login.</p>
      <router-link to="/register" class="pure-button pure-input-1-4 pure-button-primary">Register</router-link> or
      <router-link to="/login" class="pure-button pure-input-1-4 pure-button-primary">Login</router-link>
    </div>
  </div>
</template>

<script>
import EscapeEvent from "@/components/EscapeEvent.vue";
import QuizList from "@/components/QuizList.vue";

export default {
  name: "mypage",
  components: {
    QuizList
  },
  data() {
    return {
      show: false
    };
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
    quizzes() {
      return this.$store.state.quizzes;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getMyQuizzes");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    escape() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>