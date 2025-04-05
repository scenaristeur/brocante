<template>
  <div if v-if="user">
    <input type="text" v-model="title" />
    <textarea v-model="description"></textarea>
    <button @click="createCatalogue">Create Catalogue</button>
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
