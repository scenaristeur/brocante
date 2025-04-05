<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link v-if="user" to="/catalogue-gestion">Catalogues</router-link>
    <router-link to="/login">Connexion</router-link>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    user() {
      return this.$store.state.broc.user;
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  background: #eee;
  padding: 1rem;
}
</style>
