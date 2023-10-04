import axios from 'axios';

const state = () => ({
  list: [],
})

const mutations = {
  setList(state, param) {
    state.list = param
  },
}

const actions = {
  fetchList({ commit, rootState }) {
    axios.get('http://localhost:3000/residence', {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then((response) => {
      commit("setList", response.data)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  },
  setResidents({ rootState }, param) {
    const {id, userId} = param
    axios.put(`http://localhost:3000/residence/${id}`, { userId }, {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then(() => {
      // commit("setList", response.data)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  },
  createResidence({ rootState }, param) {
    const { address } = param
    axios.post(`http://localhost:3000/residence`, { address }, {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then(() => {
      // commit("setList", response.data)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  },
  deleteResidence({ rootState }, param) {
    const { id } = param
    axios.delete(`http://localhost:3000/residence/${id}`, {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then(() => {
      // commit("setList", response.data)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  }
}

export default {
  state,
  mutations,
  actions
}