import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    quizzes: [],
    quiz: null,
    questions: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setQuizzes(state, quizzes) {
      state.quizzes = quizzes;
    },
    setCurrentQuiz(state, quiz) {
      state.quiz = quiz;
    },
    setQuestions(state, questions) {
      state.questions = questions;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },

    async postQuiz(context, data) {
      try {
        await axios.post("/api/quizzes", data);
        this.dispatch('getMyQuizzes');
        return "";
      } catch (error) {
        return "";
      }
    },
    async getMyQuizzes(context) {
      try {
        let response = await axios.get("/api/quizzes");
        context.commit('setQuizzes', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getAllQuizzes(context) {
      try {
        let response = await axios.get("/api/quizzes/all");
        context.commit("setQuizzes", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getOneQuiz(context, data) {
      try {
        let response = await axios.get("/api/quizzes/" + data.id);
        context.commit("setCurrentQuiz", response.data);
        return "";
      }
      catch (error) {
        return "";
      }
    },
    async deleteQuiz(context, data) {
      try {
        let response = await axios.delete("/api/quizzes/" + data.id);
        this.dispatch('getMyQuizzes');
        return "";
      }
      catch (error) {
        return "";
      }
    },
    async getQuestions(context, data) {
      try {
        let response = await axios.get("/api/questions/" + data.quiz.id);
        context.commit('setQuestions', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async postQuestion(context, data) {
      try {
        await axios.post("/api/questions", data);
        this.dispatch('getQuestions', {
          quiz: this.state.quiz
        })
        return ""
      } catch (error) {
        return "";
      }
    },
    async deleteQuestion(context, data) {
      try {
        let response = await axios.delete("/api/questions/" + data.id);
        this.dispatch('getQuestions', {
          quiz: this.state.quiz
        });
        return "";
      }
      catch (error) {
        return "";
      }
    },
  }
})
