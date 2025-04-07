<template>
  <div if v-if="user">
    <div class="row hero">
      <div class="col-md-12">
        <h3>Création de catalogue</h3>
      </div>

      <div class="form-floating mb-3 col-md-4">
        <input
          type="text"
          class="form-control"
          id="produitInputName"
          placeholder="Nom"
          v-model="title"
        />
        <label for="produitInputName" class="col-form-label"
          >Nom du nouveau catalogue</label
        >
      </div>

      <div class="form-floating mb-3 col-md-7">
        <textarea
          class="form-control"
          placeholder="Description"
          id="produitTextareaDescription"
          v-model="description"
        ></textarea>
        <label for="produitTextareaDescription">Description</label>
      </div>

      <div class="form-floating mb-3 col-md-1">
        <button @click="createCatalogue" class="btn btn-primary btn-lg">Créer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
export default {
  name: "CatalogCreate",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  mounted() {},
  methods: {
    async createCatalogue() {
      console.log(this.user);
      const { data, error } = await supabase
        .from("catalogues")
        .insert([
          {
            owner: this.user.id, // Set the owner to the logged-in user's ID
            name: this.title, // Replace with the actual title
            description: this.description, // Optional description
          },
        ])
        .select();

      if (error) {
        console.error("Error creating catalogue:", error);
      } else {
        console.log("Catalogue created successfully:", data);
        this.$store.dispatch("broc/getMyCatalogues");
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.broc.user;
    },
  },
};
</script>

<style scoped>
.row > .form-floating > label {
  margin-left: 0.75em;
}
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: #f5f5f5;
  margin-bottom: 2rem;
}
</style>
