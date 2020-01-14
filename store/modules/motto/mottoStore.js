import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const mottoRef = db2.collection('motto')
const state = {
  motto: [],
  nama_motto: ''
}
// getters
const getters = {
  activeMotto: (state, getters) => {
    return state.motto
  }
}

// actions
const actions = {
  actionUpdateMotto ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        beritaRef.doc(payload.id).update({
          nama_motto: payload.nama_motto
        }).then(() => {
          commit('resetMotto')
        }).then(() => {
          dispatch('actionListMotto')
        })
        resolve()
        this.$toast.success('Berita ' + payload.nama_motto + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveMotto ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        mottoRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            mottoRef.add({
              nama_motto: payload.nama_motto
            })

            var newItem = {
              nama_motto: payload.nama_motto
            }
            commit('saveMotto', newItem)
            self.$toast.success('Motto ' + payload.nama_motto + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListMotto ({ commit }, payload) {
    commit('resetMotto')

    return new Promise((resolve, reject) => {
      // // console.log('action list motto')
      setTimeout(() => {
        mottoRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              nama_motto: doc.data().nama_motto
            }
            commit('saveMotto', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteMotto ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        mottoRef.doc(payload.id).delete()
        commit('resetMotto')
        dispatch('actionListMotto')
        this.$toast.error('Motto ' + payload.nama_motto + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveMotto: (state, payload) => {
    state.motto.push(payload)
  },
  resetMotto: (state) => {
    state.motto = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
