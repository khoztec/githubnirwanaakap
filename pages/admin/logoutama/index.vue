<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                <span class="headline">Tambah Logo Utama</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-btn
                                @click.native="selectFile"
                                v-if="!uploadEnd && !uploading"
                                color="primary"
                                block>
                                    Choose Picture
                                    <v-icon
                                    right
                                    aria-hidden="true">
                                    add_a_photo
                                    </v-icon>
                                </v-btn>
                                <input
                                id="files"
                                type="file"
                                name="file"
                                ref="uploadInput"
                                accept="image/*"
                                :multiple="false"
                                style="display:none"
                                @change="detectFiles($event)" />
                                <v-progress-circular
                                    v-if="uploading && !uploadEnd"
                                    :size="50"
                                    :width="10"
                                    :rotate="360"
                                    :value="progressUpload"
                                    color="primary">
                                </v-progress-circular>
                                <img
                                    v-if="uploadEnd"
                                    :src="downloadURL"
                                    width="100%" />
                                <div v-if="uploadEnd">
                                    <v-btn
                                    class="ma-0"
                                    dark
                                    small
                                    color="error"
                                    @click="deleteImage()"
                                    >
                                    Delete
                                    </v-btn>
                                </div>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="adddialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="addData">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-layout>
        <v-card dark color="light-blue darken-4">
            <v-card-title class="headline font-weight-bold">
                Logo Utama
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4">
            <v-card-title class="headline font-weight-bold">
            <v-btn large block color="primary" @click="adddialog = true">
                Tambah
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="logoutama"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_logoutama }}</td>
                <td style="padding:10px 0px"><img :src=props.item.image height="80px"></td>
                <td>
                    <v-layout row justify-center>
                        <v-btn small fab color="warning" @click="$router.push('/admin/logoutama/'+ props.item.id)"><v-icon small>search</v-icon></v-btn>
                        <v-dialog max-width="600" v-model="editdialog">
                        <v-tooltip slot="activator" left>
                            <v-btn color="success" fab small dark slot="activator" @click="editData(props.item)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                                <span>edit</span>
                            </v-tooltip>
                                <div class="hidden-sm-and-down">Edit</div>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Edit Logoutama</span>
                                </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Nama Logoutama" required v-model="editItem.nama_logoutama"></v-text-field>
                                                <v-btn
                                                    @click.native="selectFile"
                                                    v-if="!uploadEnd && !uploading"
                                                    color="primary"
                                                    block>
                                                    Choose Picture
                                                <v-icon
                                                    right
                                                    aria-hidden="true">
                                                    add_a_photo
                                                </v-icon>
                                                </v-btn>
                                            <input
                                                id="files"
                                                type="file"
                                                name="file"
                                                ref="uploadInput"
                                                accept="image/*"
                                                :multiple="false"
                                                style="display:none"
                                                @change="detectFiles($event)" />
                                            <v-progress-circular
                                                v-if="uploading && !uploadEnd"
                                                :size="50"
                                                :width="10"
                                                :rotate="360"
                                                :value="progressUpload"
                                                color="primary">
                                            </v-progress-circular>
                                            <img
                                            v-if="uploadEnd"
                                            :src="editItem.image"
                                            width="100%" />
                                            <div v-if="uploadEnd">
                                                <v-btn
                                                    class="ma-0"
                                                    dark
                                                    small
                                                    color="error"
                                                    @click="deleteImage()"
                                                >
                                                Delete
                                                </v-btn>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="editdialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="editdialog= false, updateData()">Save</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelLogoutama(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Logoutama ?</v-card-title>
                            <v-card-text>Logoutama : {{onDel.nama_logoutama}}</v-card-text>
                            <img :src=onDel.image width="75%">
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletelogoutama()">Delete</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        </v-layout>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
            </v-data-table>
        </v-card>
        </v-container>
    </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth,db2} from '@/services/fireinit.js'
  import FileUpload from 'vue-upload-component'
  import firebase, {storageRef} from '@/services/fireinit.js'
  const logoutamaRef = db2.collection('logoutama');
  export default {
    layout: 'admin',
    computed: {
      logoutama : function (){
        return this.$store.getters['logoutamaStore/activeLogoutama']
      }
    },
    data() {
      return {
        search: '',
        image: '',
        url: '',
        imageUrl: '',
        imageName: '',
        nama_logoutama:'logonirwana',
        image: '',
        progressUpload: 0,
        fileName: '',
        uploadTask: '',
        uploading: false,
        uploadEnd: false,
        downloadURL: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Nama Logoutama', value: 'nama_logoutama' },
          { text: 'Image', value: 'image' },
          { text: 'Actions', value: '' }
        ],
        nameRules: [
        v => !!v || 'Name is required',
        ],
        editItem : {
          nama_logoutama:'',
          image: ''
        },
        onDel: {
          id : '',
          nama_logoutama:'',
          image: ''
        },
        detailurl: {
          id : '',
        },
        files: []
      }
    },
    mounted(){
        this.listData()
    },
    watch: {
    uploadTask: function () {
        this.uploadTask.on('state_changed', sp => {
            this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
        },
        null,
        () => {
            this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true
            this.downloadURL = downloadURL
            this.$emit('downloadURL', downloadURL)
            })
        })
      }
    },
    methods: {
        changeImg(imageData) {
            // console.log(imageData)
        },
        selectFile () {
            this.$refs.uploadInput.click()
        },
        detectFiles (e) {
            let fileList = e.target.files || e.dataTransfer.files
            Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
            })
        },
        upload (file) {
            var nama_logoutama = this.editItem.nama_logoutama
            this.fileName = file.name
            this.uploading = true
            this.uploadTask = storageRef.child('images/' + nama_logoutama).put(file)
        },
        deleteImage () {
            var nama_logoutama = this.nama_logoutama
            storageRef.child('images/' + this.nama_logoutama).delete()
            .then(() => {
                this.uploading = false
                this.uploadEnd = false
                this.downloadURL = ''
            })
            .catch((error) => {
            console.error(`file delete error occured: ${error}`)
            })
        },
        listData()  {
         this.$store.dispatch('logoutamaStore/actionListLogoutama')
        },
        addData()   {
            var newItem = {
            'nama_logoutama': this.nama_logoutama,
            'image': this.downloadURL
            }
            this.$store.dispatch('logoutamaStore/actionSaveLogoutama', newItem).
            then(()=>   {
                this.adddialog = false
                })
        },
        onDelLogoutama(items) {
            // console.log(items)
            this.onDel.id = items.id
            this.onDel.nama_logoutama = items.nama_logoutama
            this.onDel.image = items.image            
        },
        deletelogoutama() {
            this.$store.dispatch('logoutamaStore/actionDeleteLogoutama', this.onDel)
        },
        editData(data){
            var self = this
            self.editItem.id = data.id
            self.editItem.nama_logoutama = data.nama_logoutama
            self.editItem.image = data.image
        },
        updateData(){
            this.$store.dispatch('logoutamaStore/actionUpdateLogoutama', this.editItem)
        },
        ambilslug(){
            this.id = this.$route.params.logoutama 
        }
    }
  }
</script>

<style>
    .progress-bar {
        margin: 10px 0;
    }
    input [type="file"] {
        position: absolute;
        clip: rect(0,0,0,0);
        visibility: hidden;
    }
</style>