<template>
  <div>
    <v-card color="rgb(239, 234, 228)">
      <v-form v-model="valid" @submit.prevent="submit">
        <v-container>
          <p class="titre">Search for the perfect fit!</p>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="title"
                :rules="nameRules"
                label="Title"
                required
                outlined
                background-color="white"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="8">
              <v-text-field
                v-model="jobDescription"
                :rules="nameRules"
                label="Job Description"
                required
                outlined
                background-color="white"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            ><v-col cols="12" md="4">
              <v-card flat color="transparent">
                <v-subheader>Experience range</v-subheader>

                <v-card-text>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider
                        v-model="range"
                        :max="max"
                        :min="min"
                        hide-details
                        class="align-center"
                      >
                        <template v-slot:prepend>
                          <v-text-field
                            :value="range[0]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(range, 0, $event)"
                          ></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field
                            :value="range[1]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(range, 1, $event)"
                          ></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="skills"
                :items="items"
                outlined
                dense
                chips
                small-chips
                label="Skills"
                multiple
                background-color="white"
                filled
                clearable
                deletable-chips
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="location"
                :items="locations"
                outlined
                dense
                chips
                small-chips
                label="Location"
                multiple
                background-color="white"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4"></v-col
            ><v-col cols="12" md="4">
              <v-btn type="submit" color="warning" dark style="width: 400px">
                Search
              </v-btn>
            </v-col></v-row
          >
        </v-container>
      </v-form>
    </v-card>
    <div style="background-color: rgb(246, 243, 239)">
      <br />
      <h4 class="titre"><span>My searches</span></h4>
      <v-row>
        <v-col
          v-for="candidate in candidates"
          :key="candidate.id"
          cols="12"
          md="12"
        >
          <CandidateDetails :candidate="candidate"></CandidateDetails>
        </v-col>
      </v-row>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import CandidatService from "../../data/CandidatService";
import CandidateDetails from "./components/CandidateDetails/CandidateDetails.vue";
export default {
  name: "Home",
  components: {
    CandidateDetails,
  },
  data() {
    return {
      candidates: [],
      min: 0,
      max: 20,
      range: [0, 20],
      items: [],
      locations: [
        "Tunis",
        "Djerba",
        "Sfax",
        "Beja",
        "Kairaouan",
        "Nabeul",
        "Hammamet",
        "Ariana",
        "Manouba",
        "Bizerte",
        "Douz",
        "Tozeur",
        "Gabes",
        "Tataouine",
        "Mahdia",
        "Sousse",
        "Jandouba",
      ],
      skills: [],
      values: [],
      value: null,
      title: "",
      location: [],
      jobDescription: "",
    };
  },
  created() {
    this.getCandidatesData();
    this.getSkills();
  },
  methods: {
    getSkills() {
      CandidatService.getSkills()
        .then((response) => {
          console.log("response", response);
          this.items = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
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
      var data = JSON.stringify({
        Should: "",
        ShouldNot: "",
        Must: "",
        MustNot: "",
        Title: this.title,
        Skills: this.skills.join(" "),
        Bio: this.jobDescription,
        Address: this.location.join(" "),
        MinExperience: this.range[0],
        MaxExperience: this.range[1],
      });
      CandidatService.getCandidate(data)
        .then((response) => {
          this.candidates = response.data;
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
</style>