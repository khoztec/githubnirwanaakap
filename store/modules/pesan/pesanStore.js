import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const pesanRef = db2.collection('pesan')
const state = {
  pesan: []
}
// getters
const getters = {
  activePesan: (state, getters) => {
    return state.pesan
  }
}

// actions
const actions = {
  actionSavePesan ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        pesanRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            pesanRef.add({
              nama_pesan: payload.nama_pesan,
              email_pesan: payload.email_pesan,
              nohp_pesan: payload.nohp_pesan,
              isipesan_pesan: payload.isipesan_pesan,
              created_at: moment().format()
            })

            var newItem = {
              nama_pesan: payload.nama_pesan,
              email_pesan: payload.email_pesan,
              nohp_pesan: payload.nohp_pesan,
              isipesan_pesan: payload.isipesan_pesan,
              created_at: moment().format('Do MMMM YYYY')
            }
            commit('savePesan', newItem)
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListPesan ({commit}, payload) {
    commit('resetPesan')

    return new Promise((resolve, reject) => {
      // console.log('action list pesan')
      setTimeout(() => {
        pesanRef.orderBy('created_at', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_pesan: doc.data().nama_pesan,
              email_pesan: doc.data().email_pesan,
              nohp_pesan: doc.data().nohp_pesan,
              isipesan_pesan: doc.data().isipesan_pesan,
              created_at: moment().format('Do MMMM YYYY')
            }
            commit('savePesan', data)
          })
        })
      }, 1000)
    })
  },
  actionDeletePesan ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        pesanRef.doc(payload.id).delete()
        commit('resetPesan')
        dispatch('actionListPesan')
        // this.$toast.error('Pesan dari ' + payload.nama_depan + payload.nama_belakang + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  savePesan: (state, payload) => {
    state.pesan.push(payload)
  },
  resetPesan: (state) => {
    state.pesan = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
