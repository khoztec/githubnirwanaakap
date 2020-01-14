import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const statusRef = db2.collection('status')
const state = {
  status: [],
  nama_status: '',
  created_at: '',
  selected: ''
}
// getters
const getters = {
  activeStatus: (state, getters) => {
    return state.status
  }
}

// actions
const actions = {
  actionUpdateStatus ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        statusRef.doc(payload.id).update({
          judul_status: payload.nama_status,
        }).then(() => {
          commit('resetStatus')
        }).then(() => {
          dispatch('actionListStatus')
        })
        resolve()
        this.$toast.success('Status ' + payload.nama_status + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveStatus ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        statusRef.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            statusRef.add({
              nama_status: payload.nama_status,
              selected: false,
              created_at: moment().format()
            })

            var newItem = {
              nama_status: payload.nama_status,
              selected: false,
              created_at: moment().format()
            }
            commit('saveStatus', newItem)
            self.$toast.success('Status ' + payload.nama_status + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListStatus ({ commit }, payload) {
    commit('resetStatus')

    return new Promise((resolve, reject) => {
      // // console.log('action list status')
      setTimeout(() => {
        statusRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_status: doc.data().nama_status,
              created_at: moment(doc.data().created_at).format('DD-MM-YYYY')
            }
            commit('saveStatus', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteStatus ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        statusRef.doc(payload.id).delete()
        commit('resetStatus')
        dispatch('actionListStatus')
        this.$toast.error('Status ' + payload.nama_status + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveStatus: (state, payload) => {
    state.status.push(payload)
  },
  resetStatus: (state) => {
    state.status = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
