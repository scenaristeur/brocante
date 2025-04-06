<template>
  <div class="container">
    <div v-if="catalogue && user && catalogue.owner == user.id">
      <button @click="editProduit()" class="btn btn-primary">Editer le produit</button>
    </div>
    <div class="row hero">
      <div class="card col-6" style="width: 18rem">
        <!-- <img :src="src" :alt="produit.name" /> -->
        <div class="card-body">
          <h3>{{ produit.name }}</h3>
          <p>{{ produit.description }}</p>
          <p class="price">{{ produit.prix }} €</p>
          <!-- <p class="quantite">x{{ produit.quantite }}</p> -->
        </div>
      </div>
      <div class="col">
        <CarousselImages :images="produit.images" />
        <hr />
        Updated:
        {{ produit.updated_at && new Date(produit.updated_at).toLocaleDateString() }}
        catalogue:
        {{ produit.catalogue }}
      </div>
    </div>

    <div class="row">
      <div class="card">
        <img class="card-img-top" :src="user && user.avatar" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">Vendeur</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
          </p>
          <a href="#" class="btn btn-primary">Contacter par mail</a>
          <a href="#" class="btn btn-primary">Contacter par message interne</a>
          <a href="#" class="btn btn-primary">Contacter par téléphone</a>
        </div>
      </div>
    </div>

    <div class="row">
      <section class="latest-products" v-if="catalogue">
        <h2>Dans le même catalogue : {{ catalogue.name }}</h2>
        <div class="product-grid">
          <ProduitCard v-for="produit in produits" :key="produit.id" :produit="produit" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CarousselImages from "@/components/CarousselImages.vue";

import ProduitCard from "@/components/ProduitCard.vue";
export default {
  name: "ProduitShow",
  components: { ProduitCard, CarousselImages },
  methods: {
    editProduit() {
      this.$store.dispatch("broc/getProduit", this.produit.id);
      this.$router.push({
        name: "produit",
      });
    },
  },
  watch: {
    produit() {
      console.log(this.produit);
      this.$store.dispatch("broc/getCatalogue", this.produit.catalogue);
      window.scrollTo(0, 0);
    },
  },
  computed: {
    produit() {
      return this.$store.state.broc.produit;
    },
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
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: auto;
}

.card-body {
  padding: 1rem;
}

.price {
  font-weight: bold;
  color: #e91e63;
}
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: #f5f5f5;
  margin-bottom: 2rem;
}
.latest-products {
  margin-top: 2rem;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
