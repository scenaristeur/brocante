<template>
  <div>
    <div v-if="user == null">
      Email : <input type="email" v-model="email" /> Password :
      <input type="password" v-model="password" />

      <button @click="login">Connexion</button>
      <button @click="signin">Inscription</button>
    </div>
    <div v-else>
      {{ user.email }}
      <button @click="logout">Déconnexion</button>
      <hr />
      <router-link to="/catalogue-gestion">Catalogues</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginSupa",
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
