import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import MyPage from './views/MyPage.vue'
import Login from './views/Login.vue'
import Quiz from './views/Quiz.vue'
import NewQuiz from "./views/NewQuiz.vue"
import QuizMaker from "./views/QuizMaker.vue"
import RunQuiz from "./views/RunQuiz.vue"


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/NewQuiz',
      name: 'newquiz',
      component: NewQuiz
    },
    {
      path: '/QuizMaker/:id',
      name: 'quizmaker',
      component: QuizMaker
    },
    {
      path: '/RunQuiz/:id',
      name: 'runquiz',
      component: RunQuiz
    }
  ]
})
