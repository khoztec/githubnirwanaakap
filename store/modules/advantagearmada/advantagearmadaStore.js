import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const advantagearmadaRef = db2.collection('advantagearmada')
const state = {
  advantagearmada: [],
  judul_advantagearmada: '',
  isi_advantagearmada: '',
  icon_advantagearmada: '',
  created_at: ''
}
// getters
const getters = {
  activeAdvantagearmada: (state, getters) => {
    return state.advantagearmada
  }
}

// actions
const actions = {
  actionUpdateAdvantagearmada ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        advantagearmadaRef.doc(payload.id).update({
          judul_advantagearmada: payload.judul_advantagearmada,
          isi_advantagearmada: payload.isi_advantagearmada,
          icon_advantagearmada: payload.icon_advantagearmada,
          created_at: moment().format()
        }).then(() => {
          commit('resetAdvantagearmada')
        }).then(() => {
          dispatch('actionListAdvantagearmada')
        })
        resolve()
        this.$toast.success('Advantage ' + payload.judul_advantagearmada + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveAdvantagearmada ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var id = payload.judul_advantagearmada.replace(/\s/g, '').toLowerCase()
        var advantagearmadaRef1 = advantagearmadaRef.doc(id)
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        advantagearmadaRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            advantagearmadaRef1.set({
              judul_advantagearmada: payload.judul_advantagearmada,
              isi_advantagearmada: payload.isi_advantagearmada,
              icon_advantagearmada: payload.icon_advantagearmada,
              created_at: moment().format(),
              selected: false
            })

            var newItem = {
              id: id,
              judul_advantagearmada: payload.judul_advantagearmada,
              isi_advantagearmada: payload.isi_advantagearmada,
              icon_advantagearmada: payload.icon_advantagearmada,
              created_at: moment().format()
            }
            commit('saveAdvantagearmada', newItem)
            self.$toast.success('Advantagearmada ' + payload.judul_advantagearmada + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListAdvantagearmada ({ commit }, payload) {
    commit('resetAdvantagearmada')

    return new Promise((resolve, reject) => {
      // console.log('action list advantagearmada')
      setTimeout(() => {
        advantagearmadaRef.orderBy('created_at', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              created_at: moment(doc.data().created_at).format('DD-MM-YYYY'),
              judul_advantagearmada: doc.data().judul_advantagearmada,
              isi_advantagearmada: doc.data().isi_advantagearmada,
              icon_advantagearmada: doc.data().icon_advantagearmada
            }
            commit('saveAdvantagearmada', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteAdvantagearmada ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        advantagearmadaRef.doc(payload.id).delete()
        commit('resetAdvantagearmada')
        dispatch('actionListAdvantagearmada')
        this.$toast.error('Advantagearmada ' + payload.judul_advantagearmada + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveAdvantagearmada: (state, payload) => {
    state.advantagearmada.push(payload)
  },
  resetAdvantagearmada: (state) => {
    state.advantagearmada = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
