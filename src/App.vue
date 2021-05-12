<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="permisoHome" to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!username" to="/login">Iniciar Sesion</router-link> |
      <router-link v-if="permisoItemDeGasto" to="/registro_item"
        >Item</router-link
      >
      |
      <router-link v-if="permisoUnidadDeGasto" to="/registro_unidad"
        >Unidad</router-link
      >
      |
      <router-link v-if="permisoCrearUsuario" to="/register"
        >Registrar Usuario</router-link
      >
      |
      <a v-if="username" href="" @click="cerrar()">Cerrar sesion</a>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState([
      "permisoHome",
      "permisoItemDeGasto",
      "permisoUnidadDeGasto",
      "permisoCrearUsuario",
      "username",
    ]),
  },
  methods: {
    cerrar() {
      this.$store.commit("setUser", false);
      localStorage.setItem("username", this.username);
      console.log("hlaa  " + localStorage.getItem("username"));
      localStorage.removeItem("my-app");
      localStorage.removeItem("username");
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
:root {
  --color-title: #3d8af7;
  --color-name: #7c7c7c;
  --color-line: #c0c0c0;
  --fondo-gris-claro: #f7f6f6;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
