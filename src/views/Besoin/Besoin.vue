<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined style="padding: 10px">
            <v-card-title>Add a new Category</v-card-title>
            <v-divider></v-divider>
            <v-form v-model="valid" @submit.prevent="submit">
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
                ></v-treeview>
              </template>
              <v-divider></v-divider>
              <v-card-title class="pb-0">Skills</v-card-title>
              <v-container class="pt-0" fluid>
                <v-checkbox
                  v-model="skills"
                  :label="skill"
                  hide-details
                  dense
                  v-for="skill in skills"
                  :key="skill.id"
                ></v-checkbox>
              </v-container>
              <v-autocomplete
                append-icon="mdi-plus"
                v-model="skill"
                :items="skillsItems"
                label="You can enter other skills"
                background-color="white"
                @change="addSkill(skill)"
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-card-title>Experience</v-card-title>
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                :height="10"
                class="align-center"
                dense
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
              <v-card-title class="pb-0">Languages</v-card-title>
              <v-container class="pt-0" fluid>
                <v-checkbox
                  v-model="languages"
                  v-for="language in languages"
                  :key="language.id"
                  :label="language"
                  hide-details
                  dense
                  @click="onCheckboxClicked(language)"
                ></v-checkbox>
              </v-container>
              <v-divider></v-divider>
              <v-card-title class="pb-0">Address</v-card-title>
              <v-container class="pt-0" fluid>
                <v-checkbox
                  :v-model="location"
                  v-for="location in locationItems"
                  :key="location.id"
                  :label="location"
                  hide-details
                  dense
                ></v-checkbox>
              </v-container>
              <v-divider></v-divider>
              <v-card-title class="pb-0">Job Description</v-card-title>
              <v-container class="pt-0" fluid>
                <v-text-field
                  v-model="Description"
                  label="Description"
                  required
                  outlined
                  background-color="white"
                ></v-text-field>
              </v-container>
              <v-divider></v-divider>
              <v-card-title class="pb-0">Education</v-card-title>
              <v-container class="pt-0" fluid>
                <v-select
                  v-model="education"
                  :items="educationItems"
                  label="Education"
                  required
                ></v-select>
              </v-container>
              <v-divider></v-divider>
              <v-btn type="submit" color="warning" dark class="btn-submit"
                >Add the new Need
              </v-btn>
            </v-form>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12 needs-container">
          <!-- <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs> -->

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <h1>Recent Needs</h1>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              v-for="categorie in categories"
              :key="categorie.id"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    src="https://html.sammy-codes.com/images/background.jpg"
                  >
                    <h1 class="category-title">{{ categorie.jobTitle }}</h1>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="
                          d-flex
                          transition-fast-in-fast-out
                          white
                          darken-2
                          v-card--reveal
                          display-3
                          white--text
                        "
                        style="height: 100%"
                      >
                        <v-btn
                          v-if="hover"
                          class=""
                          outlined
                          @click="OpenModal()"
                          >VIEW Candidates</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <h4 class="category-text-candidates">
                      Number of Candidates
                    </h4>
                    {{ categorie.requiredExperience }}
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <!-- <v-divider></v-divider>

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
          </div> -->
        </div>
      </div>
    </v-container>
    <CandidatePopUp
      :showModal="showModal"
      :OpenModal="OpenModal"
    ></CandidatePopUp>
  </div>
</template>
      
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import CandidatePopUp from "./Components/CandidatePopUp/CandidatePopUp.vue";
import CandidatService from "../../data/CandidatService";
import BesoinService from "../../data/BesoinService";
import "./Besoin.css";
export default {
  components: {
    CandidatePopUp,
  },
  data: () => ({
    showModal: false,

    candidates: [
      {
        id: "21be1251-138f-429f-b405-57b8d04499b7",
        name: "Ramez Ben Aribia",
        age: 21,
        bio: "learning",
        phone: 20400417,
        address: "Tunisia",
        languages: "arabe français anglais",
        experience: 3,
        education: "master degree",
        skills: "html js asp.net angular Python Java vue.js PHP SQL css",
        title: "Student",
        photo: null,
        score: null,
      },
      {
        id: "13e3da86-1e2e-4281-99ad-c0b04471eb77",
        name: "Ferid Chebbi",
        age: 23,
        bio: "Manager",
        phone: 20400417,
        address: "Tunisia",
        languages: "arabe français anglais",
        experience: 12,
        education: "engineering degree",
        skills: "angular deep learning R Python Java security devops",
        title: "Manager",
        photo: null,
        score: null,
      },
      {
        id: "5837d02f-53d3-4fa0-b2cb-962951508e75",
        name: "Mahdi Hamdi",
        age: 21,
        bio: "Software engineer",
        phone: 0,
        address: "tunis",
        languages: "arabic english frensh",
        experience: 3,
        education: "Master",
        skills: "js",
        title: "Network Engineer",
        photo: null,
        score: null,
      },
    ],

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
    Description: "",
    skillsItems: [],
    skills: [],
    skill: "",
    Needs: [],
    educationItems: [
      "license degree",
      "master degree",
      "engineering degree",
      "phd",
    ],
    education: "",
    languages: ["frensh", "english", "arabe"],
    selectdLanguages: [],
    selectdSkills: [],
    locations: ["Tunis", "Sfax", "Sousse"],
    locationItems: ["Tunis", "Sfax", "Sousse"],
    categories: [],
    min: 0,
    max: 40,
    posts: [
      {
        name: "Posts Available",
        children: [
          { id: 1, name: "Angular Developer" },
          { id: 2, name: "Software Engenieer" },
          { id: 3, name: "Manger" },
        ],
      },
    ],
    post: "",
  }),
  created() {
    this.getNeedsData();
    this.getSkills();
  },
  methods: {
    OpenModal() {
      console.log(this.showModal);
      this.showModal = !this.showModal;
    },
    onCheckboxClicked: function (language) {
      this.selectdLanguages.push(language);
    },

    addSkill(skill) {
      this.skills.push(skill);
    },

    getSkills() {
      CandidatService.getSkills()
        .then((response) => {
          this.skillsItems = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getNeedsData() {
      BesoinService.getAll()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submit() {
      this.languages.splice(this.languages.length - 1, 1);
      this.skills.splice(this.skills.length - 1, 1);
      var data = JSON.stringify({
        jobDescription: this.Description,
        jobLocation: this.locations.join(" "),
        jobTitle: this.post[0].name,
        requiredEducation: this.education,
        requiredExperience: this.range[0],
        requiredLanguages: this.languages.join(" "),
        requiredSkills: this.skills.join(" "),
      });
      console.log("data");
      console.log(data);
      BesoinService.createBesoin(data)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>