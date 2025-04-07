<template>
  <div v-if="user" class="hero">
    <h3>Mes catalogues</h3>

    <div class="list-group">
      <button
        type="button"
        class="list-group-item list-group-item-action list-group-item-primary d-flex justify-content-between align-items-center"
        v-for="catalogue in myCatalogues"
        :key="catalogue.id"
        @click="openCatalogue(catalogue.id)"
      >
        <div>
          <b>{{ catalogue.name }}</b
          >: {{ catalogue.description }}
        </div>
        <span class="badge bg-primary rounded-pill">x articles</span>
      </button>
    </div>
  </div>
  <div v-else>Connectez-vous</div>
</template>

<script>
export default {
  name: "MyCatalogues",
  async mounted() {
    this.$store.dispatch("broc/getMyCatalogues");
  },
  methods: {
    openCatalogue(id) {
      this.$store.dispatch("broc/getCatalogue", id);
      this.$router.push({ name: "catalogue" });
    },
  },
  watch: {
    user() {
      if (this.user) this.$store.dispatch("broc/getMyCatalogues");
    },
  },
  computed: {
    myCatalogues() {
      return this.$store.state.broc.myCatalogues;
    },
    user() {
      return this.$store.state.broc.user;
    },
  },
};
</script>

<style scoped></style>
