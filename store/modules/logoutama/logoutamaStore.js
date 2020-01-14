import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, { storageRef } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const logoutamaRef = db2.collection('logoutama')
const state = {
  logoutama: [],
  nama_logoutama: '',
  image: ''
}
// getters
const getters = {
  activeLogoutama: (state, getters) => {
    return state.logoutama
  }
}

// actions
const actions = {
  actionUpdateLogoutama ({ commit, dispatch }, payload) {
    var self = this
    setTimeout(() => {
      logoutamaRef.doc(payload.id).delete()
        .then(() => {
          var id = payload.nama_logoutama.replace(/\s/g, '').toLowerCase()
          var logoutamaRef1 = logoutamaRef.doc(id)
          // var id bikin samarata semua value, tanpa spasi dan lowercase
          // // console.log('ini di action')
          logoutamaRef1.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              logoutamaRef1.set({
                nama_logoutama: payload.nama_logoutama.toUpperCase(),
                selected: false
              })

              var newItem = {
                id: id,
                nama_logoutama: payload.nama_logoutama.toUpperCase()
              }
              commit('saveLogoutama', newItem)
              commit('resetLogoutama', newItem)
              dispatch('actionListLogoutama')
            } else {
              self.$toast.error('data exist')
            }
          })
          resolve()
        })
      resolve()
      this.$toast.success('Logoutama ' + payload.nama_logoutama + ' berhasil diubah')
    }, 1000)
  },

  actionSaveLogoutama ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var id = payload.nama_logoutama.replace(/\s/g, '').toLowerCase()
        var logoutamaRef1 = logoutamaRef.doc(id)
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        logoutamaRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            logoutamaRef1.set({
              nama_logoutama: payload.nama_logoutama,
              image: payload.image,
              selected: false
            })

            var newItem = {
              id: id,
              nama_logoutama: payload.nama_logoutama,
              image: payload.image,
              selected: false
            }
            commit('saveLogoutama', newItem)
            self.$toast.success('Logoutama ' + payload.nama_logoutama + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListLogoutama ({ commit }, payload) {
    commit('resetLogoutama')

    return new Promise((resolve, reject) => {
      // console.log('action list logoutama')
      setTimeout(() => {
        logoutamaRef.orderBy('nama_logoutama', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_logoutama: doc.data().nama_logoutama,
              image: doc.data().image
            }
            commit('saveLogoutama', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteLogoutama ({ commit, dispatch }, payload) {
    // console.log(payload)
    var logoutama1Ref = storageRef.child('images/' + payload.nama_logoutama)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        logoutama1Ref.delete()
        logoutamaRef.doc(payload.id).delete()
        commit('resetLogoutama')
        dispatch('actionListLogoutama')
        this.$toast.error('Logoutama ' + payload.nama_logoutama + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveLogoutama: (state, payload) => {
    state.logoutama.push(payload)
  },
  resetLogoutama: (state) => {
    state.logoutama = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
