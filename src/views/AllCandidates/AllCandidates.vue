<template>
  <div>
    <v-card color="rgb(239, 234, 228)">
      <v-form v-model="valid" @submit.prevent="submit">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="name"
                label="Name"
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
          <CandidateDetails
            :showModal="showModal"
            :OpenModal="OpenModal"
            :candidate="candidate"
            :selectCandidate="selectCandidate"
          ></CandidateDetails>
        </v-col>
      </v-row>
      <br />
      <br />
    </div>

    <UpdateCandidate
      :showModal="showModal"
      :OpenModal="OpenModal"
      :selectedCandidate="selectedCandidate"
      :getCandidatesData="getCandidatesData"
    ></UpdateCandidate>
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
      selectedCandidate: null,
    };
  },
  created() {
    this.getCandidatesData();
  },
  methods: {
    OpenModal() {
      console.log(this.showModal);
      this.showModal = !this.showModal;
    },
    selectCandidate(candidate) {
      candidate.skills = candidate.skills.split(" ");
      candidate.languages = candidate.languages.split(" ");
      candidate.first = candidate.name.split(" ", 1).join("");
      candidate.last = candidate.name.split(" ");
      candidate.last.splice(0, 1);
      candidate.last = candidate.last.join(" ");
      this.selectedCandidate = candidate;
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
