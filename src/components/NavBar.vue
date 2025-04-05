<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/catalogue">Catalogue</router-link>
    <router-link to="/login">Connexion</router-link>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
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
