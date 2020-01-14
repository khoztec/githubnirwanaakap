import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const visiRef = db2.collection('visi')
const state = {
  visi: [],
  nama_visi: ''
}
// getters
const getters = {
  activeVisi: (state, getters) => {
    return state.visi
  }
}

// actions
const actions = {
  actionUpdateVisi ({ commit, dispatch }, payload) {
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        visiRef.doc(payload.id).delete()
          .then(() => {
            var id = payload.visi.replace(/\s/g, '').toLowerCase()
            var visiRef1 = visiRef.doc(id)
            // var id bikin samarata semua value, tanpa spasi dan lowercase
            // // console.log('ini di action')
            visiRef1.get().then((docSnapshot) => {
              if (!docSnapshot.exists) {
                visiRef1.set({
                  visi: payload.visi,
                  selected: false
                })

                var newItem = {
                  id: id,
                  visi: payload.visi
                }
                commit('saveVisi', newItem)
                commit('resetVisi', newItem)
                dispatch('actionListVisi')
              } else {
                self.$toast.error('data exist')
              }
            })
            resolve()
          })
        resolve()
        this.$toast.success('Visi ' + payload.visi + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveVisi ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        visiRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            visiRef.add({
              nama_visi: payload.nama_visi
            })

            var newItem = {
              nama_visi: payload.nama_visi
            }
            commit('saveVisi', newItem)
            self.$toast.success('Visi ' + payload.nama_visi + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListVisi ({ commit }, payload) {
    commit('resetVisi')

    return new Promise((resolve, reject) => {
      // // console.log('action list visi')
      setTimeout(() => {
        visiRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              nama_visi: doc.data().nama_visi
            }
            commit('saveVisi', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteVisi ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        visiRef.doc(payload.id).delete()
        commit('resetVisi')
        dispatch('actionListVisi')
        this.$toast.error('Visi ' + payload.nama_visi + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveVisi: (state, payload) => {
    state.visi.push(payload)
  },
  resetVisi: (state) => {
    state.visi = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
