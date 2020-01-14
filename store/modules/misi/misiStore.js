import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const misiRef = db2.collection('misi')
const state = {
  misi: [],
  nama_misi: ''
}
// getters
const getters = {
  activeMisi: (state, getters) => {
    return state.misi
  }
}

// actions
const actions = {
  actionUpdateMisi ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        beritaRef.doc(payload.id).update({
          nama_misi: payload.nama_misi
        }).then(() => {
          commit('resetMisi')
        }).then(() => {
          dispatch('actionListMisi')
        })
        resolve()
        this.$toast.success('Berita ' + payload.nama_misi + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveMisi ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        misiRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            misiRef.add({
              nama_misi: payload.nama_misi
            })

            var newItem = {
              nama_misi: payload.nama_misi
            }
            commit('saveMisi', newItem)
            self.$toast.success('Misi ' + payload.nama_misi + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListMisi ({ commit }, payload) {
    commit('resetMisi')

    return new Promise((resolve, reject) => {
      // // console.log('action list misi')
      setTimeout(() => {
        misiRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              nama_misi: doc.data().nama_misi
            }
            commit('saveMisi', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteMisi ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        misiRef.doc(payload.id).delete()
        commit('resetMisi')
        dispatch('actionListMisi')
        this.$toast.error('Misi ' + payload.nama_misi + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveMisi: (state, payload) => {
    state.misi.push(payload)
  },
  resetMisi: (state) => {
    state.misi = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
