import firebase from "firebase";

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
            console.log('error')
            commit('setFailed')
        }else{
            console.log('success')
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