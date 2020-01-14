import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, { storageRef } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const headerRef = db2.collection('header')
const state = {
  header: [],
  judul_header: '',
  slogan_header: '',
  image: ''
}
// getters
const getters = {
  activeHeader: (state, getters) => {
    return state.header
  }
}

// actions
const actions = {
  actionUpdateHeader ({ commit, dispatch }, payload) {
    var self = this
    var header1Ref = storageRef.child('images/' + payload.judul_header)
    setTimeout(() => {
      header1Ref.delete()
      headerRef.doc(payload.id).delete()
        .then(() => {
          var text = payload.judul_header
          var imagesRef = storageRef.child('images/' + text)
          imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
            imagesRef.getDownloadURL().then(function (url) {
              var id = payload.judul_header.replace(/\s/g, '').toLowerCase()
              var headerRef1 = headerRef.doc(id)
              headerRef1.get().then((docSnapshot) => {
                if (!docSnapshot.exists) {
                  headerRef1.set({
                    judul_header: payload.judul_header,
                    slogan_header: payload.slogan_header,
                    image: url,
                    selected: false
                  })
                  // console.log(headerRef1)
                  var newItem2 = {
                    id: id,
                    judul_header: payload.judul_header,
                    slogan_header: payload.slogan_header,
                    image: url
                  }
                  commit('saveHeader', newItem2)
                  commit('resetHeader')
                } else {
                  self.$toast.error('data exist')
                }
              })
              //= ============== Save Database ===============
            })
          })
        })
      this.$toast.success('Header ' + payload.judul_header + ' berhasil diubah')
    }, 1000)
  },

  actionSaveHeader ({ commit, dispatch }, payload) {
    var self = this
    var text = payload.judul_header
    var imagesRef = storageRef.child('images/' + text)
    // // console.log(payload)
    imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
      // // console.log(snapshot)
      imagesRef.getDownloadURL().then(function (url) {
        // self.url = url,
        // self.$toast.success('Gambar berhasil diupload')
        //= ============== Save Database ===============
        var id = payload.judul_header.replace(/\s/g, '').toLowerCase()
        var headerRef1 = headerRef.doc(id)
        headerRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            headerRef1.set({
              judul_header: payload.judul_header,
              slogan_header: payload.slogan_header,
              image: url,
              selected: false
            })
            // console.log(headerRef1)
            var newItem2 = {
              id: id,
              judul_header: payload.judul_header,
              slogan_header: payload.slogan_header,
              image: url
            }
            commit('saveHeader', newItem2)
            self.$toast.success('Header ' + payload.judul_header + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        //= ============== Save Database ===============
      })
    })
  },

  actionListHeader ({ commit }, payload) {
    commit('resetHeader')

    return new Promise((resolve, reject) => {
      // console.log('action list header')
      setTimeout(() => {
        headerRef.orderBy('judul_header', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              judul_header: doc.data().judul_header,
              slogan_header: doc.data().slogan_header,
              image: doc.data().image
            }
            commit('saveHeader', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteHeader ({ commit, dispatch }, payload) {
    // console.log(payload)
    var header1Ref = storageRef.child('images/' + payload.judul_header)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        header1Ref.delete()
        headerRef.doc(payload.id).delete()
        commit('resetHeader')
        dispatch('actionListHeader')
        this.$toast.error('Header ' + payload.judul_header + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  },
  actionCheckHeader ({ commit }, payload) {
    return new Promise((resolve) => {
      // // console.log(payload)
      setTimeout(() => {
        headerRef.doc(payload.id_header).get().then((data2) => {
          commit('checkHeader', {
            id_header: payload.id_header,
            judul_header: data2.data().judul_header

          })
          // // console.log(data2.data())
        })
        resolve()
      }, 1000)
    })
  }
}

// mutations
const mutations = {
  saveHeader: (state, payload) => {
    state.header.push(payload)
  },
  resetHeader: (state) => {
    state.header = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
