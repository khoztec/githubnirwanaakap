<template>
    <v-img src="/headertest.jpg" height="480" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
        <v-layout
        align-center
        column
        justify-center
        class="shadowtext overlay2"
        >
            <h1 class="display-2 font-weight-bold mb-3 text-xs-center">Kontak</h1>
            <h4 class="title align-center text-xs-center">Test</h4>
        </v-layout>
    </v-img>
</template>

<style scoped>
.nolink {
    text-decoration: none
}
.shadowtext{
  text-shadow: 1px 1px 4px #ce0e0e;
  color: #ffffff
}
.overlay {
  background-color: #dd63127a !important;
}
.overlay2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>