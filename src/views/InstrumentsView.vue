<template>
  <div>
    Produits > All Products
    <ul>
      <li v-for="produit in produits" :key="produit.id">
        {{ produit.name }}
        <ul>
          <li v-for="(image, index) in produit.images" :key="index">
            <!-- {{ index }} {{ image }} -->
            <ImageComponent :image="image" size="3" />
          </li>
        </ul>
      </li>
    </ul>

    Catalogues > All Catalogues
    <ul>
      <li v-for="catalogue in catalogues" :key="catalogue.id">
        {{ catalogue.name }}
      </li>
    </ul>

    Images > All Images
    <!-- {{ images }} -->
    <ul>
      <li v-for="image in images" :key="image.id">
        {{ image.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
import ImageComponent from "@/components/ImageComponent.vue";
export default {
  name: "InstrumentsView",
  components: { ImageComponent },
  data() {
    return {
      produits: [],
      catalogues: [],
      images: [],
    };
  },
  mounted() {
    this.getProduits();
    this.getCatalogues();
    this.getImages();
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
    async getImages() {
      // const { data, error } = await supabase.storage.getBucket("produit-images");
      const { data, error } = await supabase.storage
        .from("produit-images")
        .list("public", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      if (error) {
        console.log(error);
      } else {
        console.log("images", data);
        this.images = data;
      }
    },
  },
};
</script>

<style scoped></style>
