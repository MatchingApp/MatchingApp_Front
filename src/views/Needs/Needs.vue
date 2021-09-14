<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined style="padding: 10px">
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview
                :items="posts"
                :open="[1]"
                :active="[5]"
                activatable
                open-on-click
                dense
                v-model="post"
                selectable
                return-object
                open-all
                @change="submit()"
              ></v-treeview>
            </template>
            <v-divider></v-divider>
            <v-card-title>Experience</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
              @change="onChange(range)"
              @click="submit()"
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Skills</v-card-title>

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
              @change="submit()"
            ></v-autocomplete>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Languages</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                v-model="languages"
                v-for="language in languages"
                :key="language.id"
                :label="language"
                hide-details
                dense
                @change="setSelectedLanguages(language)"
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>

            <v-card-title class="pb-0">Address</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox
                :v-model="locations"
                v-for="location in locations"
                :key="location.id"
                :label="location"
                hide-details
                dense
                @change="setSelectedLocations(location)"
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-card-title class="pb-0"> Job Description </v-card-title>
            <v-container class="pt-0" fluid>
              <v-text-field
                v-model="Description"
                label="Description"
                required
                outlined
                background-color="white"
                @change="submit()"
              ></v-text-field>
            </v-container>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
          <!-- <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs> -->

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-12 of 200 Candidates</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="select"
                :items="options"
                style="margin-bottom: -20px"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row text-center">
            <div
              class="col-md-6 col-sm-12 col-xs-12"
              v-for="candidate in candidates"
              :key="candidate.id"
            >
              <CandidateDetails :candidate="candidate"></CandidateDetails>
            </div>
          </div>
          <div class="text-center mt-12">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import CandidatService from "../../data/CandidatService";
import CandidateDetails from "./components/CandidateDetails/CandidateDetails.vue";
import "./Needs.css";
export default {
  components: {
    CandidateDetails,
  },
  data: () => ({
    candidates: [],

    range: [0, 40],
    select: "Popularity",
    options: [
      "Default",
      "Popularity",
      "Relevance",
      "Experience: Low to High",
      "Experience: High to Low",
    ],
    page: 1,
    breadcrums: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_home",
      },
      {
        text: "Clothing",
        disabled: false,
        href: "breadcrumbs_clothing",
      },
      {
        text: "T-Shirts",
        disabled: true,
        href: "breadcrumbs_shirts",
      },
    ],
    skills: [],
    languages: ["frensh", "english", "arabe"],
    selectedLanguages: [],
    locations: ["Tunis", "Sfax", "Sousse"],
    selectedLocations: [],
    items: ["Tunis", "Sfax", "Sousse"],
    test: [],
    min: 0,
    max: 40,
    posts: [
      {
        name: "Posts",
        children: [
          { id: 2, name: "Software Engenieer" },
          { id: 3, name: "Manger" },
        ],
      },
    ],
    post: [{ id: 0, name: " " }],
    Description: "",
  }),
  created() {
    this.getCandidatesData();
    this.getSkills();
  },
  methods: {
    onChange(event) {
      console.log("event");
      console.log(event);
      this.submit();
    },
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
    setSelectedLanguages: function (language) {
      this.selectedLanguages.push(language);
      this.submit();
    },
    setSelectedLocations: function (location) {
      this.selectedLocations.push(location);
      this.submit();
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
    async submit() {
      var data = JSON.stringify({
        Should: "",
        ShouldNot: "",
        Must: "",
        MustNot: "",
        Title: this.post[0].name,
        Skills: this.skills.join(" "),
        Bio: this.Description,
        Languages: this.selectedLanguages.join(" "),
        Address: this.selectedLocations.join(" "),
        MinExperience: this.range[0],
        MaxExperience: this.range[1],
      });
      console.log("data");
      console.log(data);
      await CandidatService.getCandidate(data)
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