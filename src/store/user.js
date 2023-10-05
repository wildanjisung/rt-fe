import axios from 'axios';

const state = () => ({
  token: '',
  isLogin: false,
  user: [],
})

const getters = {
  isAuthenticated: state => state.isLogin,    
};

const mutations = {
  setToken(state, param) {
    state.token = param
  },
  setIsLogin(state, param) {
    state.isLogin = param
  },
  setUser(state, param) {
    state.user = param
  },
}

const actions = {
  login(store, user) {
    axios.post('http://localhost:3000/auth/signin', {
      username: user.username,
      password: user.password
    })
    .then((response) => {
      const token = response.data.accessToken;
      store.commit("setToken", token)
      store.commit("setIsLogin", true)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  },
  register(store, user) {
    axios.post('http://localhost:3000/auth/signup', {
      username: user.username,
      password: user.password
    })
    .then((response) => {
      const token = response.data.accessToken;
      store.commit("setToken", token)
      store.commit("setIsLogin", true)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  },
  getUser({ rootState, commit }) {
    axios.get('http://localhost:3000/auth/user', {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then((response) => {
      commit("setUser", response.data)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}