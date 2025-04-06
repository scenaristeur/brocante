<template>
  <div>
    <div v-if="catalogue" class="catalogue">
      <!-- The current route is accessible as $route in the template -->
      catalogue {{ $route.params.id }}
      <h1
        contenteditable="true"
        ref="catalogueName"
        @input="updateCatalogue()"
        value="{{ catalogue.name }}"
      >
        {{ catalogue.name }}
      </h1>
      <header
        contenteditable="true"
        ref="catalogueDescription"
        @input="updateCatalogue()"
        value="{{ catalogue.description }}"
      >
        {{ catalogue.description }}
      </header>

      <div v-if="user && catalogue.owner == user.id">
        Owner
        <button @click="editProduit(null)">Ajouter un produit</button>
        <button @click="deleteCatalogue(null)">Supprimer ce catalogue</button>
      </div>

      <!-- <div v-for="produit in produits" :key="produit.id">Propduit {{ produit.name }}</div> -->

      <div class="list-group">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          v-for="produit in produits"
          :key="produit.id"
          @click="editProduit(produit.id)"
        >
          <b>{{ produit.name }}</b> : {{ produit.description }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogueView",
  // created() {
  //   this.$watch(
  //     () => this.$route.params.id,
  //     (newId, oldId) => {
  //       // react to route changes...
  //       this.$store.dispatch("broc/getCatalogue", newId);
  //     }
  //   );
  // },
  mounted() {
    // this.getCatalogue();
    // this.$store.dispatch("broc/getProduits", this.catalogue.id);
  },
  methods: {
    updateCatalogue() {
      this.$store.dispatch("broc/updateCatalogue", {
        id: this.catalogue.id,
        name: this.$refs.catalogueName.textContent,
        description: this.$refs.catalogueDescription.textContent,
      });
    },
    // getCatalogue() {
    //   this.$store.dispatch("broc/getCatalogue", this.$route.params.id);
    // },
    editProduit(id) {
      this.$store.dispatch("broc/getProduit", id);
      this.$router.push({
        name: "produit",
      });
    },
    deleteCatalogue() {
      let answer = confirm("Voulez-vous vraiment supprimer ce catalogue ?");
      if (!answer) return;
      this.$store.dispatch("broc/deleteCatalogue", this.catalogue.id);
      this.$router.push({
        name: "catalogue-gestion",
      });
    },
  },
  catalogue() {
    console.log("catalogue", this.catalogue);
    this.$store.dispatch("broc/getProduits", this.catalogue.id);
  },
  computed: {
    catalogue() {
      return this.$store.state.broc.catalogue;
    },
    user() {
      return this.$store.state.broc.user;
    },
    produits() {
      return this.$store.state.broc.produits;
    },
  },
};
</script>

<style scoped></style>
