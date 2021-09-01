<template>
  <div>
    <SystemBar></SystemBar>
    <v-app-bar color="white accent-4" dense dark>
      <img
        class="mr-3"
        src="https://ms-mci.audencia.com/wp-content/uploads/2017/02/logo-AMARIS.png"
        height="40"
      />
      <v-spacer></v-spacer>
      <router-link
        :to="{ name: 'Search' }"
        text-decoration="none"
        style="margin: 10px"
      >
        <v-icon large color="orange darken-2"> mdi-magnify </v-icon>
      </router-link>

      <router-link
        :to="{ name: 'AddCandidate' }"
        text-decoration="none"
        style="margin: 10px"
      >
        <v-icon large color="orange darken-2"> mdi-account-plus </v-icon>
      </router-link>

      <v-btn icon>
        <router-link
          :to="{ name: 'AllCandidates' }"
          text-decoration="none"
          style="margin: 10px"
        >
          <v-icon large color="orange darken-2"> mdi-account-group </v-icon>
        </router-link>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import SystemBar from "@/Layout/SystemBar.vue";

export default {
  name: "Header",
  components: {
    SystemBar,
  },

  data: () => ({
    //
  }),
};
</script>
