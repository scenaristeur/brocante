<template>
  <div class="hero">
    <!-- general -->

    <h4>Informations publiques de contact</h4>
    <div class="alert alert-danger" role="alert">
      Attention dans la version 1 (en attendant le développement de la messagerie
      interne), ces informations sont publiques!
      <br />Ne remplissez que celles que vous souhaitez diffuser, pour être contacté par
      les acheteurs.
    </div>

    <div class="row">
      <div class="form-floating mb-3 col-md-4">
        <input
          type="text"
          class="form-control"
          id="inputNom"
          placeholder="Nom"
          v-model="profile.last_name"
          aria-describedby="nameHelpInline"
        />
        <label for="inputNom" class="col-form-label">Nom (minimum 3 charactères.)</label>
      </div>
      <div class="form-floating mb-3 col-md-4">
        <input
          type="text"
          class="form-control"
          id="inputPrenom"
          placeholder="Prénom"
          v-model="profile.first_name"
        />
        <label for="inputPrenom" class="col-form-label">Prénom</label>
      </div>

      <div class="form-floating mb-3 col-md-4">
        <input
          type="text"
          class="form-control"
          id="inputWebsite"
          placeholder="website"
          v-model="profile.website"
        />
        <label for="inputWebsite" class="col-form-label">Website (optionel)</label>
      </div>

      <div class="form-floating mb-3 col-md-4">
        <textarea
          class="form-control"
          placeholder="Présentation"
          id="inputPresenttion"
          style="height: 100px"
          v-model="profile.description"
        ></textarea>
        <label for="inputPresenttion">Présentation</label>
      </div>

      <div class="col-md-4" style="text-align: left">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactPhone"
            v-model="profile.allow_phone"
          />
          <label class="form-check-label" for="contactPhone">
            Contact par téléphone
          </label>
          :
          <span>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputPhone"
                placeholder="01.23.45.67.89"
                v-model="profile.phone_number"
              />
              <label for="floatingInputPhone">Numero de téléphone</label>
            </div>
          </span>
        </div>
      </div>

      <div class="col-md-4" style="text-align: left">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactMail"
            v-model="profile.allow_mail"
            checked
            disabled
          />
          <label class="form-check-label" for="contactMail"> Contact par email </label> :
          <span>{{ user.email }}</span>
        </div>
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactInterne"
            disabled
            v-model="profile.allow_interne"
          />
          <label class="form-check-label" for="contactInterne">
            Contact par message interne
          </label>
          <span> (bientôt dispo)</span>
        </div>
      </div>
      <div class="col-md-12" style="text-align: left">
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactVisite"
            v-model="profile.allow_visite"
          />
          <label class="form-check-label" for="contactVisite">
            Autoriser les acheteurs à se rendre à votre adresse.
          </label>
        </div>
      </div>

      <div class="form-floating mb-3 col-md-4">
        <input
          type="text"
          class="form-control"
          id="inputEtablissement"
          placeholder="Etablissement"
          v-model="profile.etablissement"
        />
        <label for="inputEtablissement" class="col-form-label"
          >Etablissement (optionel)</label
        >
      </div>

      <div class="form-floating mb-3 col-md-4">
        <textarea
          class="form-control"
          placeholder="Adresse"
          id="inputAdresse"
          style="height: 100px"
          v-model="profile.adresse"
        ></textarea>
        <label for="inputAdresse">Adresse</label>
      </div>
    </div>

    <button
      @click="saveProfile"
      class="btn btn-success"
      :disabled="!profile.last_name || profile.last_name.length < 3"
    >
      Enregistrer
    </button>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  methods: {
    saveProfile() {
      this.profile.id = this.user.id;
      this.profile.allow_mail = true;
      this.profile.email = this.user.email;
      if (this.profile.allow_phone != true) {
        this.profile.phone_number = null;
      }
      if (this.profile.allow_visite != true) {
        this.profile.adresse = null;
        this.profile.etablissement = null;
      }
      console.log("save profile", this.profile);
      this.$store.dispatch("broc/saveProfile", this.profile);
    },
  },
  computed: {
    user() {
      return this.$store.state.broc.user;
    },
    profile() {
      return this.$store.state.broc.profile;
    },
  },
};
</script>
