<template>
  <div class="card" @click="showProduit(produit.id)">
    <div
      v-if="produit.images && produit.images.length > 1"
      class="badge text-bg-light"
      style="z-index: 2; width: auto; position: absolute; top: 0; right: 0"
    >
      {{ produit.images.length }} <i class="bi bi-image"></i>
    </div>
    <img :src="src" :alt="produit.name" />
    <div class="card-body">
      <h3>{{ produit.name }}</h3>
      <p>{{ produit.description }}</p>
      <p class="price">{{ produit.prix }} €</p>
      <!-- <p class="quantite">x{{ produit.quantite }}</p> -->
    </div>
  </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
export default {
  name: "ProduitCard",
  props: {
    produit: { type: Object, required: true },
  },
  data() {
    return {
      src: "",
    };
  },
  mounted() {
    this.updateImage();
  },
  methods: {
    showProduit(id) {
      this.$store.dispatch("broc/getProduit", id);
      this.$router.push({
        name: "produit-show",
      });
    },
    async updateImage() {
      if (this.produit.images && this.produit.images[0]) {
        try {
          const { data, error } = await supabase.storage
            .from("produit-images/public")
            .download(this.produit.images[0]);
          if (error) throw error;
          this.src = URL.createObjectURL(data);
        } catch (error) {
          console.error("Error downloading image: ", error.message);
        }
      } else {
        this.src =
          "https://dummyimage.com/300x200/000000/0fffff.png&text=" + this.produit.name;
      }
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
</style>
