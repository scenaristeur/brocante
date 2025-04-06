<template>
  <div>
    <!-- general -->
    <div class="row">
      <h3>Profil Public</h3>
      <p>
        Attention dans la version 1, ces informations sont publiques!
        <br />Ne mettez que celles que vous souhaitez diffuser, pour être contacté par les
        visiteurs. Nous développons la fonctionnalité de messagerie interne, pour éviter
        ce désagrément.
      </p>
      <div class="col-auto">
        <label for="inputNom" class="col-form-label">Nom</label>
      </div>
      <div class="col-auto">
        <input
          type="text"
          id="inputNom"
          class="form-control"
          v-model="profile.last_name"
        />
      </div>

      <div class="col-auto">
        <label for="inputPrénom" class="col-form-label">Prénom</label>
      </div>
      <div class="col-auto">
        <input
          type="text"
          id="inputPrénom"
          class="form-control"
          v-model="profile.first_name"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-auto">
        <label for="inputEtablissement" class="col-form-label">Etablissement</label>
      </div>
      <div class="col-auto">
        <input
          type="text"
          id="inputEtablissement"
          class="form-control"
          v-model="profile.etablissement"
        />
      </div>
      <div class="col-auto">
        <label for="inputAdresse" class="col-form-label">Adresse</label>
      </div>
      <div class="col-auto">
        <textarea
          type="text"
          id="inputAdresse"
          class="form-control"
          v-model="profile.adresse"
        />
      </div>
    </div>

    <div class="row">
      <h3>Préférences</h3>
      <div class="col-auto">
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

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactVisite"
            v-model="profile.allow_visite"
          />
          <label class="form-check-label" for="contactVisite">
            Autoriser les visiteurs à se rendre à l'adresse de votre établissement
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="contactInterne"
            disabled
            v-model="profile.allow_interne"
          />
          <label class="form-check-label" for="contactInterne">
            Contact par messagerie de l'appli
          </label>
          <span> (En cours de développement.)</span>
        </div>
      </div>
      {{ user.user_metadata }} meta
      <hr />
      {{ profile }}
    </div>

    <button @click="saveProfile" class="btn btn-success">Enregistrer</button>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  methods: {
    saveProfile() {
      this.profile.id = this.user.id;
      this.profile.allow_mail = true;
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

<style scoped></style>
