<template>
  <div v-if="src" style="display: inline">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-light"
      data-bs-toggle="modal"
      :data-bs-target="'#exampleModal' + src"
    >
      <img
        :src="src"
        alt="Avatar"
        class="avatar image"
        :style="{ height: size + 'em', width: size + 'em' }"
      />
    </button>
  </div>

  <div
    v-else
    class="avatar no-image"
    :style="{ height: size + 'em', width: size + 'em' }"
  />

  <!-- Modal -->
  <div
    class="modal fade modal-lg"
    :id="'exampleModal' + src"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1> -->
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img :src="src" alt="Avatar" style="width: 100%" />
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
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
