<template>
  <v-container>
    <br />
    <p class="titre">Add a candidate</p>
    <v-card flat>
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
                v-model="form.first"
                :rules="rules.name"
                color="blue darken-2"
                label="First name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.last"
                :rules="rules.name"
                color="blue darken-2"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="form.languages"
                :items="languages"
                attach
                chips
                label="Languages"
                multiple
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="form.skills"
                :items="skills"
                attach
                chips
                label="Skills"
                multiple
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.address"
                :rules="rules.address"
                color="blue darken-2"
                label="Address"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.email"
                :rules="rules.email"
                color="blue darken-2"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.PhoneNumber"
                :rules="rules.PhoneNumber"
                color="blue darken-2"
                label="Phone Number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="form.education"
                :items="education"
                :rules="rules.education"
                color="pink"
                label="Education"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-slider
                v-model="form.age"
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
                v-model="form.experience"
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
                v-model="form.title"
                color="blue darken-2"
                label="Title"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="form.bio" color="teal">
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
          <v-btn :disabled="!formIsValid" text color="primary" type="submit">
            <!-- <v-btn text color="primary" type="submit">  -->
            Register
          </v-btn>
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
            <v-btn text color="purple" @click="conditions = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import CandidatService from "../../data/CandidatService";

export default {
  data() {
    const defaultForm = Object.freeze({
      first: "",
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
      defaultForm,
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.first &&
        this.form.last &&
        this.form.bio &&
        this.form.address &&
        this.form.email &&
        this.form.PhoneNumber &&
        this.form.education &&
        this.form.skills &&
        this.form.languages &&
        this.form.age &&
        this.form.experience &&
        this.form.terms &&
        this.form.title
      );
    },
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      var data = JSON.stringify({
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
      });
      CandidatService.createCandidate(data)
        .then((response) => {
          console.log("response", response);
          // this.candidates = response.data;
        })
        .catch((e) => {
          console.log(e);
        });

      this.snackbar = true;
      this.resetForm();
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
</style>