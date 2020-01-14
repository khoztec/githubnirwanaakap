<template>
                <v-flex xs12 text-xs-center sm6 offset-sm3>
                <loadingpage></loadingpage>
                    <v-card>
                        <v-card>
                          <v-form
                        ref="formlogin"
                        v-model="validlogin"
                        lazy-validation
                      >
                      <v-flex xs12 text-xs-center>
                          <v-img src="logoma.png" width="10%" class="d-inline-block"></v-img>
                          <div class="headline font-weight-bold">
                            MAN 1 Kota Tangerang
                          </div>
                        </v-flex>
                            <v-card-title>
                              <span class="headline">Login Calon Siswa</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                
                                  <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="newItem2.email_user" :rules="emailRules" label="Email *" required></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    
                                     <v-text-field
                                            v-model="newItem2.password"
                                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="Password"
                                            hint="At least 8 characters"
                                            counter
                                            @click:append="show1 = !show1"
                                          ></v-text-field>
                                  </v-flex>
                                
                                </v-layout>
                              </v-container>
                              <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn outline color="orange darken-1"  dark @click="back()">Kembali</v-btn>
                                <v-btn
                                outline
                                        :disabled="!validlogin"
                                        color="primary"
                                        @click="validatelogin()"
                                      >
                                     Login
                                  </v-btn>
                            </v-card-actions>
                            </v-form>
                          </v-card>
                        <v-container fluid grid-list-sm>
                         
                          <v-btn round @click="dialogdaftar = true" color="blue darken-1" dark>Daftar Dengan email</v-btn>
                          
                          <v-btn round @click="dialogreset = true" color="green darken-1" dark>Reset Password</v-btn>

                           
                        </v-container>
                        <v-card-actions>
                          

                          
                        </v-card-actions>
                    </v-card>
                 
                 <v-dialog v-model="dialogdaftar" persistent max-width="600px">
                          <v-card>
                          <v-form
                        ref="formdaftar"
                        v-model="validdaftar"
                        lazy-validation
                      >
                            <v-card-title>
                              <span class="headline">Pendaftaran Calon Siswa</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="newItem2.nama_user" :rules="nameRules" label="Nama *" required></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="newItem2.nisn_user" :rules="nisnRules" :counter="10" label="NISN *" required></v-text-field>
                                  </v-flex>
                                     <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="newItem2.email_user" :rules="emailRules" label="Email *" required></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 sm12 md12>
                                    
                                     <v-text-field
                                            v-model="newItem2.password"
                                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="Password"
                                            hint="At least 8 characters"
                                            counter
                                            @click:append="show1 = !show1"
                                          ></v-text-field>
                                  </v-flex>
                                
                                </v-layout>
                              </v-container>
                              <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="orange darken-1"  dark @click="dialogdaftar = false">Close</v-btn>
                                <v-btn
                                        :disabled="!validdaftar"
                                        color="success"
                                        @click="validatedaftar()"
                                      >
                                     Save
                                  </v-btn>
                            </v-card-actions>
                            </v-form>
                          </v-card>
        
      
                </v-dialog>

              
                <v-dialog v-model="dialogreset" persistent max-width="600px">
                          <v-card>
                          <v-form
                        ref="formreset"
                        v-model="validreset"
                        lazy-validation
                      >
                            <v-card-title>
                              <span class="headline">Reset Password Calon Siswa</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                
                                  <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="newItem2.email_user" :rules="emailRules" label="Email *" required></v-text-field>
                                  </v-flex>
                                  
                                
                                </v-layout>
                              </v-container>
                              <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="orange darken-1"  dark @click="dialogreset = false">Close</v-btn>
                                <v-btn
                                        :disabled="!validreset"
                                        color="success"
                                        @click="validatereset"
                                      >
                                     Reset Password
                                  </v-btn>
                            </v-card-actions>
                            </v-form>
                          </v-card>
                </v-dialog>
                </v-flex>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {auth,db2} from '@/services/fireinit.js'
import loadingpage from '@/components/loadingpage'
import firebase from 'firebase/app'
const usersRef = db2.collection('users')
export default {
    layout : 'registerlayout',
    components:{
      loadingpage
    },
    computed: {
      user : function (){
        return this.$store.getters['usersiswaStore/activeUsersiswa']
      }
    },
    data() {
      return {
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
       nameRules: [
        v => !!v || 'Name wajib diisi',
        v => (v && v.length >= 3) || 'nama harus lebih dari 3 angka'
      ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      nisnRules: [
        v => !!v || 'Name wajib diisi',
        v => (v && v.length >= 10) || 'no nisn 10 digit',
        v => (v && v.length <= 10) || 'no nisn 10 digit'
      ],
        validdaftar:false,
        dialogdaftar:false,
        validreset:false,
        dialogreset:false,
        validlogin:false,
        dialoglogin:false,

        search: '',
    
          newItem2 : {
          nama_user2:'',
          nisn_user2:'',
          email_user2:'',
          password:'',
          role:'siswa'
        },
  
     
      }
    },

    methods: {

      back(){
        this.$router.push('/')
      },

      resetpassword(){
        var self = this
        var email = self.newItem2.email_user
        self.$store.commit('setLoading', true)
        auth.sendPasswordResetEmail(email).then(function() {
        self.$toast.success('check email anda untuk merubah')
        self.dialogreset = false
        self.$store.commit('setLoading', false)
        }).catch(function(error) {
        self.$toast.error(error)
        self.dialog4 = false
        self.$store.commit('setLoading', false)
        });

      },

      loginemailpassword(){
        var self = this
        self.$store.commit('setLoading', true)
        var email = self.newItem2.email_user
        var password = self.newItem2.password
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            var user = auth.currentUser
            // // console.log(user.emailVerified)
              // if(user.emailVerified == false){
              //   self.$toast.error('harap cek email anda untuk verifikasi terlebih dahulu')
              //   auth.signOut().then(()=>{
              //       self.$store.commit('setUser',null)
              //       self.$store.commit('setRole',null)
              //       self.$router.push('/')
              //       // console.log('signout')    
              //   }).catch((error)=>{
              //     self.$toast.error(error.message)
              //   })
              
              // }else{
                self.$toast.success('sign in berhasil')
                self.$router.push('/user/home')
                self.$store.commit('setLoading', false)
              // }

            }).catch(function (error) {
              // Handle Errors here.
              self.$toast.error(error)
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              self.$store.commit('setLoading', false)
        });
      },
     
       validatedaftar () {
        if (this.$refs.formdaftar.validate()) {
          this.snackbar = true
           this.addemailuser()  
        }   

      },

       validatereset () {
        if (this.$refs.formreset.validate()) {
          this.snackbar = true
           this.resetpassword()  
        }   

      },
      validatelogin () {
        if (this.$refs.formlogin.validate()) {
          this.snackbar = true
          this.loginemailpassword()
        }
      },

      signout(){
        var self = this
        auth.signOut().then(function() {
          // Sign-out successful.
           self.$store.commit('setUser', null)
          self.$store.commit('setRole', null)
        }).catch(function(error) {
          // An error happened.
      });
      },
      addemailuser(){
        var self = this
        var email = self.newItem2.email_user
        self.$store.commit('setLoading', true)
        auth.createUserWithEmailAndPassword( email, self.newItem2.password).then((doc)=>{
          var user = auth.currentUser
          // console.log({nama: 'user di add email ', data: user.data})
           usersRef.doc(user.uid).set({
              nama: self.newItem2.nama_user,
              NISN : self.newItem2.nisn_user,
              role : 'siswa',
              email : email
            }).then(()=>{
              self.$store.commit('setUser', user)

              self.$store.commit('setRole', 'siswa' )
              self.$store.commit('setLoading', false)

            
            }).then(()=>{
              self.$router.push('/user/home')
            }).catch((error)=>{
              self.$toast.error(error)
              self.$store.commit('setLoading', false)
            })
      
        
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
              self.$toast.error(error)

            self.$store.commit('setLoading', false)
          });
      },
  //       
        
    }
}
</script>
