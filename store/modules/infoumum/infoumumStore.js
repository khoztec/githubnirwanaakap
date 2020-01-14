import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const infoumumRef = db2.collection('infoumum')
const state = {
  infoumum: [],
  nama_info: '',
  isi_info: '',
  icon_info: ''
}
// getters
const getters = {
  activeInfoumum: (state, getters) => {
    return state.infoumum
  }
}

// actions
const actions = {
  actionUpdateInfoumum ({ commit, dispatch }, payload) {
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        infomumRef.doc(payload.id).update({
          judul_info: payload.judul_info,
          isi_info: payload.isi_info,
          icon_info: payload.icon_info,
          created_at: moment().format()
        }).then(() => {
          commit('resetInfoumum')
        }).then(() => {
          dispatch('actionListInfoumum')
        })
        resolve()
        this.$toast.success('Advantage ' + payload.judul_info + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveInfoumum ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var id = payload.nama_info.replace(/\s/g, '').toLowerCase()
        var infoumumRef1 = infoumumRef.doc(id)
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        infoumumRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            infoumumRef1.set({
              nama_info: payload.nama_info,
              isi_info: payload.isi_info,
              icon_info: payload.icon_info,
              selected: false
            })

            var newItem = {
              id: id,
              nama_info: payload.nama_info,
              isi_info: payload.isi_info,
              icon_info: payload.icon_info
            }
            commit('saveInfoumum', newItem)
            self.$toast.success('Infoumum ' + payload.nama_info + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListInfoumum ({ commit }, payload) {
    commit('resetInfoumum')

    return new Promise((resolve, reject) => {
      // // console.log('action list infoumum')
      setTimeout(() => {
        infoumumRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_info: doc.data().nama_info,
              isi_info: doc.data().isi_info,
              icon_info: doc.data().icon_info
            }
            commit('saveInfoumum', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteInfoumum ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        infoumumRef.doc(payload.id).delete()
        commit('resetInfoumum')
        dispatch('actionListInfoumum')
        this.$toast.error('Infoumum ' + payload.nama_info + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveInfoumum: (state, payload) => {
    state.infoumum.push(payload)
  },
  resetInfoumum: (state) => {
    state.infoumum = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
