<template>
  <div>
    <div v-if="user == null">
      Email : <input type="email" v-model="email" />

      <!-- Password :
      <input type="password" v-model="password" /> -->
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Password</label>
        </div>
        <div class="col-auto">
          <input
            type="password"
            id="inputPassword6"
            class="form-control"
            aria-describedby="passwordHelpInline"
            v-model="password"
          />
        </div>
        <div class="col-auto">
          <span id="passwordHelpInline" class="form-text"> minimum 8 charactères. </span>
        </div>
      </div>

      <button @click="login">Connexion</button>
      <button @click="signin">Inscription</button>
    </div>
    <div v-else>
      {{ user.email }}
      <button @click="logout" class="btn btn-danger btn-sm">Déconnexion</button>
      <hr />
      <router-link to="/catalogue-gestion"
        ><button class="btn btn-info">Mes Catalogues de produits</button></router-link
      >
    </div>

    <ProfileView v-if="user" />
  </div>
</template>

<script>
import ProfileView from "@/views/ProfileView.vue";

export default {
  name: "LoginSupa",
  components: { ProfileView },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("broc/checkUser");
    console.log(this.user);
  },
  methods: {
    async login() {
      await this.$store.dispatch("broc/login", {
        email: this.email,
        password: this.password,
      });
    },
    async signin() {
      await this.$store.dispatch("broc/signin", {
        email: this.email,
        password: this.password,
      });
    },
    async logout() {
      await this.$store.dispatch("broc/logout");
    },
  },
  computed: {
    user() {
      return this.$store.state.broc.user;
    },
  },
};
</script>

<style scoped></style>
