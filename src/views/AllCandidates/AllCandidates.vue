<template>
  <div>
    <v-card color="rgb(239, 234, 228)">
      <v-form v-model="valid" @submit.prevent="submit">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Title"
                required
                outlined
                background-color="white"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn type="submit" color="warning" dark style="width: 400px">
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <div style="background-color: rgb(246, 243, 239)">
      <br />
      <h4 class="titre"><span>All Candidates</span></h4>
      <v-row>
        <v-col
          v-for="candidate in candidates"
          :key="candidate.id"
          cols="12"
          md="4"
          class="account-card"
        >
          <CandidateDetails :candidate="candidate"></CandidateDetails>

          <UpdateCandidate
            :showModal="showModal"
            :OpenModal="OpenModal"
          ></UpdateCandidate>
        </v-col>
      </v-row>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import CandidatService from "../../data/CandidatService";
import CandidateDetails from "./Components/CandidateDetails/CandidateDetails.vue";

import UpdateCandidate from "./Components/UpdateCandidate.vue";
import "./AllCandidates.css";
export default {
  name: "AllCandidates",
  components: {
    CandidateDetails,
    UpdateCandidate,
  },
  data() {
    return {
      showModal: false,
      candidates: [],
      name: null,
    };
  },
  created() {
    this.getCandidatesData();
  },
  methods: {
    OpenModal() {
      this.showModal = !this.showModal;
    },
    getCandidatesData() {
      CandidatService.getAll()
        .then((response) => {
          this.candidates = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submit() {
      if (this.name == null) {
        this.getCandidatesData();
      } else {
        CandidatService.getCandidateByName(this.name)
          .then((response) => {
            this.candidates = response.data;
            this.name = null;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>
