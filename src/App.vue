<template>
  <div id="app">
    <b-navbar
      v-if="contador < 5"
      type="dark"
      class="navbar navbar-dark bg-primary ms-auto"
    >
      <b-navbar-brand id="logotipo" @click="paginaPrincipal()"
        >UMSS
      </b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav align-rigth>
        <b-navbar-nav id="nav" class="ms-auto">
          <b-nav-item v-if="!username" to="/login">Iniciar Sesion</b-nav-item>
          <b-nav-item v-if="permisoCrearUsuario" to="/usuarios"
            >Usuarios</b-nav-item
          >
          <b-nav-item v-if="permisoCrearRol" to="/roles">Roles</b-nav-item>
          <b-nav-item v-if="permisoUnidadDeGasto" to="/unidades"
            >Unidades</b-nav-item
          >
          <b-nav-item v-if="permisoItemDeGasto" to="/items">Items</b-nav-item>
          <b-nav-item v-if="permisoEmpresa" to="/empresas">Empresas</b-nav-item>
          <b-nav-item v-if="permisoSolicitud" to="/solicitudes"
            >Solicitudes</b-nav-item
          >
          <b-nav-item
            v-if="permisoRevisionSolicitudes"
            to="/revisar_solicitudes"
            >Revisar solicitudes</b-nav-item
          >
          <b-nav-item v-if="permisoCotizacion" to="/cotizaciones"
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
    <b-navbar
      v-else
      toggleable
      type="dark"
      class="navbar navbar-dark bg-primary"
    >
      <b-navbar-brand id="logotipo" @click="paginaPrincipal()"
        >UMSS</b-navbar-brand
      >

      <b-navbar-toggle id="icono-toggle" target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav right>
        <b-navbar-nav id="nav" class="ml-auto">
          <b-nav-item v-if="!username" to="/login" id="inciio"
            >Iniciar Sesion</b-nav-item
          >
          <b-nav-item v-if="permisoCrearUsuario" to="/usuarios"
            >Usuarios</b-nav-item
          >
          <b-nav-item v-if="permisoCrearRol" to="/roles">Roles</b-nav-item>
          <b-nav-item v-if="permisoUnidadDeGasto" to="/unidades"
            >Unidades</b-nav-item
          >
          <b-nav-item v-if="permisoItemDeGasto" to="/items">Items</b-nav-item>
          <b-nav-item v-if="permisoEmpresa" to="/empresas">Empresas</b-nav-item>
          <b-nav-item v-if="permisoSolicitud" to="/solicitudes"
            >Solicitudes</b-nav-item
          >
          <b-nav-item
            v-if="permisoRevisionSolicitudes"
            to="/revisar_solicitudes"
            >Revisar solicitudes</b-nav-item
          >
          <b-nav-item v-if="permisoCotizacion" to="/cotizaciones"
            >Cotizaciones</b-nav-item
          >
          <b-nav-item v-if="permisoFiltroCotizacion" to="/filtro_cotizaciones"
            >Filtro de Cotizaciones</b-nav-item
          >
          <b-nav-item v-if="permisoPresupuestoDep" to="/presupuestoDep"
            >Presupuesto Departamento</b-nav-item
          >
          <b-nav-item v-if="permisoPresupuestoUnidad" to="/presupuestos"
            >Presupuesto Unidad de gasto</b-nav-item
          >
          <b-nav-item v-if="permisoCuadroComparativo" to="/cuadro_comparativo"
            >Cuadro comparativo</b-nav-item
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
    <div class="claseFooter">
      <footer
        class="bg-primary text-center text-white text-lg-start footerClase"
      >
        <div class="text-center p-3">
          Derechos reservados © 2021 UMSS-TH.
        </div>
      </footer>
    </div>
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
      "username",
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
      "permisoPresupuestoDep",
      "permisoHistorialPresupuestoDep",
      "permisoPresupuestoUnidad",
      "permisoHistorialPresupuestoUnidad",
      "permisoCuadroComparativo",
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
      this.$store.commit("borrarContador");

      //nuevos

      this.$store.commit("setPermisoCotizacion", false);
      this.$store.commit("setPermisoRevisarCotizaciones", false);
      this.$store.commit("setPermisoFiltroCotizaciones", false);
      //tercer sprint
      this.$store.commit("setPermisoPresupuestoDep", false);
      this.$store.commit("setPermisoPresupuestoUnidad", false);
      this.$store.commit("setPermisoPresupuestoHistorialDep", false);
      this.$store.commit("setPermisoPresupuestoHistorialUnidad", false);
      this.$store.commit("setPermisoCuadroComparativo", false);
      //localstorage
      sessionStorage.removeItem("my-app");

      localStorage.removeItem("my-app");
      localStorage.removeItem("userID");
      localStorage.removeItem("roleCod");
      localStorage.removeItem("facu");
      localStorage.removeItem("depto");
      localStorage.removeItem("facultadPresupuesto");
      localStorage.removeItem("presupuestoLista");
      this.$router.push("/login");
    },
    paginaPrincipal() {
      if (this.username) {
        this.$router.push("/principal");
      } else {
        this.$router.push("/");
      }
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
.app {
  min-height: 100%;
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
#logotipo {
  margin-left: 45px;
  cursor: pointer;
}
#icono-toggle {
  margin-right: 30px;
  border: 1px solid;
}
#dereee {
  border: 2px solid;
  text-align: rigth;
}

.footerClase {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}
.claseFooter {
  min-height: 56px;
}
</style>
