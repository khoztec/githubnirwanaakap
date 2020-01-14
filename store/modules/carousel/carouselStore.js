import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, {storageRef} from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const carouselRef = db2.collection('carousel')
const state = {
  carousel: [],
  judul_carousel: '',
  created_at: '',
  image: ''
}
// getters
const getters = {
  activeCarousel: (state, getters) => {
    return state.carousel
  }
}

// actions
const actions = {
  actionUpdateCarousel ({commit, dispatch}, payload) {
    var self = this
    setTimeout(() => {
      carouselRef.doc(payload.id).delete()
        .then(() => {
          var id = payload.judul_carousel.replace(/\s/g, '').toLowerCase()
          var carouselRef1 = carouselRef.doc(id)
          // var id bikin samarata semua value, tanpa spasi dan lowercase
          // // console.log('ini di action')
          carouselRef1.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              carouselRef1.set({
                judul_carousel: payload.judul_carousel,
                selected: false
              })

              var newItem = {
                id: id,
                judul_carousel: payload.judul_carousel
              }
              commit('saveCarousel', newItem)
              commit('resetCarousel', newItem)
              dispatch('actionListCarousel')
            } else {
              self.$toast.error('data exist')
            }
          })
          resolve()
        })
      resolve()
      this.$toast.success('Carousel ' + payload.judul_carousel + ' berhasil diubah')
    }, 1000)
  },

  actionSaveCarousel ({ commit, dispatch }, payload) {
    var self = this
    var text = payload.judul_carousel
    var imagesRef = storageRef.child('images/carousel/' + text)
    // // console.log(payload)
    imagesRef.putString(payload.image, 'data_url').then(function (snapshot) {
      // // console.log(snapshot)
      imagesRef.getDownloadURL().then(function (url) {
        // self.url = url,
        // self.$toast.success('Gambar berhasil diupload')
        // =============== Save Database ===============
        var id = payload.judul_carousel.replace(/\s/g, '').toLowerCase()
        var carouselRef1 = carouselRef.doc(id)
        carouselRef1.get().then((docSnapshot) => {
          if (!docSnapshot.exists) {
            carouselRef1.set({
              judul_carousel: payload.judul_carousel,
              image: url,
              created_at: moment().format(),
              selected: false
            })
            // console.log(carouselRef1)
            var newItem2 = {
              id: id,
              judul_carousel: payload.judul_carousel,
              image: url,
              created_at: moment().format('Do MMMM YYYY')
            }
            commit('saveCarousel', newItem2)
            self.$toast.success('Carousel ' + payload.judul_carousel + ' berhasil ditambah')
          } else {
            self.$toast.error('data exist')
          }
        })
        // =============== Save Database ===============
      })
    })
  },

  actionListCarousel ({commit}, payload) {
    commit('resetCarousel')

    return new Promise((resolve, reject) => {
      // console.log('action list carousel')
      setTimeout(() => {
        carouselRef.orderBy('judul_carousel', 'asc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              judul_carousel: doc.data().judul_carousel,
              created_at: moment().format('Do MMMM YYYY'),
              image: doc.data().image
            }
            commit('saveCarousel', data)
          })
        })
      }, 1000)
    })
  },
  actionDeleteCarousel ({ commit, dispatch }, payload) {
    // console.log(payload)
    var carousel1Ref = storageRef.child('images/carousel/' + payload.judul_carousel)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        carousel1Ref.delete()
        carouselRef.doc(payload.id).delete()
        commit('resetCarousel')
        dispatch('actionListCarousel')
        this.$toast.error('Carousel ' + payload.judul_carousel + ' berhasil dihapus')
        resolve()
      }, 500)
    })
  }
}

// mutations
const mutations = {
  saveCarousel: (state, payload) => {
    state.carousel.push(payload)
  },
  resetCarousel: (state) => {
    state.carousel = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
