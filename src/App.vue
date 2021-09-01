<template>
  <v-app>
    <Header></Header>

    <router-view />
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "@/Layout/Header/Header.vue";
import Footer from "@/Layout/Footer/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>
