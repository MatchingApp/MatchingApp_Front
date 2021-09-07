<template>
  <v-container class="bloc-modale" v-if="showModal" style="overflow: scroll">
    <div class="overlay" @click="OpenModal()"></div>
    <div class="modale">
      <v-card flat>
        <br />
        <p class="titre">Update a candidate</p>
        <v-snackbar
          v-model="snackbar"
          @submit.prevent="submit"
          absolute
          top
          right
          color="success"
        >
          <span>Registration successful!</span>
          <v-icon dark> mdi-checkbox-marked-circle </v-icon>
        </v-snackbar>
        <v-form ref="form" @submit.prevent="submit">
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedCandidate.first"
                  :rules="rules.name"
                  color="blue darken-2"
                  label="First name"
                  :value="form.first"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedCandidate.last"
                  :rules="rules.name"
                  color="blue darken-2"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedCandidate.languages"
                  :items="languages"
                  attach
                  chips
                  label="Languages"
                  multiple
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedCandidate.skills"
                  :items="skills"
                  attach
                  chips
                  label="Skills"
                  multiple
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedCandidate.address"
                  :rules="rules.address"
                  color="blue darken-2"
                  label="Address"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedCandidate.email"
                  :rules="rules.email"
                  color="blue darken-2"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedCandidate.phone"
                  :rules="rules.PhoneNumber"
                  color="blue darken-2"
                  label="Phone Number"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedCandidate.education"
                  :items="education"
                  :rules="rules.education"
                  color="pink"
                  label="Education"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6">
                <v-slider
                  v-model="selectedCandidate.age"
                  color="orange"
                  label="Age"
                  hint="Be honest"
                  min="1"
                  max="100"
                  thumb-label
                ></v-slider>
              </v-col>
              <v-col cols="12" sm="6">
                <v-slider
                  v-model="selectedCandidate.experience"
                  color="orange"
                  label="Experience range"
                  hint="Be honest"
                  min="0"
                  max="40"
                  thumb-label
                ></v-slider>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedCandidate.title"
                  color="blue darken-2"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="selectedCandidate.bio" color="teal">
                  <template v-slot:label>
                    <div>Bio <small>(optional)</small></div>
                  </template>
                </v-textarea>
              </v-col>

              <v-file-input
                accept="image/*"
                label="Upload a profile image"
              ></v-file-input>
              <v-col cols="12">
                <v-checkbox v-model="form.terms" color="green">
                  <template v-slot:label>
                    <div @click.stop="">
                      Do you accept the
                      <a href="#" @click.prevent="terms = true">terms</a>
                      and
                      <a href="#" @click.prevent="conditions = true"
                        >conditions?</a
                      >
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn text @click="resetForm"> Cancel </v-btn>
            <v-spacer></v-spacer>
            <!-- <v-btn :disabled="!formIsValid" text color="primary" type="submit"> -->
            <v-btn text color="primary" type="submit"> Update </v-btn>
          </v-card-actions>
        </v-form>
        <v-dialog v-model="terms" width="70%">
          <v-card>
            <v-card-title class="text-h6"> Terms </v-card-title>
            <v-card-text v-for="n in 5" :key="n">
              {{ content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="purple" @click="terms = false"> Ok </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="conditions" width="70%">
          <v-card>
            <v-card-title class="text-h6"> Conditions </v-card-title>
            <v-card-text v-for="n in 5" :key="n">
              {{ content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="purple" @click="conditions = false">
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import CandidatService from "../../../data/CandidatService";

export default {
  name: "UpdateCandidate",
  props: ["showModal", "OpenModal", "selectedCandidate", "getCandidatesData"],
  beforeCreate() {
    this.changeform();
  },

  data() {
    var defaultForm = Object.freeze({
      first: "ramos",
      last: "",
      bio: "",
      address: "",
      email: "",
      PhoneNumber: "",
      education: "",
      skills: "",
      languages: "",
      age: null,
      experience: null,
      terms: false,
      title: "",
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        education: [
          (val) => (val || "").length > 0 || "This field is required",
        ],
        name: [(val) => (val || "").length > 0 || "This field is required"],
      },
      education: [
        "license degree",
        "master degree",
        "engineering degree",
        "phd",
      ],
      languages: [
        "arabe",
        "français",
        "anglais",
        "allemand",
        "espagnol",
        "chinois",
        "russe",
      ],
      skills: [
        "html",
        "js",
        "asp.net",
        "data analytics",
        "angular",
        "deep learning",
        "R",
        "Python",
        "Java",
        "vue.js",
        "AI",
        "data science",
        "devops",
        "security",
        "react.js",
        "spreadsheets",
        "SQL",
        "PHP",
        "css",
      ],
      conditions: false,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
      snackbar: false,
      terms: false,
      name: "this.selectedCandidate.name",
    };
  },
  methods: {
    changeform() {
      this.form.first = this.selectedCandidate.name;
      this.form.last = this.selectedCandidate.name;
      this.form.bio = this.selectedCandidate.bio;
      this.form.address = this.selectedCandidate.address;
      this.form.email = this.selectedCandidate.email;
      this.form.PhoneNumber = this.selectedCandidate.phone;
      this.form.education = this.selectedCandidate.education;
      this.form.skills = this.selectedCandidate.skills;
      this.form.languages = this.selectedCandidate.languages;
      this.form.age = this.selectedCandidate.age;
      this.form.experience = this.selectedCandidate.age;
      this.form.title = this.selectedCandidate.title;
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.changeform();
      var data = JSON.stringify({
        id: this.selectedCandidate.id,
        name: this.form.first + " " + this.form.last,
        age: this.form.age,
        bio: this.form.bio,
        phone: Number(this.form.PhoneNumber),
        address: this.form.address,
        languages: this.form.languages.join(" "),
        experience: this.form.experience,
        education: this.form.education,
        skills: this.form.skills.join(" "),
        title: this.form.title,
        photo: this.photo,
        score: null,
      });
      CandidatService.UpdateCandidate(data)
        .then((response) => {
          console.log("response", response);
          this.getCandidatesData();
          // this.candidates = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      this.OpenModal();
      this.snackbar = true;
      location.reload();
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
.bloc-modale {
  background-color: aliceblue;
}
</style>