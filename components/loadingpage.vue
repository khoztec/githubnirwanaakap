<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        loader="dots"
        color="#0E3F97"
        :height="height"

        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    </div>
</template>
 
<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        computed: {
            isLoading : function(){
                return this.$store.getters['loadingstatus']
            }
        },
        data() {
            return {
                // isLoading: false,
                fullPage: true,
                height:150,
                width:150
            }
        },
        components: {
            Loading
        },
        methods: {
            doAjax() {
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },5000)
            },
            onCancel() {
              console.log('User cancelled the loader.')
            }
        }
    }
</script> 