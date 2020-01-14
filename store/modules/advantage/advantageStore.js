import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, {storageRef} from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const advantageRef = db2.collection('advantage')
const state = {
  advantage: [],
  nama_advantage: '',
  image: '',
  created_at: ''
}
// getters
const getters = {
  activeAdvantage: (state, getters) => {
    return state.advantage
  },
  activeComment: (state, getters) => {
    return state.comment
  }
}

// actions
const actions = {
  actionUpdateAdvantage ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        advantageRef.doc(payload.id).update({
          nama_advantage: payload.nama_advantage,
        }).then(() => {
          commit('resetAdvantage')
        }).then(() => {
          dispatch('actionListAdvantage')
        })
        resolve()
        this.$toast.success('Advantage ' + payload.nama_advantage + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveAdvantage ({ commit, dispatch }, payload) {
    var self = this
    var text = payload.nama_advantage
    var imagesRef = storageRef.child('images/advantage/' + text)
    // // console.log(payload)
    imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
      // // console.log(snapshot)
      imagesRef.getDownloadURL().then(function (url) {
        // self.url = url,
        // self.$toast.success('Gambar berhasil diupload')
        // =============== Save Database ===============
        var id = payload.nama_advantage.replace(/\s/g, '').toLowerCase()
        var advantageRef1 = advantageRef.doc(id)
        advantageRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            advantageRef1.set({
              nama_advantage: payload.nama_advantage,
              image: url,
              created_at: moment().format(),
              selected: false
            })
            // console.log(advantageRef1)
            var newItem2 = {
              id: id,
              nama_advantage: payload.nama_advantage,
              image: url,
              created_at: moment().format('Do MMMM YYYY')
            }
            commit('saveAdvantage', newItem2)
            self.$toast.success('Advantage ' + payload.nama_advantage + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        // =============== Save Database ===============
      })
    })
  },

  actionListAdvantage ({ commit }, payload) {
    commit('resetAdvantage')

    return new Promise((resolve, reject) => {
      // // console.log('action list advantage')
      setTimeout(() => {
        advantageRef.orderBy('created_at', 'desc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_advantage: doc.data().nama_advantage,
              image: doc.data().image,
              created_at: moment(doc.data().created_at).format('DD-MM-YYYY')
            }
            commit('saveAdvantage', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteAdvantage ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        advantageRef.doc(payload.id).delete()
        commit('resetAdvantage')
        dispatch('actionListAdvantage')
        this.$toast.error('Advantage ' + payload.nama_advantage + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveAdvantage: (state, payload) => {
    state.advantage.push(payload)
  },
  resetAdvantage: (state) => {
    state.advantage = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
