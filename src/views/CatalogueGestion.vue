<template>
  <div v-if="user">
    <CatalogueCreate />
    <MyCatalogues />
  </div>
</template>

<script>
import CatalogueCreate from "../views/CatalogueCreate.vue";
import MyCatalogues from "../views/MyCatalogues.vue";
export default {
  name: "CatalogueGestion",
  components: { CatalogueCreate, MyCatalogues },
  mounted() {
    this.$store.dispatch("broc/checkUser");
  },

  computed: {
    user() {
      return this.$store.state.broc.user;
    },
  },
};
</script>

<style scoped></style>
