<template>
  <div class="home">
    <!-- Bandeau d'accueil -->
    <header class="hero">
      <h1>Bienvenue sur Brocante App</h1>
      <p>Découvrez nos trésors de brocante</p>
      CAtegories | Recherche Géolocalisée | CAtalogues | Recherche Produit | Navigate
    </header>

    <!-- Section des derniers produits -->
    <section class="latest-products">
      <h2>Derniers Produits</h2>
      <!-- <input type="text" placeholder="Rechercher" /> -->

      <div class="product-grid">
        <ProduitCard v-for="produit in produits" :key="produit.id" :produit="produit" />
      </div>
      <hr />
      <button @click="getProduits" class="btn btn-primary">
        Charger plus de produits
      </button>
    </section>
  </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
import ProduitCard from "@/components/ProduitCard.vue";

export default {
  name: "HomeView",
  components: { ProduitCard },

  data() {
    return {
      range_start: 0,
      // Exemple de données statiques
      produits: [],
    };
  },
  mounted() {
    this.getProduits();
  },
  methods: {
    async getProduits() {
      const { data, error } = await supabase
        .from("produits")
        .select("*")
        .order("created_at", { ascending: false }, "updated_at", { ascending: false })
        .range(this.range_start, this.range_start + 10);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        // this.produits.concat(data);
        this.produits = [...this.produits, ...data];
        this.range_start += 11;
      }
    },
  },
};
</script>

<style scoped>
.home {
  padding: 2rem;
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
