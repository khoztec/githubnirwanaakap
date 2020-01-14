import { auth, db2 } from '@/services/fireinit.js'
import moment from 'moment'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      var tahun1 = moment().year()
     var tahun2  = tahun1 + 1
      store.commit('setTahunAjaran', tahun1+'-'+tahun2)
      // console.log('ini di fireauth ')
      if (user != null) {
        // console.log('user not null')
        store.commit('setUser', user)
        // console.log({nama: 'email', data:user.email})
        var userdataRef = db2.collection('users').doc(user.uid)
        userdataRef.get().then((doc)=>{
          if (doc.exists) {
            // console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
          }


        store.commit('setRole', doc.data().role )
          store.commit('setSiswa', doc.data())
        })
    
      }
     
      resolve()
    })
  })
}
