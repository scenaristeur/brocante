<template>
  <div>ProduitShow</div>
  {{ produit }}
  <hr />
  {{ catalogue }}
  <hr />
  {{ produits }}
</template>

<script>
export default {
  name: "ProduitShow",
  components: {},
  data() {
    return {};
  },
  watch: {
    produit() {
      console.log(this.produit);
      this.$store.dispatch("broc/getCatalogue", this.produit.catalogue);
    },
  },
  computed: {
    produit() {
      return this.$store.state.broc.produit;
    },
    catalogue() {
      return this.$store.state.broc.catalogue;
    },
    produits() {
      return this.$store.state.broc.produits;
    },
  },
};
</script>
