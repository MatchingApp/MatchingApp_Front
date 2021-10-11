<template>
  <div>
    <v-app-bar color="white accent-4" dense dark>
      <img
        class="mr-3"
        src="https://ms-mci.audencia.com/wp-content/uploads/2017/02/logo-AMARIS.png"
        height="40"
      />
      <v-spacer></v-spacer>
      <router-link
        :to="{ name: 'Besoin' }"
        text-decoration="none"
        style="margin: 10px"
        class="item-navbar"
      >
        <v-icon> mdi-archive </v-icon>
      </router-link>
      <router-link
        :to="{ name: 'Search' }"
        text-decoration="none"
        style="margin: 10px"
        class="item-navbar"
      >
        <h2>search</h2>
        <v-icon> mdi-magnify </v-icon>
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
import "./Header.css";
export default {
  name: "Header",
  components: {},

  data: () => ({
    //
  }),
};
</script>
