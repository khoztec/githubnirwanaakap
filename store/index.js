import Vuex from 'vuex'
import firebase, { auth, GoogleProvider, db2 } from '@/services/fireinit.js'
// jangan lupa ditambah setiap kali nambah crud
import infoumumStore from './modules/infoumum/infoumumStore.js'
import profilStore from './modules/profil/profilStore.js'
import advantageStore from './modules/advantage/advantageStore.js'
import advantagearmadaStore from './modules/advantagearmada/advantagearmadaStore.js'
import galleryStore from './modules/gallery/galleryStore.js'
import visiStore from './modules/visi/visiStore.js'
import misiStore from './modules/misi/misiStore.js'
import mottoStore from './modules/motto/mottoStore.js'
import pesanStore from './modules/pesan/pesanStore.js'
import carouselStore from './modules/carousel/carouselStore.js'
import logoutamaStore from './modules/logoutama/logoutamaStore.js'
import headerStore from './modules/header/headerStore.js'
import infosubscribeStore from './modules/infosubscribe/infosubscribeStore.js'
import mediasosialStore from './modules/mediasosial/mediasosialStore.js'
import logogroupStore from './modules/logogroup/logogroupStore.js'
import armadaStore from './modules/armada/armadaStore.js'
import fotoarmadaStore from './modules/fotoarmada/fotoarmadaStore.js'
import fotovisimisiStore from './modules/fotovisimisi/fotovisimisiStore.js'

const createStore = () => {
  return new Vuex.Store({
    // jangan lupa ditambah setiap kali nambah crud
    modules: {
      infoumumStore,
      profilStore,
      galleryStore,
      advantageStore,
      advantagearmadaStore,
      visiStore,
      misiStore,
      mottoStore,
      pesanStore,
      carouselStore,
      logoutamaStore,
      headerStore,
      infosubscribeStore,
      mediasosialStore,
      logogroupStore,
      armadaStore,
      fotoarmadaStore,
      fotovisimisiStore
    },
    state: {
      user: null,
      role:'',
      siswa:'',
      tahunAjaran:'',
      loadingstatus: false
    },
    getters: {
      loadingstatus: (state, getters) => {
        return state.loadingstatus
      },
      activetahunAjaran: (state) => {
        return state.tahunAjaran
      },
      activeUser: (state) => {
        return state.user
      },
      activeRole: (state) =>{
        return state.role
      },
      activeSiswa: (state)=>{
        return state.siswa
      }
    },
    mutations: {
      setLoading(state, payload) {
        state.loadingstatus = payload
      },
      setTahunAjaran (state, payload) {
        state.tahunAjaran = payload
      },
      setUser (state, payload) {
        state.user = payload
      },
      setRole (state, payload) {
        state.role = payload
      },
      setSiswa(state, payload){
        state.siswa = payload
      }
    },
    actions: {
      
      autoSignIn ({ commit }, payload) {
        commit('setUser', payload)
      },

      signInWithGoogle ({ commit }) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut ({ commit }) {
        auth.signOut().then(() => {
          commit('setUser', null)
          commit('setRole', null)
        }).catch(err => console.log(error))
      },

      roleUser ({ commit }, payload) {
        commit('role_muta', payload)
      }

    }
  })
}

export default createStore
