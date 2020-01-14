import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const infosubscribeRef = db2.collection('infosubscribe')
const state = {
  infosubscribe: [],
  nama_infosubscribe: '',
  isi_infosubscribe: ''
}
// getters
const getters = {
  activeInfosubscribe: (state, getters) => {
    return state.infosubscribe
  }
}

// actions
const actions = {
  actionUpdateInfosubscribe ({ commit, dispatch }, payload) {
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        infosubscribeRef.doc(payload.id).update({
          nama_infosubscribe: payload.nama_infosubscribe,
          isi_infosubscribe: payload.isi_infosubscribe,
          created_at: moment().format()
        }).then(() => {
          commit('resetInfosubscribe')
        }).then(() => {
          dispatch('actionListInfosubscribe')
        })
        resolve()
        this.$toast.success('Advantage ' + payload.nama_infosubscribe + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveInfosubscribe ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var id = payload.nama_infosubscribe.replace(/\s/g, '').toLowerCase()
        var infosubscribeRef1 = infosubscribeRef.doc(id)
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // console.log('ini di action')
        infosubscribeRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            infosubscribeRef1.set({
              nama_infosubscribe: payload.nama_infosubscribe,
              isi_infosubscribe: payload.isi_infosubscribe,
              selected: false
            })

            var newItem = {
              id: id,
              nama_infosubscribe: payload.nama_infosubscribe,
              isi_infosubscribe: payload.isi_infosubscribe
            }
            commit('saveInfosubscribe', newItem)
            self.$toast.success('Infosubscribe ' + payload.nama_infosubscribe + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListInfosubscribe ({ commit }, payload) {
    commit('resetInfosubscribe')
    return new Promise((resolve, reject) => {
      console.log('action list infosubscribe')
      setTimeout(() => {
        infosubscribeRef.orderBy('nama_infosubscribe', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_infosubscribe: doc.data().nama_infosubscribe,
              isi_infosubscribe: doc.data().isi_infosubscribe
            }
            commit('saveInfosubscribe', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteInfosubscribe ({ commit, dispatch }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        infosubscribeRef.doc(payload.id).delete()
        commit('resetInfosubscribe')
        dispatch('actionListInfosubscribe')
        this.$toast.error('Infosubscribe ' + payload.nama_infosubscribe + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveInfosubscribe: (state, payload) => {
    state.infosubscribe.push(payload)
  },
  resetInfosubscribe: (state) => {
    state.infosubscribe = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
