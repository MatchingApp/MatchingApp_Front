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
          <v-btn icon @click="editCandidat" class="edit-account">
            <v-icon large color="green darken-2"> mdi-account-edit </v-icon>
          </v-btn>
          <UpdateCandidate
            :showModal="showModal"
            :OpenModal="OpenModal"
          ></UpdateCandidate>
          <v-btn
            icon
            @click="deleteCandidat(candidate.id)"
            class="delete-account"
          >
            <v-icon large color="red darken-2"> mdi-account-remove </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import CandidatService from "../data/CandidatService";
import CandidateDetails from "@/components/CandidateDetails/CandidateDetails.vue";

import UpdateCandidate from "./UpdateCandidate.vue";
export default {
  name: "Home",
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
    editCandidat() {
      this.OpenModal();
    },
    deleteCandidat(id) {
      CandidatService.DeleteCandidate(id)
        .then((response) => {
          console.log(response);
          this.getCandidatesData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
.titre {
  font-family: welcome-font, sans-serif, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.2;
  letter-spacing: -0.6px;
  text-align: center;
}
.result {
  font-family: welcome-font, sans-serif, sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.2;
  letter-spacing: -0.6px;
  display: block;
}
.account-card {
  position: relative;
}
.edit-account {
  position: relative;
  left: 16%;
  bottom: 81%;
}
.delete-account {
  position: relative;
  left: 69%;
  bottom: 81%;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5) !important;
  position: fixed !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
}

.modale {
  position: absolute;
  background: #f1f1f1;
  color: #333;
  top: 3%;
  bottom: 50%;
  margin-bottom: 350px;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>