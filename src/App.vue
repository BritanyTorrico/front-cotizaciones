<template>
  <div id="app">
    <b-navbar
      v-if="contador < 5"
      type="dark"
      class="navbar navbar-dark bg-primary"
    >
      <b-navbar-brand tag="h1" class="mb-0 umss" href="/">UMSS </b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav id="nav" class="ml-auto">
          <b-nav-item v-if="permisoHome" to="/" exact>Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item v-if="!username" to="/login">Iniciar Sesion</b-nav-item>
          <b-nav-item v-if="permisoCrearUsuario" to="/register"
            >Registrar Usuario</b-nav-item
          >
          <b-nav-item v-if="permisoCrearRol" to="/creaRol"
            >Crear Rol</b-nav-item
          >
          <b-nav-item v-if="permisoUnidadDeGasto" to="/registro_unidad"
            >Nueva Unidad</b-nav-item
          >
          <b-nav-item v-if="permisoItemDeGasto" to="/registro_item"
            >Nuevo Item</b-nav-item
          >
          <b-nav-item v-if="permisoEmpresa" to="/crear_empresa"
            >Registrar empresas</b-nav-item
          >
          <b-nav-item v-if="permisoSolicitud" to="/solicitudes"
            >Solicitudes</b-nav-item
          >
          <b-nav-item
            v-if="permisoRevisionSolicitudes"
            to="/revisar_solicitudes"
            >Revisar solicitudes</b-nav-item
          >
          <b-nav-item v-if="permisoCotizacion" to="/cotizacion"
            >Cotizaciones</b-nav-item
          >
          <b-nav-item v-if="permisoFiltroCotizacion" to="/filtro_cotizaciones"
            >Filtro de Cotizaciones</b-nav-item
          >
          <b-nav-item v-if="username" @click="cerrar()"
            >Cerrar Sesion</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--otro-->
    <b-navbar v-else toggleable type="dark " class="bg-primary">
      <b-navbar-brand href="#">UMSS</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav id="nav">
          <b-nav-item v-if="permisoHome" to="/" exact>Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item v-if="!username" to="/login">Iniciar Sesion</b-nav-item>
          <b-nav-item v-if="permisoCrearUsuario" to="/register"
            >Registrar Usuario</b-nav-item
          >
          <b-nav-item v-if="permisoCrearRol" to="/creaRol"
            >Crear Rol</b-nav-item
          >
          <b-nav-item v-if="permisoUnidadDeGasto" to="/registro_unidad"
            >Nueva Unidad</b-nav-item
          >
          <b-nav-item v-if="permisoItemDeGasto" to="/registro_item"
            >Nuevo Item</b-nav-item
          >
          <b-nav-item v-if="permisoEmpresa" to="/crear_empresa"
            >Registrar empresas</b-nav-item
          >
          <b-nav-item v-if="permisoSolicitud" to="/solicitudes"
            >Solicitudes</b-nav-item
          >
          <b-nav-item
            v-if="permisoRevisionSolicitudes"
            to="/revisar_solicitudes"
            >Revisar solicitudes</b-nav-item
          >
          <b-nav-item v-if="permisoCotizacion" to="/cotizacion"
            >Cotizaciones</b-nav-item
          >
          <b-nav-item v-if="permisoFiltroCotizacion" to="/filtro_cotizaciones"
            >Filtro de Cotizaciones</b-nav-item
          >
          <b-nav-item v-if="username" @click="cerrar()"
            >Cerrar Sesion</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--Hasta aqui-->
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view />
    </transition>
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
      "permisoCrearRol",
      "permisoSolicitud",
      "permisoEmpresa",
      "permisoRevisionSolicitudes",
      "permisoCotizacion",
      "permisoFiltroCotizacion",
      "contador",
    ]),
  },
  methods: {
    ...mapActions(["getPermi", "leerToken"]),
    cerrar() {
      this.$store.commit("setUser", false);
      localStorage.setItem("username", this.username);

      localStorage.removeItem("username");
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("token");

      this.$store.commit("setPermisoUsuario", false);
      this.$store.commit("setPermisoItem", false);
      this.$store.commit("setPermisoUnidad", false);
      this.$store.commit("setPermisoRol", false);
      this.$store.commit("setPermisoSolicitud", false);
      this.$store.commit("setPermisoEmpresa", false);
      this.$store.commit("setLista");
      this.$store.commit("setToken", null);
      this.$store.commit("setDelete");
      this.$store.commit("borrarContador");

      //nuevos

      this.$store.commit("setPermisoCotizacion", false);
      this.$store.commit("setPermisoRevisarCotizaciones", false);
      this.$store.commit("setPermisoFiltroCotizaciones", false);

      sessionStorage.removeItem("my-app");

      localStorage.removeItem("my-app");
      localStorage.removeItem("userID");
      localStorage.removeItem("roleCod");
      localStorage.removeItem("facu");
      localStorage.removeItem("depto");
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
  --color-name: #3f4b5b;
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
}
#nav a {
  color: white;
}
#nav a.nav-link:hover {
  background: #5591f5;
}
#nav a.router-link-exact-active {
  font-weight: bold;
  font-size: 17px;
}

a.navbar-brand {
  font-weight: bold !important;
  font-size: 22px !important;
  font-family: "Times New Roman", Times, serifs;
}
:root {
  --animate-duration: 550ms;
}
</style>
