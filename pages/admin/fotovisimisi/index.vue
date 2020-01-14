<template>
    <section>
        <v-card color="orange lighten-4">
            <v-card-title class="headline font-weight-bold">
                Foto Visi dan Misi
            </v-card-title>
        </v-card>
        <v-card>
            <v-card-title class="headline font-weight-bold">
            <v-dialog v-model="dialogform" max-width="600" transition="dialog-bottom-transition">
            <v-btn slot="activator" dark color="light-blue darken-4" light>Tambah Foto</v-btn>
            <v-card>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card light>
                      <v-card-text class="text-xs-center font-weight-bold">
                        Tambah Foto Visi/Misi
                      </v-card-text>
                      <v-card-text>
                      <v-container grid-list-md>
                          <v-layout wrap>
                              <v-flex xs6>
                                  <v-btn
                                  @click.native="selectFile"
                                  v-if="!uploadEnd && !uploading"
                                  color="green darken-2"
                                  dark
                                  block
                                  >
                                  Upload Foto (Visi)
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
                                  required
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
                                          class="d-inline-block"
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
                              <v-flex xs6>
                                  <v-btn
                                  @click.native="selectFileMisi"
                                  v-if="!uploadEndMisi && !uploadingMisi"
                                  color="green darken-2"
                                  dark
                                  >
                                  Upload Foto (Misi)
                                      <v-icon
                                      right
                                      aria-hidden="true">
                                      add_a_photo
                                      </v-icon>
                                  </v-btn>
                                  <input
                                  id="filesMisi"
                                  type="file"
                                  name="file"
                                  ref="uploadInputMisi"
                                  accept="image/*"
                                  :multiple="false"
                                  style="display:none"
                                  @change="detectFilesMisi($event)" />
                                      <v-progress-circular
                                      v-if="uploadingMisi && !uploadEndMisi"
                                      :size="50"
                                      :width="10"
                                      :rotate="360"
                                      :value="progressUploadMisi"
                                      color="primary">
                                      </v-progress-circular>
                                      <img
                                          v-if="uploadEndMisi"
                                          :src="downloadURLMisi"
                                          width="100%" />
                                      <div v-if="uploadEndMisi">
                                      <v-btn
                                          class="ma-0"
                                          dark
                                          small
                                          color="error"
                                          @click="deleteImageMisi()"
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
                      <v-btn color="red darken-1" flat @click.native="dialogform = false">cancel</v-btn>
                      <v-btn color="green darken-1" flat @click.native="addData">Save</v-btn>
                      <v-spacer></v-spacer>
                      </v-card-actions>
                  </v-card>
                      </v-flex>
                  </v-layout>
            </v-card>
          </v-dialog>

            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="fotovisimisi"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.nama_fotovisimisi }}</td>
                <td style="padding:10px 0px"><img :src=props.item.image_visi height="80px"></td>
                <td style="padding:10px 0px"><img :src=props.item.image_misi height="80px"></td>
                <td>
                    <v-layout row justify-center>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelFotovisimisi(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Fotovisimisi ?</v-card-title>
                            <v-card-text>Nama Fotovisimisi : {{onDel.nama_fotovisimisi}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletefotovisimisi()">Delete</v-btn>
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
    </section>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import {auth2,db2} from '@/services/fireinit.js'
  import FileUpload from 'vue-upload-component'
  import firebase, {storageRef} from '@/services/fireinit.js'
  export default {
    layout: 'admin',
    computed: {
      fotovisimisi : function (){
        return this.$store.getters['fotovisimisiStore/activeFotovisimisi']
      }
    },
    data() {
      return {
            namaurl: '',
            progressUpload: 0,
            fileName: '',
            uploadTask: '',
            uploading: false,
            uploadEnd: false,
            downloadURL: '',
            image: '',
            url: '',
            imageUrl: '',
            imageName: '',
            progressUploadMisi: 0,
            fileNameMisi: '',
            uploadTaskMisi: '',
            uploadingMisi: false,
            uploadEndMisi: false,
            downloadURLMisi: '',
            imageMisi: '',
            urlMisi: '',
            imageUrlMisi: '',
            imageNameMisi: '',
            nama_fotovisimisi: 'Visi Misi',
            headers: [
                { text: 'Nama Fotovisimisi', value: 'nama_fotovisimisi' },
                { text: 'Foto (Visi)', value: 'image_visi' },
                { text: 'Foto (Misi)', value: 'image_misi' },
                { text: 'Actions', value: '' }
            ],
            search: '',
            deletedialog: false,
            editdialog: false,
            showdialog: false,
            dialogform: false,
            onDel: {
                nama_fotovisimisi: ''
            },
      }
    },
    mounted(){
        this.listFotovisimisi()
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
      },
      uploadTaskMisi: function () {
        this.uploadTaskMisi.on('state_changed', sp => {
            this.progressUploadMisi = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
        },
        null,
        () => {
            this.uploadTaskMisi.snapshot.ref.getDownloadURL().then(downloadURLMisi => {
            this.uploadEndMisi = true
            this.downloadURLMisi = downloadURLMisi
            this.$emit('downloadURLMisi', downloadURLMisi)
            })
        })
      }
    },
    methods: {
        changeImg(imageData) {
            console.log(imageData)
        },
        selectFile () {
            this.$refs.uploadInput.click()
        },
        selectFileMisi () {
            this.$refs.uploadInputMisi.click()
        },
        detectFiles (e) {
            let fileList = e.target.files || e.dataTransfer.files
            Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
            })
        },
        detectFilesMisi (e) {
            let fileList = e.target.files || e.dataTransfer.files
            Array.from(Array(fileList.length).keys()).map(x => {
                this.uploadMisi(fileList[x])
            })
        },
        upload (file) {
            var nama_fotovisimisi = this.nama_fotovisimisi
            this.fileName = file.name
            this.uploading = true
            this.uploadTask = storageRef.child('images/visimisi/' + nama_fotovisimisi + '(Visi)').put(file)
        },
        uploadMisi (file) {
            var nama_fotovisimisi = this.nama_fotovisimisi
            this.fileNameMisi = file.name
            this.uploadingMisi = true
            this.uploadTaskMisi = storageRef.child('images/visimisi/' + nama_fotovisimisi + '(Misi)').put(file)
        },
        deleteImage () {
            var nama_fotovisimisi = this.nama_fotovisimisi
            storageRef.child('images/visimisi/' + nama_fotovisimisi + '(Visi)').delete()
            .then(() => {
                this.uploading = false
                this.uploadEnd = false
                this.downloadURL = ''
            })
            .catch((error) => {
            console.error(`file delete error occured: ${error}`)
            })
        },
        deleteImageMisi () {
            var nama_fotovisimisi = this.nama_fotovisimisi
            storageRef.child('images/visimisi/' + nama_fotovisimisi + '(Misi)').delete()
            .then(() => {
                this.uploadingMisi = false
                this.uploadEndMisi = false
                this.downloadURLMisi = ''
            })
            .catch((error) => {
            console.error(`file delete error occured: ${error}`)
            })
        },
        listFotovisimisi()  {
            this.$store.dispatch('fotovisimisiStore/actionListFotovisimisi')
        },
        onDelFotovisimisi(items) {
                this.onDel.id = items.id
                this.onDel.nama_fotovisimisi = items.nama_fotovisimisi
            },
        deletefotovisimisi() {
                this.$store.dispatch('fotovisimisiStore/actionDeleteFotovisimisi', this.onDel)
                this.deletedialog = false
            },
        addData()   {
            var self = this
                const newitem2 = {
                nama_fotovisimisi: self.nama_fotovisimisi,
                image_visi: self.downloadURL,
                image_misi: self.downloadURLMisi,
                }
                console.log(newitem2)
                    this.$store.dispatch('fotovisimisiStore/actionSaveFotovisimisi', newitem2)
                    this.dialogform = false
            }
    }
  }
</script>