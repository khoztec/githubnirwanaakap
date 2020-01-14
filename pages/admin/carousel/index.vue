<template>
    <section>
        <v-container grid-list-lg fluid>
        <v-layout row justify-center>
            <v-dialog v-model="adddialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                <span class="headline">Tambah Carousel</span>
                </v-card-title>
                <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                v-model="judul_carousel"
                                box
                                label="Judul"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <input type="file" name="image" :src="image" @change="onFileChange">
                            <img :src="image" width="100%"/>
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
        <v-card color="light-blue darken-4" dark>
            <v-card-title class="headline font-weight-bold">
                Carousel
            </v-card-title>
        </v-card>
        <v-card color="blue-grey lighten-4" light>
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
            :items="carousel"
            :search="search"
            >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.judul_carousel }}</td>
                <td style="padding:10px 0px"><img :src=props.item.image height="80px"></td>
                <td>
                    <v-layout row justify-center>
                        <v-btn small fab color="warning" @click="$router.push('/admin/carousel/'+ props.item.id)"><v-icon small>search</v-icon></v-btn>
                        <v-dialog max-width="600" v-model="deletedialog">
                        <v-btn small fab color="error" slot="activator" @click="onDelCarousel(props.item)"><v-icon small>mdi-delete</v-icon>
                        </v-btn>
                            <v-card>
                            <v-card-title class="headline">Delete Carousel ?</v-card-title>
                            <v-card-text>Judul : {{onDel.judul_carousel}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click.native="deletedialog = false">Cancel</v-btn>
                                <v-btn color="red darken-4" flat="flat" @click.native="deletedialog = false, deletecarousel()">Delete</v-btn>
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
  import {auth2,db2} from '@/services/fireinit.js'
  import FileUpload from 'vue-upload-component'
  import firebase, {storageRef} from '@/services/fireinit.js'
  const carouselRef = db2.collection('carousel');
  export default {
    layout: 'admin',
    computed: {
      carousel : function (){
        return this.$store.getters['carouselStore/activeCarousel']
      }
    },
    data() {
      return {
        search: '',
        image: '',
        url: '',
        imageUrl: '',
        imageName: '',
        judul_carousel:'',
        image: '',
        deletedialog: false,
        editdialog: false,
        showdialog: false,
        adddialog: false,
        headers: [
          { text: 'Judul', value: 'judul_carousel' },
          { text: 'Image', value: 'image' },
          { text: 'Actions', value: '' }
        ],
        nameRules: [
        v => !!v || 'Name is required',
        ],
        editItem : {
          judul_carousel:'',
          image: ''
        },
        onDel: {
          id : '',
          judul_carousel:'',
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
    methods: {
        listData()  {
         this.$store.dispatch('carouselStore/actionListCarousel')
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
            return;
            this.createImage(files[0]);
            // console.log(e)
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
        },
        addData()   {
            var newItem = {
            'judul_carousel': this.judul_carousel,
            'image': this.image,
            'url'  : this.url
            }
            this.$store.dispatch('carouselStore/actionSaveCarousel', newItem).
            then(()=>   {
                this.adddialog = false
                })
        },
        inputFile(newFile, oldFile) {
            var self = this
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            var imagesRef = storageRef.child('images/'+text);

            imagesRef.putString(this.image, 'data_url').then(function(snapshot) {
                imagesRef.getDownloadURL().then(function(url) {
                self.url = url
                })
        })
    },
        onDelCarousel(items) {
            // console.log(items)
            this.onDel.id = items.id
            this.onDel.judul_carousel = items.judul_carousel
            this.onDel.image = items.image            
        },
        deletecarousel() {
            this.$store.dispatch('carouselStore/actionDeleteCarousel', this.onDel)
        },
        editData(data){
            var self = this
            self.editItem.id = data.id
            self.editItem.judul_carousel = data.judul_carousel
            self.editItem.desc_carousel = data.desc_carousel
        },
        updateData(){
            this.$store.dispatch('carouselStore/actionUpdateCarousel', this.editItem)
        },
        ambilslug(){
            this.id = this.$route.params.carousel 
        }
    }
  }
</script>