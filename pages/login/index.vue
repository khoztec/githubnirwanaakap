<template>

  <v-layout row wrap>
    <v-flex xs12 text-xs-center>
      <v-img src="logoma.png" width="10%" class="d-inline-block"></v-img>
      <div class="headline font-weight-bold">
        Nirwana Bus
      </div>
    </v-flex>
    <v-flex text-xs-center xs12 sm6 offset-sm3>
    <v-card>
        <v-toolbar dark>
              <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
      <v-container>
      <v-layout align-center justify-center>
      <v-flex xs12>
        
      </v-flex>
      </v-layout>

      <v-text-field
        name= "formemail"
        label="E-mail"
        v-model="formemail"
        required
      ></v-text-field>
      <v-text-field
            name="input-10-1"
            label="Enter your password"
            v-model="password"
            min="8"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            @click:append="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            counter
          ></v-text-field>
      <v-btn class="signIn mb-2" color="success" @click.native="emailLogin()">Sign In</v-btn>
      <v-btn class="signIn mb-2" color="error" @click.native="logout">Log out</v-btn>

       <!--v-btn  dark large color="blue" @click="googleSignUp()">
      Google
    </v-btn -->
     <!-- <v-btn class="signIn mb-2" color="indigo" dark @click.native="googleSignUp">Google Sign In</v-btn> -->

     <!-- REGISTER BUTTON -->
     <!-- <nuxt-link class="adminNavRoute" style="{text-decoration: none}" to="/register" dark><v-btn color="error" dark>
     Register
     </v-btn></nuxt-link> -->

     </v-container>
     
    </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import {auth,db2} from '@/services/fireinit.js'
// var role_user = DB.ref('role_users');
import moment from 'moment'
import _ from 'lodash'


export default {
  layout: "registerlayout",
  data () {
    return {
      label: 'Data sedang di proses . . .',
      show: false,
      valid: true,
      uid:'',
      // formPassword: '',
       e1: true,
      password: '',
      formemail: '',
      emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    }
  },

  methods: {
    logout(){
      
      this.$store.dispatch('signOut').then(() => {
        alert('yakin keluar')
        // this.$router.push('/login')
        location.href = '/login';
  })
    },
    emailLogin () {
      var vm = this      
      const email = vm.formemail
      // if(!cek){
        // console.log('in di method login')
        auth.signInWithEmailAndPassword(email, vm.password)
              .then((data)=>{
              vm.$store.commit('setUser', data)
              // console.log('ini udh masuk')  
              vm.$router.push('/admin/home')
              }).catch((error)=>{
                // console.log('ini errors')
                this.$toast.error(error.message)
              })
    },

    
    googleSignUp () {
      
      this.$store.dispatch('signInWithGoogle')
      
      // role_user.push('alip')
      // .then(() => {

      //   // console.log('inside then statement on login');
      // }).catch((e) => {
      //   // console.log(e.message);
      // })
    }
  }
}
</script>
