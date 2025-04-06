<template>
  <div if v-if="user">
    <!-- <input type="text" v-model="title" placeholder="Nom du catalogue" />
    <textarea v-model="description" placeholder="Description du catalogue"></textarea>
    <button @click="createCatalogue">Create Catalogue</button> -->

    <div>
      <div class="mb-3">
        <label for="produitInputName" class="form-label">Nom de catalogue</label>
        <input
          type="text"
          class="form-control"
          id="produitInputName"
          aria-describedby="emailHelp"
          v-model="title"
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
          v-model="description"
        />
      </div>
      <button @click="createCatalogue" class="btn btn-primary">Créer le catalogue</button>
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

<style scoped></style>
