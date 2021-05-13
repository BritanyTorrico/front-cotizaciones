<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="success">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">UMSS</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav id="nav">
            <b-nav-item v-if="permisoHome" to="/" exact>Home</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item v-if="!username" to="/login">Iniciar Sesion</b-nav-item>
            <b-nav-item v-if="permisoItemDeGasto" to="/registro_item"
              >Item</b-nav-item
            >
            <b-nav-item v-if="permisoUnidadDeGasto" to="/registro_unidad"
              >Unidad</b-nav-item
            >
            <b-nav-item v-if="permisoCrearUsuario" to="/register"
              >Registrar Usuario</b-nav-item
            >
            <b-nav-item v-if="username" @click="cerrar()"
              >Cerrar Sesion</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <!--<div id="nav">
      <router-link v-if="permisoHome" to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="!username" to="/login">Iniciar Sesion</router-link>
      <router-link v-if="permisoItemDeGasto" to="/registro_item"
        >Item</router-link
      >

      <router-link v-if="permisoUnidadDeGasto" to="/registro_unidad"
        >Unidad</router-link
      >

      <router-link v-if="permisoCrearUsuario" to="/register"
        >Registrar Usuario</router-link
      >

      <a v-if="username" href="" @click="cerrar()">Cerrar sesion</a>
    </div>-->
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  created() {
    this.leerToken();
  },
  computed: {
    ...mapState([
      "permisoHome",
      "permisoItemDeGasto",
      "permisoUnidadDeGasto",
      "permisoCrearUsuario",
      "username",
      "listaPermisos",
    ]),
  },
  methods: {
    ...mapActions(["getPermi", "leerToken"]),
    cerrar() {
      this.$store.commit("setUser", false);
      localStorage.setItem("username", this.username);
      console.log("hlaa  " + localStorage.getItem("username"));

      localStorage.removeItem("username");
      localStorage.removeItem("token");

      this.$store.commit("setPermisoUsuario", false);
      this.$store.commit("setPermisoItem", false);
      this.$store.commit("setPermisoUnidad", false);
      this.$store.commit("setPermisoRol", false);
      this.$store.commit("setPermisoSolicitud", false);
      this.$store.commit("setLista");

      sessionStorage.removeItem("my-app");

      this.$router.push("/login");
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
#nav a {
  font-weight: bold;
  color: white;
}
#nav a.router-link-exact-active {
  color: #7bed9f;
}
</style>
