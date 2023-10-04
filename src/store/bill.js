import axios from 'axios';

const state = () => ({
  bill: [],
})

const mutations = {
  setBill(state, param) {
    state.bill = param
  },
}

const actions = {
  fetchBill({ commit, rootState }) {
    axios.get('http://localhost:3000/bill', {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then((response) => {
      commit("setBill", response.data)
    })
    .catch((error) => {
      alert(error.message)
      console.log('error:', error)
    });
  },
  payBill({ rootState }, id) {
    axios.put(`http://localhost:3000/bill/${id}`, null, {
      headers: {
        'Authorization': `Bearer ${rootState?.user?.token}`
      }})
    .then(() => {
      // commit("setBill", response.data)
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