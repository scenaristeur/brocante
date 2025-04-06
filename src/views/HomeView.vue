<template>
  <div class="home">
    <!-- Bandeau d'accueil -->
    <header class="hero">
      <h1>Bienvenue sur Brocante App</h1>
      <p>Découvrez nos trésors de brocante</p>
      CAtegories | Recherche Géolocalisée | CAtalogues | Recherche Produit
    </header>

    <!-- Section des derniers produits -->
    <section class="latest-products">
      <h2>Derniers Produits</h2>
      <div class="product-grid">
        <ProduitCard v-for="produit in produits" :key="produit.id" :produit="produit" />
      </div>
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
      // Exemple de données statiques
      produits: [
        // {
        //   id: 1,
        //   titre: "Vieux Fauteuil",
        //   description: "Confortable et plein de charme.",
        //   image: "https://dummyimage.com/300x200/000000/0fffff.png&text=Fauteuil",
        //   prix: "100€",
        // },
        // {
        //   id: 2,
        //   titre: "Lampe Rétro",
        //   description: "Éclairage vintage pour une ambiance unique.",
        //   image: "https://dummyimage.com/300x200/000000/0fffff.png&text=Lampe",
        //   prix: "50€",
        // },
        // {
        //   id: 3,
        //   titre: "Table en Bois",
        //   description: "Authentique table de brocante en bois massif.",
        //   image: "https://dummyimage.com/300x200/000000/0fffff.png&text=Table",
        //   prix: "150€",
        // },
        // {
        //   id: 4,
        //   titre: "Vieux Fauteuil",
        //   description: "Confortable et plein de charme.",
        //   image: "https://dummyimage.com/300x200/000000/0fffff.png&text=Fauteuil",
        //   prix: "100€",
        // },
        // {
        //   id: 5,
        //   titre: "Lampe Rétro",
        //   description: "Éclairage vintage pour une ambiance unique.",
        //   image: "https://dummyimage.com/300x200/000000/0fffff.png&text=Lampe",
        //   prix: "50€",
        // },
        // {
        //   id: 6,
        //   titre: "Table en Bois",
        //   description: "Authentique table de brocante en bois massif.",
        //   image: "https://dummyimage.com/300x200/000000/0fffff.png&text=Table",
        //   prix: "150€",
        // },
      ],
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

        .limit(10);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.produits = data;
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
