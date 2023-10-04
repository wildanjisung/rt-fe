import Vue from 'vue'
import Vuex from 'vuex'
import createPersitedState from "vuex-persistedstate"

import user from './user'
import bill from './bill'
import residence from './residence'

Vue.use(Vuex)

const persitedDataState = createPersitedState({
  paths: ["user"],
});

export default new Vuex.Store({
  plugins: [persitedDataState],
  modules: {
    user: {
      namespaced: true,
      ...user
    },
    bill: {
      namespaced: true,
      ...bill
    },
    residence: {
      namespaced: true,
      ...residence
    }
  }
})
