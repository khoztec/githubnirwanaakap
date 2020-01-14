import { auth, db2 } from '@/services/fireinit.js'
import FileUpload from 'vue-upload-component'
import firebase, {storageRef} from '@/services/fireinit.js'
import moment from 'moment'
// import _ from 'lodash'

const logogroupRef = db2.collection('logogroup');

const state = {
    logogroup: [],
    nama_logo: '',
    image: ''
}
// getters
const getters = {
    activeLogogroup: (state, getters) => {  
        return state.logogroup;
    },
}

// actions
const actions = {
    actionUpdateLogogroup({commit, dispatch}, payload){
        var self = this
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logogroupRef.doc(payload.id).delete()
                .then(()=>{
                    var id = payload.no_logo.replace(/\s/g, '').toLowerCase();
                    var logogroupRef1 = logogroupRef.doc(id)
                    // var id bikin samarata semua value, tanpa spasi dan lowercase
                    // console.log('ini di action')
                    logogroupRef1.get().then((docSnapshot) => {
                    if (!docSnapshot.exists) {
                        logogroupRef1.set({
                        no_logo: payload.no_logo,
                        judul_logo: payload.judul_logo,
                        isi_logo: payload.isi_logo,
                        selected: false
                        })

                        var newItem = { 
                            id: id, 
                            no_logo: payload.no_logo,
                            judul_logo: payload.judul_logo,
                            isi_logo: payload.isi_logo
                        }
                        commit('saveLogogroup', newItem)
                        commit('resetLogogroup', newItem)
                        dispatch('actionListLogogroup')
                    }else{
                        self.$toast.error('data exist')
                    }
                    });
                    resolve()
                })
                resolve()
                this.$toast.success('Logogroup '+ payload.judul_logo + ' berhasil diubah')

            }, 1000)
        })

    },

    // actionInputFile({commit, dispatch}, payload) {
    //     console.log(payload)

    //     // var self = this
    //     // var text = "";
    //     // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     // var image = payload.image;
    //     // for (var i = 0; i < 5; i++){
    //     //   text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     // }

    //     // var imagesRef = storageRef.child('images/'+text);
        
    //     // imagesRef.putString(this.image, 'data_url').then(function(snapshot) {
    //     //     imagesRef.getDownloadURL().then(function(url) {
    //     //     self.url = url
    //     //     })
    //     // });
    // },

    actionSaveLogogroup({ commit }, payload) {
        // commit ngaktifin fungsi dibawahnya sesama action
        // payload untuk ambil bawaan dari save method dari index
        // pakai titik untuk manggil variabel payload
        var self = this
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var id = payload.nama_logo.replace(/\s/g, '').toLowerCase();
                var logogroupRef1 = logogroupRef.doc(id)
                // var id bikin samarata semua value, tanpa spasi dan lowercase
                // console.log('ini di action')
                logogroupRef1.get().then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    logogroupRef1.set({
                    nama_logo: payload.nama_logo,
                    image : payload.url,
                    selected: false
                    })
                    console.log(logogroupRef1)
                    var newItem2 = { 
                        id: id,
                        nama_logo: payload.nama_logo,
                        image: payload.url,
                    }
                    commit('saveLogogroup', newItem2)
                    self.$toast.success('Logogroup '+ payload.nama_logo + ' berhasil ditambah')
                }else{
                    self.$toast.error('data exist')
                }
                });
                resolve()

            }, 1000)
        })
    },

    actionListLogogroup({commit}, payload){
        commit('resetLogogroup')

        return new Promise((resolve, reject) => {
            // console.log('action list infoumum')
            setTimeout(() => {
                logogroupRef.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = {
                            id: doc.id,
                            nama_logo: doc.data().nama_logo,
                            image: doc.data().image
                        }
                        commit('saveLogogroup', data)
                    });
                });

            }, 1000)
        })
    },
    actionDeleteLogogroup({ commit, dispatch }, payload) {
        console.log(payload)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                logogroupRef.doc(payload.id).delete()
                commit('resetLogogroup')
                dispatch('actionListLogogroup')
                this.$toast.error('Logogroup '+ payload.judul_logo + ' berhasil dihapus')
                resolve()
            }, 500)
        })
    },
    actionInputKode({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                var text = ''
                var possible = payload.lemparan
                for (var i = 0; i < 5; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                //   console.log(text)

                return text;
            }, 500)
        })
    },

    actionInputFile({ commit, dispatch }, payload) {
      
    //   var buatKode = dispatch('actionInputKode', {lemparan: 'ABCDSGJGSDHJHGSJH'})
    //   console.log(buatKode)

    // buatKode.then((query)=>{
    //     console.log(query)
    // })
        var self = this
        
        var text = payload.nama_logo;
        var imagesRef = storageRef.child('images/'+text);
        // console.log(payload)
        imagesRef.putString(payload.image, 'data_url').then(function(snapshot) {
            // console.log(snapshot)
            imagesRef.getDownloadURL().then(function(url) {
            // self.url = url,
            // self.$toast.success('Gambar berhasil diupload')

            //=============== Save Database ===============
            var id = payload.nama_logo.replace(/\s/g, '').toLowerCase();
            var logogroupRef1 = logogroupRef.doc(id)
            logogroupRef1.get().then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    logogroupRef1.set({
                    nama_logo: payload.nama_logo,
                    image : url,
                    selected: false
                    })
                    console.log(logogroupRef1)
                    var newItem2 = { 
                        id: id,
                        nama_logo: payload.nama_logo,
                        image: url,
                    }
                    commit('saveLogogroup', newItem2)
                    self.$toast.success('Logogroup '+ payload.nama_logo + ' berhasil ditambah')
                }else{
                    self.$toast.error('data exist')
                }
                })

                //=============== Save Database ===============

            })
        });  
    }
}

// mutations
const mutations = {
    saveLogogroup: (state, payload) => {
        state.logogroup.push(payload) 
    },
    resetLogogroup: (state)=>{
        state.logogroup = []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}