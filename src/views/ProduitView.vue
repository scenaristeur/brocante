<template>
  <div>
    Produit {{ produit }}
    <hr />

    <div>
      <div class="mb-3">
        <label for="produitInputName" class="form-label">Nom de produit</label>
        <input
          type="text"
          class="form-control"
          id="produitInputName"
          aria-describedby="emailHelp"
          v-model="produit.name"
        />
        <!-- <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div> -->
      </div>
      <div class="mb-3">
        <label for="produitTextareaDescription" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="produitTextareaDescription"
          v-model="produit.description"
        />
      </div>
      <div class="mb-3">
        <label for="qtite" class="form-label">Quantité</label>
        <input type="email" class="form-control" id="qtite" v-model="produit.quantite" />
      </div>

      <div class="mb-3">
        <label for="prix" class="form-label">Prix</label>
        <input type="number" class="form-control" id="prix" v-model="produit.prix" /> €
      </div>

      <div class="mb-3">
        <label for="images" class="form-label">Images</label>
        <input type="file" class="form-control" id="images" v-on:change="update_images" />
      </div>

      <!-- <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button @click="enregistrer" class="btn btn-primary">Enregistrer</button>
    </div>
    <!-- Catalogue {{ catalogue }}
    <hr />
    User {{ user }} -->
  </div>
</template>

<script>
export default {
  name: "ProduitView",
  // data() {
  //   // return {
  //   //   produit: null,
  //   // };
  // },
  methods: {
    enregistrer() {
      this.produit.catalogue = this.catalogue.id;
      this.$store.dispatch("broc/enregistrerProduit", this.produit);
    },
    update_images(event) {
      // this.produit.images =
      console.log(event.target.files);
    },
  },
  watch: {
    catalogue() {
      this.produit.catalogue = this.catalogue.id;
    },
  },
  computed: {
    user() {
      return this.$store.state.broc.user;
    },
    produit() {
      return this.$store.state.broc.produit;
    },
    catalogue() {
      return this.$store.state.broc.catalogue;
    },
  },
};
</script>

<style scoped></style>
