import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const mediasosialRef = db2.collection('mediasosial');
const state = {
    mediasosial: [],
    nama_medsos: '',
    link_medsos: '',
    icon_medsos: '',
    warna_medsos: '',
}
// getters
const getters = {
    activeMediasosial: (state, getters) => {  
        return state.mediasosial;
    },
}

// actions
const actions = {
    actionUpdateMediasosial({commit, dispatch}, payload){
        var self = this
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mediasosialRef.doc(payload.id).delete()
                .then(()=>{
                    var id = payload.nama_medsos.replace(/\s/g, '').toLowerCase();
                    var mediasosialRef1 = mediasosialRef.doc(id)
                    // var id bikin samarata semua value, tanpa spasi dan lowercase
                    // console.log('ini di action')
                    mediasosialRef1.get().then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        mediasosialRef1.set({
                        nama_medsos: payload.nama_medsos,
                        link_medsos: payload.link_medsos,
                        icon_medsos: payload.icon_medsos,
                        warna_medsos: payload.warna_medsos,
                        selected: false
                        })

                        var newItem = { 
                            id: id, 
                            nama_medsos: payload.nama_medsos,
                            link_medsos: payload.link_medsos,
                            icon_medsos: payload.icon_medsos,
                            warna_medsos: payload.warna_medsos,
                        }
                        commit('saveMediasosial', newItem)
                        commit('resetMediasosial', newItem)
                        dispatch('actionListMediasosial')
                    }else{
                        self.$toast.error('data exist')
                    }
                    });
                    resolve()
                })
                resolve()
                this.$toast.success('Mediasosial '+ payload.nama_medsos + ' berhasil diubah')

            }, 1000)
        })

    },
  
    actionSaveMediasosial({ commit }, payload) {
        // commit ngaktifin fungsi dibawahnya sesama action
        // payload untuk ambil bawaan dari save method dari index
        // pakai titik untuk manggil variabel payload
        var self = this
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var id = payload.nama_medsos.replace(/\s/g, '').toLowerCase();
                var mediasosialRef1 = mediasosialRef.doc(id)
                // var id bikin samarata semua value, tanpa spasi dan lowercase
                // console.log('ini di action')
                mediasosialRef1.get().then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    mediasosialRef1.set({
                    nama_medsos: payload.nama_medsos,
                    link_medsos: payload.link_medsos,
                    icon_medsos: payload.icon_medsos,
                    warna_medsos: payload.warna_medsos,
                    selected: false
                    })

                    var newItem = { 
                        id: id,
                        nama_medsos: payload.nama_medsos,
                        link_medsos: payload.link_medsos,
                        icon_medsos: payload.icon_medsos,
                        warna_medsos: payload.warna_medsos,
                    }
                    commit('saveMediasosial', newItem)
                    self.$toast.success('Media Sosial '+ payload.nama_medsos + ' berhasil ditambah')
                }else{
                    self.$toast.error('data exist')
                }
                });
                resolve()

            }, 1000)
        })
    },

    actionListMediasosial({commit}, payload){
        commit('resetMediasosial')

        return new Promise((resolve, reject) => {
            // console.log('action list mediasosial')
            setTimeout(() => {
                mediasosialRef.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = {
                            id: doc.id,
                            nama_medsos: doc.data().nama_medsos,
                            link_medsos: doc.data().link_medsos,
                            icon_medsos: doc.data().icon_medsos,
                            warna_medsos: doc.data().warna_medsos
                        }
                        commit('saveMediasosial', data)
                    });
                });

            }, 1000)
        })
    },
    actionDeleteMediasosial({ commit, dispatch }, payload) {
        console.log(payload)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mediasosialRef.doc(payload.id).delete()
                commit('resetMediasosial')
                dispatch('actionListMediasosial')
                this.$toast.error('Media Sosial '+ payload.nama_medsos + ' berhasil dihapus')
                resolve()
            }, 500)
        })
    }
}

// mutations
const mutations = {
    saveMediasosial: (state, payload) => {
        state.mediasosial.push(payload) 
    },
    resetMediasosial: (state)=>{
        state.mediasosial = []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}