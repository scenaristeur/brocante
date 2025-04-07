<template>
  <div id="app">
    <NavBar />
    <div class="container mt-4">
      <router-view />
    </div>
    <FooterView />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterView from "./views/FooterView.vue";
export default {
  components: { NavBar, FooterView },
  mounted() {
    this.$store.dispatch("broc/checkUser");
  },
};
</script>
<style>
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: #f5f5f5;
  margin-bottom: 2rem;
}
</style>
