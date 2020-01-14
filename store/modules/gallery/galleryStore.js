import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, {storageRef} from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const galleryRef = db2.collection('gallery')
const state = {
  gallery: [],
  judul_gallery: '',
  created_at: '',
  image: ''
}
// getters
const getters = {
  activeGallery: (state, getters) => {
    return state.gallery
  }
}

// actions
const actions = {
  actionUpdateGallery ({commit, dispatch}, payload) {
    var self = this
    setTimeout(() => {
      galleryRef.doc(payload.id).delete()
        .then(() => {
          var id = payload.judul_gallery.replace(/\s/g, '').toLowerCase()
          var galleryRef1 = galleryRef.doc(id)
          // var id bikin samarata semua value, tanpa spasi dan lowercase
          // // console.log('ini di action')
          galleryRef1.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              galleryRef1.set({
                judul_gallery: payload.judul_gallery,
                selected: false
              })

              var newItem = {
                id: id,
                judul_gallery: payload.judul_gallery
              }
              commit('saveGallery', newItem)
              commit('resetGallery', newItem)
              dispatch('actionListGallery')
            } else {
              self.$toast.error('data exist')
            }
          })
          resolve()
        })
      resolve()
      this.$toast.success('Gallery ' + payload.judul_gallery + ' berhasil diubah')
    }, 1000)
  },

  actionSaveGallery ({ commit, dispatch }, payload) {
    var self = this
    var text = payload.judul_gallery
    var imagesRef = storageRef.child('images/gallery/' + text)
    // // console.log(payload)
    imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
      // // console.log(snapshot)
      imagesRef.getDownloadURL().then(function (url) {
        // self.url = url,
        // self.$toast.success('Gambar berhasil diupload')
        // =============== Save Database ===============
        var id = payload.judul_gallery.replace(/\s/g, '').toLowerCase()
        var galleryRef1 = galleryRef.doc(id)
        galleryRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            galleryRef1.set({
              judul_gallery: payload.judul_gallery,
              image: url,
              created_at: moment().format(),
              selected: false
            })
            // console.log(galleryRef1)
            var newItem2 = {
              id: id,
              judul_gallery: payload.judul_gallery,
              image: url,
              created_at: moment().format('Do MMMM YYYY')
            }
            commit('saveGallery', newItem2)
            self.$toast.success('Gallery ' + payload.judul_gallery + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        // =============== Save Database ===============
      })
    })
  },

  actionListGallery ({commit}, payload) {
    commit('resetGallery')

    return new Promise((resolve, reject) => {
      // console.log('action list gallery')
      setTimeout(() => {
        galleryRef.orderBy('judul_gallery', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              judul_gallery: doc.data().judul_gallery,
              created_at: moment().format('Do MMMM YYYY'),
              image: doc.data().image
            }
            commit('saveGallery', data)
          })
        })
      }, 1000)
    })
  },
  
  actionDeleteGallery ({ commit, dispatch }, payload) {
    // console.log(payload)
    var gallery1Ref = storageRef.child('images/gallery/' + payload.judul_gallery)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        gallery1Ref.delete()
        galleryRef.doc(payload.id).delete()
        commit('resetGallery')
        dispatch('actionListGallery')
        this.$toast.error('Gallery ' + payload.judul_gallery + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveGallery: (state, payload) => {
    state.gallery.push(payload)
  },
  resetGallery: (state) => {
    state.gallery = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
