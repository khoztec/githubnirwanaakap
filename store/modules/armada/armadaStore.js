import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, { storageRef } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const armadaRef = db2.collection('armada')
const state = {
  armada: [],
  nama_armada: '',
  desc_armada: '',
  seat_armada: '',
  slogan_armada: '',
  details_armada: '',
  image: ''
}
// getters
const getters = {
  activeArmada: (state, getters) => {
    return state.armada
  }
}

// actions
const actions = {
  actionUpdateArmada ({ commit, dispatch }, payload) {
    var self = this
    setTimeout(() => {
      armadaRef.doc(payload.id).delete()
        .then(() => {
          var id = payload.nama_armada.replace(/\s/g, '').toLowerCase()
          var armadaRef1 = armadaRef.doc(id)
          // var id bikin samarata semua value, tanpa spasi dan lowercase
          // console.log('ini di action')
          armadaRef1.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              armadaRef1.set({
                nama_armada: payload.nama_armada.toUpperCase(),
                seat_armada: payload.seat_armada,
                slogan_armada: payload.slogan_armada,
                desc_armada: payload.desc_armada,
                details_armada: payload.details_armada,
                image: payload.image,
                selected: false
              })

              var newItem = {
                id: id,
                nama_armada: payload.nama_armada.toUpperCase(),
                seat_armada: payload.seat_armada,
                desc_armada: payload.desc_armada,
                details_armada: payload.details_armada,
                image: payload.image,
                selected: false
              }
              commit('saveArmada', newItem)
              commit('resetArmada', newItem)
              dispatch('actionListArmada')
            } else {
              self.$toast.error('data exist')
            }
          })
          resolve()
        })
      resolve()
      this.$toast.success('Armada ' + payload.nama_armada + ' berhasil diubah')
    }, 1000)
  },

  actionSaveArmada ({ commit, dispatch }, payload) {
    var self = this
    var text = payload.nama_armada
    var imagesRef = storageRef.child('images/' + text)
    // console.log(payload)
    imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
      // console.log(snapshot)
      imagesRef.getDownloadURL().then(function (url) {
        // self.url = url,
        // self.$toast.success('Gambar berhasil diupload')
        //= ============== Save Database ===============
        var id = payload.nama_armada.replace(/\s/g, '').toLowerCase()
        var armadaRef1 = armadaRef.doc(id)
        armadaRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            armadaRef1.set({
              nama_armada: payload.nama_armada,
              seat_armada: payload.seat_armada,
              slogan_armada: payload.slogan_armada,
              desc_armada: payload.desc_armada,
              details_armada: payload.details_armada,
              image: url,
              selected: false
            })
            console.log(armadaRef1)
            var newItem2 = {
              id: id,
              nama_armada: payload.nama_armada,
              seat_armada: payload.seat_armada,
              slogan_armada: payload.slogan_armada,
              desc_armada: payload.desc_armada,
              details_armada: payload.details_armada,
              image: url,
              selected: false
            }
            commit('saveArmada', newItem2)
            self.$toast.success('Armada ' + payload.nama_armada + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        //= ============== Save Database ===============
      })
    })
  },

  actionListArmada ({ commit }, payload) {
    commit('resetArmada')

    return new Promise((resolve, reject) => {
      console.log('action list armada')
      setTimeout(() => {
        armadaRef.orderBy('nama_armada', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              nama_armada: doc.data().nama_armada,
              seat_armada: doc.data().seat_armada,
              slogan_armada: doc.data().slogan_armada,
              desc_armada: doc.data().desc_armada,
              details_armada: doc.data().details_armada,
              image: doc.data().image
            }
            commit('saveArmada', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteArmada ({ commit, dispatch }, payload) {
    console.log(payload)
    var armada1Ref = storageRef.child('images/' + payload.nama_armada)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        armada1Ref.delete()
        armadaRef.doc(payload.id).delete()
        commit('resetArmada')
        dispatch('actionListArmada')
        this.$toast.error('Armada ' + payload.nama_armada + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  },
  actionCheckArmada ({ commit }, payload) {
    return new Promise((resolve) => {
      // console.log(payload)
      setTimeout(() => {
        armadaRef.doc(payload.id_armada).get().then((data2) => {
          commit('checkArmada', {
            id_armada: payload.id_armada,
            nama_armada: data2.data().nama_armada

          })
          // console.log(data2.data())
        })
        resolve()
      }, 1000)
    })
  }
}

// mutations
const mutations = {
  saveArmada: (state, payload) => {
    state.armada.push(payload)
  },
  resetArmada: (state) => {
    state.armada = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
