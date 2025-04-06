<template>
  <div>
    <!-- Produit {{ produit }}
    <hr /> -->
    <button @click="supprimerProduit" class="btn btn-danger">Supprimer le produit</button>
    <div>
      <div class="mb-3">
        <label for="produitInputName" class="form-label">Nom de produit</label>
        <input
          type="text"
          class="form-control"
          id="produitInputName"
          v-model="produit.name"
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
          v-model="produit.description"
        />
      </div>
      <div class="mb-3">
        <label for="qtite" class="form-label">Quantité</label>
        <input
          type="number"
          class="form-control"
          id="qtite"
          v-model="produit.quantite"
          value="1"
        />
      </div>

      <div class="mb-3">
        <label for="prix" class="form-label">Prix</label>
        <input type="number" class="form-control" id="prix" v-model="produit.prix" /> €
      </div>

      <div class="mb-3">
        <label for="images" class="form-label">Images</label>
        Uploading : {{ uploading }}
        <input type="file" class="form-control" id="images" v-on:change="uploadImage" />
      </div>

      <div>
        <div v-for="image in produit.images" :key="image" style="display: inline">
          <ImageComponent :image="image" size="10" />
          <button
            class="btn btn-danger"
            @click="deleteImage(image)"
            style="display: inline; margin: 5px; vertical-align: top"
          >
            X
          </button>
        </div>
      </div>
      <!-- <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->

      <label for="produitInputTags" class="form-label">Tags/ Catégories</label>
      <input
        type="text"
        class="form-control"
        id="produitInputTags"
        v-model="produit.tags"
      />

      <button @click="enregistrer" class="btn btn-primary">Enregistrer</button>
    </div>
    <!-- Catalogue {{ catalogue }}
    <hr />
    User {{ user }} -->
  </div>
</template>

<script>
import ImageComponent from "../components/ImageComponent.vue";
import { supabase } from "@/lib/supabaseClient";
export default {
  name: "ProduitView",
  components: { ImageComponent },
  data() {
    return {
      uploading: false,
    };
  },
  methods: {
    enregistrer() {
      this.produit.catalogue = this.catalogue.id;
      this.$store.dispatch("broc/enregistrerProduit", this.produit);
    },
    async uploadImage(event) {
      this.produit.images == null ? (this.produit.images = []) : null;
      console.log(event.target.files);
      let files = event.target.files;
      try {
        this.uploading = true;
        if (!files || files.length === 0) {
          throw new Error("You must select an image to upload.");
        }
        const file = files[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("produit-images/public")
          .upload(filePath, file);
        if (uploadError) throw uploadError;
        console.log("update:path", filePath);
        console.log("upload");

        if (this.produit.images.indexOf(filePath) === -1) {
          this.produit.images.push(filePath);
          console.log(this.produit);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.uploading = false;
      }
    },
    async deleteImage(image) {
      console.log(image);
      let answer = confirm("Voulez-vous vraiment supprimer cette image ?");
      if (!answer) return;
      const { data, error } = await supabase.storage
        .from("produit-images")
        .remove(["/public/" + image]);
      if (error) throw error;
      console.log(data);
      this.produit.images.splice(this.produit.images.indexOf(image), 1);
    },
    async supprimerProduit() {
      let answer = confirm("Voulez-vous vraiment supprimer ce produit ?");
      if (!answer) return;
      this.$store.dispatch("broc/supprimerProduit", this.produit);
    },
  },
  watch: {
    catalogue() {
      this.produit.catalogue = this.catalogue.id;
    },
  },
  computed: {
    user() {
      return this.$store.state.broc.user;
    },
    produit() {
      return this.$store.state.broc.produit;
    },
    catalogue() {
      return this.$store.state.broc.catalogue;
    },
  },
};
</script>

<style scoped></style>
