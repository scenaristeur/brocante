<template>
  <div>
    Catalogues > All Catalogues
    <ul>
      <li v-for="catalogue in catalogues" :key="catalogue.id">
        {{ catalogue.name }}
      </li>
    </ul>
    Produits > All Products
    <ul>
      <li v-for="produit in produits" :key="produit.id">
        {{ produit.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
export default {
  name: "InstrumentsView",
  data() {
    return {
      produits: [],
      catalogues: [],
    };
  },
  mounted() {
    this.getProduits();
    this.getCatalogues();
  },
  methods: {
    async getProduits() {
      const { data, error } = await supabase
        .from("produits")
        .select("*")
        .order("updated", { ascending: false })
        .limit(10);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.produits = data;
      }
    },
    async getCatalogues() {
      const { data, error } = await supabase
        .from("catalogues")
        .select("*")
        .order("updated", { ascending: false })
        .limit(10);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.catalogues = data;
      }
    },
  },
};
</script>

<style scoped></style>
