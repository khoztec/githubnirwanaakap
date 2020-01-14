import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const profilRef = db2.collection('profil')
const state = {
  profil: [],
  judul_profil: '',
  isi_profil: ''
}
// getters
const getters = {
  activeProfil: (state, getters) => {
    return state.profil
  }
}

// actions
const actions = {
  actionUpdateProfil ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        profilRef.doc(payload.id).update({
          judul_profil: payload.judul_profil,
          isi_profil: payload.isi_profil,
        }).then(() => {
          commit('resetProfil')
          dispatch('actionListProfil')
        })
        resolve()
        this.$toast.success('Profil ' + payload.judul_profil + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveProfil ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var id = payload.judul_profil.replace(/\s/g, '').toLowerCase()
        var profilRef1 = profilRef.doc(id)
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        profilRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            profilRef1.set({
              judul_profil: payload.judul_profil,
              isi_profil: payload.isi_profil,
            })

            var newItem = {
              id: id,
              judul_profil: payload.judul_profil,
              isi_profil: payload.isi_profil
            }
            commit('saveProfil', newItem)
            self.$toast.success('Profil ' + payload.judul_profil + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListProfil ({ commit }, payload) {
    commit('resetProfil')

    return new Promise((resolve, reject) => {
      // // console.log('action list profil')
      setTimeout(() => {
        profilRef.orderBy('judul_profil', 'desc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              judul_profil: doc.data().judul_profil,
              isi_profil: doc.data().isi_profil
            }
            commit('saveProfil', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteProfil ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        profilRef.doc(payload.id).delete()
        commit('resetProfil')
        dispatch('actionListProfil')
        this.$toast.error('Profil ' + payload.judul_profil + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveProfil: (state, payload) => {
    state.profil.push(payload)
  },
  resetProfil: (state) => {
    state.profil = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
