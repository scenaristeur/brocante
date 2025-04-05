<template>
  <div>
    <h1>Connexion</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
  </div>
</template>

<script>
import { supabase } from "@/lib/supabaseClient";

export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const { error } = await supabase.auth.signIn({
        email: this.email,
        password: this.password,
      });
      if (error) alert(error.message);
      else this.$router.push("/");
    },
  },
};
</script>
