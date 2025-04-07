<template>
  <div>
    <h1>{{ produit.name }}</h1>
    <div style="position: relative">
      <button
        @click="supprimerProduit"
        class="btn btn-danger"
        style="position: absolute; right: 0px; top: 0px"
      >
        <i class="bi bi-trash"></i> Supprimer ce produit
      </button>
    </div>
    <div class="hero">
      <div class="row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="produitInputName"
              v-model="produit.name"
            />
            <label for="produitInputName" class="form-label">Nom de produit</label>
          </div>

          <div class="form-floating mb-3">
            <textarea
              class="form-control"
              placeholder="Description"
              id="produitTextareaDescription"
              style="height: 150px"
              v-model="produit.description"
            ></textarea>
            <label for="produitTextareaDescription">Description</label>
          </div>
        </div>
        <div class="col-md-6 row">
          <div class="form-floating mb-3 col-md-6">
            <input type="number" class="form-control" id="prix" v-model="produit.prix" />
            <label for="prix" class="form-label">Prix en €uros</label>
          </div>
          <div class="form-floating mb-3 col-md-6">
            <input
              type="number"
              class="form-control"
              id="qtite"
              v-model="produit.quantite"
            />
            <label for="qtite" class="form-label">Quantité</label>
          </div>

          <div class="form-floating mb-3 col-md-12">
            <input
              type="text"
              class="form-control"
              id="produitInputTags"
              v-model="produit.tags"
            />
            <label for="produitInputTags" class="form-label">Tags/ Catégories</label>
          </div>
          <div class="row">
            <button @click="enregistrer" class="btn btn-success btn col-md-5 m-1">
              <i class="bi bi-floppy2-fill"></i> Enregistrer le produit
            </button>
            <button @click="editProduit(null)" class="btn btn-success col-md-5 m-1">
              <i class="bi bi-floppy2-fill"></i> Enregistrer et Ajouter <br />un nouveau
              produit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="hero">
      <div class="row">
        <input type="file" class="upload_btn" id="images" v-on:change="uploadImage" />
        <button type="button" class="btn btn-primary overlay-layer">
          <i class="bi bi-image"></i> Ajouter une image
        </button>
        <!-- Uploading : {{ uploading }} -->
      </div>

      <div class="row mb-3 hero">
        <div
          class="col-auto"
          v-for="image in produit.images"
          :key="image"
          style="position: relative"
        >
          <div>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteImage(image)"
              style="z-index: 2; position: absolute; top: 0px; right: 10px"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <ImageComponent :image="image" size="8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "../components/ImageComponent.vue";
import { supabase } from "@/lib/supabaseClient";
export default {
  name: "ProduitEdit",
  components: { ImageComponent },
  data() {
    return {
      uploading: false,
    };
  },
  methods: {
    async enregistrer() {
      this.produit.catalogue = this.catalogue.id;
      let result = await this.$store.dispatch("broc/enregistrerProduit", this.produit);
      console.log(result);
    },
    async editProduit(id) {
      await this.enregistrer();
      this.$store.dispatch("broc/getProduit", id);
      this.$router.push({
        name: "produit",
      });
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
        this.enregistrer();
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
      this.enregistrer();
    },
    async supprimerProduit() {
      let answer = confirm("Voulez-vous vraiment supprimer ce produit ?");
      if (!answer) return;
      this.$store.dispatch("broc/supprimerProduit", this.produit);
      this.$router.push({
        name: "catalogue",
      });
    },
  },
  watch: {
    catalogue() {
      this.produit.catalogue = this.catalogue.id;
    },
    produit() {
      console.log(this.produit);
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

<style scoped>
.overlay-layer {
  width: 200px;
  height: 40px;
  position: absolute;
  margin-top: -40px;
  z-index: 0;
}
.upload_btn {
  position: absolute;
  width: 200px;
  height: 40px;
  margin-top: -40px;
  z-index: 10;
  opacity: 0;
  cursor: pointer;
}
</style>
