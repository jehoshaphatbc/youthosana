import firebase from "firebase";
import _ from 'lodash'

const state = {
	fellow: {},
	fellows: [],
	loading: false,
  success: 0,
  failed: 0
}

const getters = {
  getFellow(state) {
    return state.fellow
  },
  getFellowById: (state, getters) => (id) => {
    return _.find(state.fellows, ['id', id])
  },
  getFellows(state) {
    return state.fellows
  },
  getSuccess(state) {
    return state.success
  },
  getFailed(state) {
    return state.failed
  }
}

const actions = {
  loadFellows({ commit, rootGetters, getters }) {
    firebase.database().ref("fellow").on("value", (snapshot) => {
      const fellow = []
      for(var a in snapshot.val()){
        fellow.push(snapshot.val()[a])
      }
      commit('setFellows', fellow)
  	})
  },
  getFellowId({ commit, getters }, id) {
    const fellow = getters.getFellowById(id)
    commit('setFellow', fellow)
  },
  saveFellow({ commit, rootGetters }, data) {
    var key = firebase.database().ref().child('fellow').push().key;
    firebase.database().ref('/fellow/'+key).set({
      id: key,
      name: data.name,
      address: data.address,
      email: data.email,
      birthday: data.birthday,
      phone: data.phone,
      gender: data.gender
      },(e)=>{
        if(e){
          commit('setFailed')
        }else{
          commit('setSuccess')
        }
    })
  },
  updateFellow({ commit }, data) {
    const postData = {
      name: data.name,
      address: data.address,
      email: data.email,
      birthday: data.birthday,
      phone: data.phone,
      gender: data.gender
    }
    firebase.database().ref("/fellow/"+data.id).set(postData,(err)=>{
      if(err){
        commit('setFailed')
      }else{
        commit('setSuccess')
      }
    })
  },
  deleteFellow({ commit, dispatch }, data) {
    firebase.database().ref("fellow/"+data.id).remove().then(()=>{
        commit('setSuccess')
    }).catch((e)=>{
        commit('setFailed')
    })
  }
}

const mutations = {
	setFellows(state, fellows) {
    state.fellows = fellows
  },
  setFellow(state, data) {
    state.fellow = data
  },
  setSuccess(state) {
    state.success += 1
  },
  setFailed(state) {
    state.failed += 1
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}