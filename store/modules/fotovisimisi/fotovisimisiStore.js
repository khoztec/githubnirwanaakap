import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const fotovisimisiRef = db2.collection('fotovisimisi')
const state = {
  fotovisimisi: [],
  nama_fotovisimisi: '',
  image_visi: '',
  image_misi: '',
  created_at: '',
}
// getters
const getters = {
  activeFotovisimisi: (state, getters) => {
    return state.fotovisimisi
  },
  activeComment: (state, getters) => {
    return state.comment
  }
}

// actions
const actions = {
  actionUpdateFotovisimisi ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fotovisimisiRef.doc(payload.id).update({
          nama_fotovisimisi: payload.nama_fotovisimisi
        }).then(() => {
          commit('resetFotovisimisi')
        }).then(() => {
          dispatch('actionListFotovisimisi')
        })
        resolve()
        this.$toast.success('Fotovisimisi ' + payload.nama_fotovisimisi + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveFotovisimisi ({ commit }, payload) {
    // commit ngaktifin fungsi dibawahnya sesama action
    // payload untuk ambil bawaan dari save method dari index
    // pakai titik untuk manggil variabel payload
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var id = payload.nama_fotovisimisi.replace(/\s/g, '').toLowerCase()
        var fotovisimisiRef1 = fotovisimisiRef.doc(id)
        // var id bikin samarata semua value, tanpa spasi dan lowercase
        // // console.log('ini di action')
        fotovisimisiRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            fotovisimisiRef1.set({
              nama_fotovisimisi: payload.nama_fotovisimisi,
              image_visi: payload.image_visi,
              image_misi: payload.image_misi,
              created_at: moment().format(),
              selected: false
            })

            var newItem = {
              id: id,
              nama_fotovisimisi: payload.nama_fotovisimisi,
              image_visi: payload.image_visi,
              image_misi: payload.image_misi,
              created_at: moment().format('Do MMMM YYYY')
            }
            commit('saveFotovisimisi', newItem)
            self.$toast.success('Fotovisimisi ' + payload.nama_fotovisimisi + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        resolve()
      }, 1000)
    })
  },

  actionListFotovisimisi ({ commit }, payload) {
    commit('resetFotovisimisi')

    return new Promise((resolve, reject) => {
      // // console.log('action list fotovisimisi')
      setTimeout(() => {
        fotovisimisiRef.orderBy('created_at', 'desc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_fotovisimisi: doc.data().nama_fotovisimisi,
              image_visi: doc.data().image_visi,
              image_misi: doc.data().image_misi,
              created_at: moment(doc.data().created_at).format('DD-MM-YYYY')
            }
            commit('saveFotovisimisi', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteFotovisimisi ({ commit, dispatch }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fotovisimisiRef.doc(payload.id).delete()
        commit('resetFotovisimisi')
        dispatch('actionListFotovisimisi')
        this.$toast.error('Fotovisimisi ' + payload.nama_fotovisimisi + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveFotovisimisi: (state, payload) => {
    state.fotovisimisi.push(payload)
  },
  resetFotovisimisi: (state) => {
    state.fotovisimisi = []
  },
  saveComment: (state, payload) => {
    state.comment.push(payload)
  },
  resetComment: (state) => {
    state.comment = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
