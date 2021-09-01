<template>
  <div>
    <br />
    <br />
    <v-card class="mx-auto" max-width="344">
      <v-img
        src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
        height="100%"
      ></v-img>
      <v-card-title> {{ candidate.name }}</v-card-title>

      <v-card-subtitle>{{ candidate.title }}</v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> More details </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <h4>age</h4>
            {{ candidate.age }}
            <h4>address</h4>
            {{ candidate.address }}
            <h4>languages</h4>
            {{ candidate.languages }}
            <h4>experience</h4>
            {{ candidate.experience }}
            <h4>education</h4>
            {{ candidate.education }}
            <h4>skills</h4>
            {{ candidate.skills }}
            <h4>phone</h4>
            {{ candidate.phone }}
            <h4>bio</h4>
            {{ candidate.bio }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CandidateDetails",
  props: ["candidate"],
  data: () => ({
    show: false,
  }),
};
</script>