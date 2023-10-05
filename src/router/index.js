import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResidenceView from '../views/ResidenceView.vue'
import BillView from '../views/BillView.vue'
import DefaultLayout from '../layout/DefaultLayout.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView
      },
      {
        path: '/residence',
        name: 'residence',
        component: ResidenceView,
        meta: { requiresAuth: true },
      },
      {
        path: '/bill',
        name: 'bill',
        component: BillView,
        meta: { requiresAuth: true },
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['user/isAuthenticated']) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router
