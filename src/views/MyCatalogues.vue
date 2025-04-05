<template>
  <div v-if="user">
    Mes catalogues :
    <!-- <hr />
    {{ myCatalogues }} -->

    <div class="list-group">
      <button
        type="button"
        class="list-group-item list-group-item-action"
        v-for="catalogue in myCatalogues"
        :key="catalogue.id"
        @click="openCatalogue(catalogue.id)"
      >
        <b>{{ catalogue.name }}</b> : {{ catalogue.description }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCatalogues",
  async mounted() {},
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
