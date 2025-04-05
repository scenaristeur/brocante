<template>
  <div class="card">
    <img :src="produit.image" :alt="produit.titre" />
    <div class="card-body">
      <h3>{{ produit.titre }}</h3>
      <p>{{ produit.description }}</p>
      <p class="price">{{ produit.prix }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProduitCard",
  props: {
    produit: { type: Object, required: true },
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
