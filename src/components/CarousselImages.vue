<template>
  <div>
    <ImageComponent v-for="image in images" :key="image" :image="image" size="10" />
  </div>
</template>

<script>
import ImageComponent from "./ImageComponent.vue";

// import { supabase } from "@/lib/supabaseClient";
export default {
  name: "CarousselImages",
  props: ["images"],
  components: { ImageComponent },
  // methods: {
  //   async getSrc(image) {
  //     try {
  //       const { data, error } = await supabase.storage
  //         .from("produit-images/public")
  //         .download(image);
  //       if (error) throw error;
  //       console.log("image data", data);
  //       let url = URL.createObjectURL(data);
  //       console.log(url);
  //       return URL.createObjectURL(data);
  //     } catch (error) {
  //       console.error("Error downloading image: ", error.message);
  //     }
  //   },
  // },
};
</script>

<style scoped></style>
