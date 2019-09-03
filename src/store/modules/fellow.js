import firebase from "firebase";

const state = {
	fellow: {},
	fellows: [],
	loading: false
}

const getters = {
  getFellow(state) {
    return state.fellow
  },
  getFellows(state) {
    return state.fellows
  },
}

const actions = {
  loadFellows({ commit, rootGetters, getters }) {
    firebase.database().ref("fellow").on("value", (snapshot) => {
		commit('setFellows', snapshot.val())
	})
  },
}

const mutations = {
	setFellows(state, fellows) {
	    state.fellows = fellows
	  },
}

export default {
  state,
  getters,
  actions,
  mutations
}