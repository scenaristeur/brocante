<template>
  <div>
    <button
      @click="deleteCatalogue(null)"
      class="btn btn-danger"
      style="position: absolute; right: 0px"
    >
      Supprimer ce catalogue
    </button>
    <div v-if="catalogue">
      <!-- The current route is accessible as $route in the template -->
      <h3>Catalogue</h3>
      <div class="hero">
        <h1
          contenteditable="true"
          ref="catalogueName"
          @input="updateCatalogue()"
          value="{{ catalogue.name }}"
          class="editable"
        >
          {{ catalogue.name }}
        </h1>
        <header
          contenteditable="true"
          ref="catalogueDescription"
          @input="updateCatalogue()"
          value="{{ catalogue.description }}"
          class="editable"
        >
          {{ catalogue.description }}
        </header>
        Adresse où les objets de ce catalogue sont visibles
        <div
          contenteditable="true"
          ref="catalogueAdresse"
          @input="updateCatalogue()"
          value="{{ catalogue.adresse }}"
          class="editable"
        >
          {{ catalogue.adresse }}
        </div>

        <!-- Geolocalisation de ce catalogue
        <input id="pac-input" type="text" placeholder="Rechercher une adresse" />
        <div id="map" style="width: 100%; height: 400px"></div> -->
      </div>
      <hr />

      <div v-if="user && catalogue.owner == user.id">
        <button @click="editProduit(null)" class="btn btn-success">
          Ajouter un produit
        </button>
      </div>
      <hr />
      <!-- <div v-for="produit in produits" :key="produit.id">Propduit {{ produit.name }}</div> -->

      <div class="list-group">
        <button
          type="button"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          v-for="produit in produits"
          :key="produit.id"
          @click="editProduit(produit.id)"
        >
          <div>
            <ImageComponent
              v-if="produit.images && produit.images.length > 0"
              :image="produit.images[0]"
              size="2"
            />
            <div v-else class="no-image"></div>
            <b>{{ produit.name }}</b> : {{ produit.description }}
          </div>
          <span class="badge bg-primary rounded-pill"
            >{{ (produit.images && produit.images.length) || 0 }}
            <i class="bi bi-image"></i
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "@/components/ImageComponent.vue";

export default {
  name: "CatalogueView",
  components: { ImageComponent },
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
        adresse: this.$refs.catalogueAdresse.textContent,
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

<style scoped>
.editable {
  cursor: pointer;
  background-color: rgb(116, 219, 219);
}
.no-image {
  display: inline-block;
  width: 58px;
}
</style>
