<template>
  <img
    v-if="src"
    :src="src"
    alt="Avatar"
    class="avatar image"
    :style="{ height: size + 'em', width: size + 'em' }"
  />
  <div
    v-else
    class="avatar no-image"
    :style="{ height: size + 'em', width: size + 'em' }"
  />
  <!-- {{ image }}
  {{ src }} -->
</template>

<script>
import { supabase } from "@/lib/supabaseClient";
export default {
  name: "ImageComponent",
  props: ["image", "size"],
  data() {
    return { src: "" };
  },
  mounted() {
    this.updateImage();
  },
  methods: {
    async updateImage() {
      console.log(this.image);
      if (this.image) {
        try {
          const { data, error } = await supabase.storage
            .from("produit-images/public")
            .download(this.image);
          if (error) throw error;
          this.src = URL.createObjectURL(data);
        } catch (error) {
          console.error("Error downloading image: ", error.message);
        }
      }
    },
  },
  watch: {
    image() {
      this.updateImage();
    },
  },
};
</script>

<style scoped></style>
