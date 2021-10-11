<template>
  <v-container
    class="bloc-modale UpdateCandidate"
    v-if="showModal"
    style="overflow: scroll"
  >
    <div class="overlay" @click="OpenModal()"></div>
    <div class="modale">
      <v-row class="row-popup">
        <v-col
          v-for="candidate in candidates"
          :key="candidate.id"
          cols="12"
          md="12"
        >
          <CandidateDetails :candidate="candidate"></CandidateDetails>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import CandidatService from "../../../../data/CandidatService";
import CandidateDetails from "../../Components/CandidateDetails/CandidateDetails.vue";
import "./CandidatePopUp.css";
export default {
  name: "CandidatePopUp",
  components: {
    CandidateDetails,
  },
  props: ["showModal", "OpenModal", "candidates"],

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
      skills: [],
      conditions: false,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
      snackbar: false,
      terms: false,
      name: "this.selectedCandidate.name",
    };
  },
  created() {
    this.getSkills();
  },
  methods: {
    getSkills() {
      CandidatService.getSkills()
        .then((response) => {
          console.log("response", response);
          this.skills = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changeform() {
      this.form.first = this.selectedCandidate.first;
      this.form.last = this.selectedCandidate.last;
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
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  background-color: white;
}
.UpdateCandidate
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  background-color: none !important;
}
</style>