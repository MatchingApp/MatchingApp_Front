<template>
  <div class="container">
    <br />
    <br />

    <v-card class="mx-auto">
      <div class="row">
        <div class="col-4">
          <v-img
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            height="100%"
          ></v-img>
        </div>
        <div class="col-8">
          <v-card-title> {{ candidate.name }}</v-card-title>

          <v-card-subtitle>{{ candidate.title }}</v-card-subtitle>
          <vue-ellipse-progress
            :data="circles"
            :progress="-candidate.score"
            :color="color"
            :colorFill="colorFillGradient"
            emptyColor="#c4e5caa3"
            :emptyColorFill="emptyColorFillGradient"
            :size="100"
            :thickness="4"
            emptyThickness="4%"
            lineMode="in 5"
            :legend="false"
            :legendValue="118"
            dash="60 0.9"
            animation="reverse 2700 400"
            fontColor="white"
            :gap="1000"
            :dot="'10 ' + color"
            reverse
            fontSize="5rem"
            class="progress-circle"
            v-if="candidate.score"
          >
            <p slot="legend-caption"></p>
            <p slot="legend-caption">{{ candidate.score }}%</p>
          </vue-ellipse-progress>

          <v-card-actions>
            <v-btn color="orange lighten-2" text> More details </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
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
        </div>
      </div>
      <!-- <v-img
        src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
        height="100%"
      ></v-img> -->
    </v-card>
  </div>
</template>
<script>
import "./CandidateDetails.css";
export default {
  name: "CandidateDetails",
  props: ["candidate"],
  data: () => ({
    show: false,
    color: "#20c339",
  }),
  created() {
    this.getColor();
  },
  methods: {
    getColor() {
      if (this.candidate.score > 50) {
        this.color = "#20c339";
      } else if (this.candidate.score > 30) {
        this.color = "#df7f1d";
      } else if (this.candidate.score > 0) {
        this.color = "#d40f0f";
      }
    },
  },
};
</script>