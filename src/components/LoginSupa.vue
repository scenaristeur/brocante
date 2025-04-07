<template>
  <div>
    <div v-if="user == null">
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          aria-describedby="passwordHelpInline"
          v-model="password"
        />
        <label for="floatingPassword">Password</label>
        <span id="passwordHelpInline" class="form-text"> minimum 8 charactères. </span>
      </div>

      <button @click="login" class="btn btn-primary m-3">Connexion</button>
      <button @click="signin" class="btn btn-primary m-3">Inscription</button>
    </div>
    <div v-else>
      {{ user.email }}
      <button @click="logout" class="btn btn-danger btn-sm">Déconnexion</button>
      <hr />
      <router-link to="/catalogue-gestion"
        ><button class="btn btn-primary">Mes catalogues</button></router-link
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
