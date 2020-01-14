import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
import firebase, { storageRef } from '@/services/fireinit.js'
// import _ from 'lodash'

const fotoarmadaRef = db2.collection('armada')
const state = {
  fotoarmada: [],
  id_armada: '',
  nama_armada: ''
}
// getters
const getters = {
  activeFotoarmada: (state, getters) => {
    return state.fotoarmada
  },
  activeNamaArmada: (state) => {
    return state.nama_armada
  },
  activeIdArmada: (state) => {
    return state.id_armada
  }
}

// actions
const actions = {
  actionUpdateKota ({ commit, dispatch }, payload) {
    var self = this
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fotoarmadaRef.doc(payload.id_armada).collection('fotoarmada').doc(payload.id).delete()
          .then(() => {
            var id = payload.nama_fotoarmada.replace(/\s/g, '').toLowerCase()
            var fotoarmadaRef1 = fotoarmadaRef.doc(payload.id_armada).collection('fotoarmada').doc(id)
            // var id bikin samarata semua value, tanpa spasi dan lowercase
            // console.log('ini di action')
            fotoarmadaRef1.get().then((docSnapshot) => {
              if (!docSnapshot.exists) {
                fotoarmadaRef1.set({
                  nama_armada: payload.nama_armada,
                  nama_fotoarmada: payload.nama_fotoarmada,
                  selected: false
                })

                var newItem = {
                  id: payload.id,
                  nama_armada: payload.nama_armada,
                  nama_fotoarmada: payload.nama_fotoarmada
                }
                commit('saveKota', newItem)
                dispatch('actionListKota', {
                  id_armada: payload.id_armada
                })
                self.$toast.success('Kota ' + payload.nama_fotoarmada + ' berhasil ditambah')
              } else {
                self.$toast.error('data exist')
              }
            })
            resolve()
          })
        resolve()
        this.$toast.success('Kota ' + payload.nama_fotoarmada + ' berhasil diubah')
      }, 1000)
    })
  },

  actionSaveFotoarmada ({ commit, dispatch }, payload) {
    var self = this
    var text = payload.nama_fotoarmada
    var imagesRef = storageRef.child('images/' + text)
    // console.log(payload)
    imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
      // console.log(snapshot)
      imagesRef.getDownloadURL().then(function (url) {
        // self.url = url,
        // self.$toast.success('Gambar berhasil diupload')
        //= ============== Save Database ===============
        var id = payload.nama_fotoarmada
        var fotoarmadaRef1 = fotoarmadaRef.doc(payload.id_armada).collection('fotoarmada').doc(id)
        fotoarmadaRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            fotoarmadaRef1.set({
              nama_fotoarmada: payload.nama_fotoarmada,
              image: url,
              selected: false
            })
            console.log(fotoarmadaRef1)
            var newItem2 = {
              id: id,
              nama_fotoarmada: payload.nama_fotoarmada,
              image: url
            }
            commit('saveFotoarmada', newItem2)
            self.$toast.success('Fotoarmada ' + payload.nama_fotoarmada + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        //= ============== Save Database ===============
      })
    })
  },
  actionListFotoarmada ({ commit }, payload) {
    commit('resetFotoarmada')

    return new Promise((resolve, reject) => {
      console.log('actionlistfotoarmada' + payload.id_armada)
      setTimeout(() => {
        console.log(payload.id_armada)
        fotoarmadaRef.doc(payload.id_armada).collection('fotoarmada').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              id_armada: doc.data().id_armada,
              nama_fotoarmada: doc.data().nama_fotoarmada,
              image: doc.data().image
            }
            commit('saveFotoarmada', data)
          })
        })
      }, 1000)
    })
  },
  actionListArmada ({ commit }, payload) {
    commit('resetArmada')

    return new Promise((resolve, reject) => {
      // console.log('action list armada')
      setTimeout(() => {
        armadaRef.orderBy('nama_armada', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_armada: doc.data().nama_armada
            }
            commit('saveArmada', data)
          })
        })
      }, 1000)
    })
  },

  actionDeleteFotoarmada ({ commit, dispatch }, payload) {
    console.log(payload)
    var fotoarmada1Ref = storageRef.child('images/' + payload.nama_fotoarmada)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fotoarmada1Ref.delete()
        fotoarmadaRef.doc(payload.id_armada).collection('fotoarmada').doc(payload.id).delete()
        commit('resetFotoarmada')
        commit('resetArmada')
        dispatch('actionListFotoarmada', {
          id_armada: payload.id_armada
        })
        this.$toast.error('Fotoarmada ' + payload.nama_fotoarmada + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveFotoarmada: (state, payload) => {
    state.fotoarmada.push(payload)
  },
  resetFotoarmada: (state) => {
    state.armada = '',
    state.fotoarmada = []
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
