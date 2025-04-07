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
        maj:
        {{
          (produit.updated_at && new Date(produit.updated_at).toLocaleDateString()) ||
          (produit.created_at && new Date(produit.created_at).toLocaleDateString())
        }}
        <!-- catalogue:
        {{ produit.catalogue }} -->
      </div>
    </div>

    <div class="row">
      <div class="card">
        Vendeur
        <img
          class="card-img-top"
          v-if="catalogueOwnerProfile.avatar_url"
          :src="catalogueOwnerProfile.avatar_url"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">
            {{ catalogueOwnerProfile.first_name }} {{ catalogueOwnerProfile.last_name }}
          </h5>

          <p class="card-text">
            <span
              v-if="catalogueOwnerProfile.adresse || catalogueOwnerProfile.etablissement"
            >
              <a
                :href="
                  'http://maps.google.com/?q=' +
                  catalogueOwnerProfile.etablissement +
                  ' ' +
                  catalogueOwnerProfile.adresse
                "
                target="_blank"
                ><span v-if="catalogueOwnerProfile.etablissement"
                  ><strong>{{ catalogueOwnerProfile.etablissement }}</strong
                  ><br /></span
                >{{ catalogueOwnerProfile.adresse }}</a
              >
            </span>
          </p>
          <p class="card-text" v-if="catalogueOwnerProfile.website">
            <a
              v-if="catalogueOwnerProfile.website"
              :href="catalogueOwnerProfile.website"
              target="_blank"
              >Voir le site</a
            >
          </p>

          <p class="card-text" v-if="catalogueOwnerProfile.description">
            {{ catalogueOwnerProfile.description }}
          </p>

          <a
            class="btn btn-primary btn-block m-2"
            :href="
              'mailto: ' +
              catalogueOwnerProfile.email +
              '?subject=[Brocante App] ' +
              produit.name +
              '&body=Bonjour, je suis intéressé par le produit : ' +
              produit.name +
              ' trouvé sur Brocante App (https://brocante-mu.vercel.app/)\n\n'
            "
            ><i class="bi bi-envelope"></i> mail</a
          >

          <a
            v-if="catalogueOwnerProfile.phone_number"
            :href="'tel:' + catalogueOwnerProfile.phone_number"
            class="btn btn-success btn-block m-2"
            ><i class="bi bi-telephone-outbound"></i> appeler</a
          >
          <button disabled href="#" class="btn btn-primary">
            <i class="bi bi-chat-left"></i> message interne
          </button>
        </div>
      </div>
      <!-- catalogue owner {{ catalogueOwnerProfile }} -->
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
      // if (this.produit.id == null) {
      //   this.$router.push({
      //     name: "home",
      //   });
      // } else {
      this.$store.dispatch("broc/getCatalogue", this.produit.catalogue);
      window.scrollTo(0, 0);
    },
    //},
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
    catalogueOwnerProfile() {
      return this.$store.state.broc.catalogueOwnerProfile;
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
