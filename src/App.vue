<template>
  <div id="app">
    <b-navbar
      type="dark"
      id="barra"
      variant="primary"
      toggleable="md"
      class="navbar-horizontal"
    >
      <b-navbar-brand @click="paginaPrincipal()" id="logotipo"
        >UMSS</b-navbar-brand
      >
      <b-navbar-toggle
        target="nav-collapse"
        v-b-toggle.sidebar-1
      ></b-navbar-toggle>
      <b-sidebar id="sidebar-1" title="UMSS" shadow>
        <div class="px-3 py-2">
          <div class="cont-menu">
            <nav>
              <a v-if="permisoCrearUsuario" href="/usuarios"
                ><b-icon
                  icon="person"
                  class="iconito"
                  variant="outline-primary"
                ></b-icon
                >Usuarios</a
              >
              <a v-if="permisoCrearRol" href="/roles"
                ><b-icon icon="bag" class="iconito"></b-icon>Roles</a
              >
              <a v-if="permisoUnidadDeGasto" href="/unidades"
                ><b-icon icon="file-text" class="iconito"></b-icon>Unidades</a
              >
              <a v-if="permisoItemDeGasto" href="/items"
                ><b-icon icon="cart" class="iconito"></b-icon>items</a
              >
              <a v-if="permisoEmpresa" href="/empresas"
                ><b-icon icon="house-door" class="iconito"></b-icon>Empresas</a
              >
              <a v-if="permisoSolicitud" href="/solicitudes"
                ><b-icon icon="envelope" class="iconito"></b-icon>Nueva
                Solicitudes</a
              >
              <a v-if="permisoRevisionSolicitudes" href="/revisar_solicitudes"
                ><b-icon icon="envelope-open" class="iconito"></b-icon>Revisas
                Solicitudes</a
              >
              <a v-if="permisoCotizacion" href="/cotizaciones"
                ><b-icon icon="check2-circle" class="iconito"></b-icon>Nueva
                cotizacion</a
              >
              <a v-if="permisoFiltroCotizacion" href="/filtro_cotizaciones"
                ><b-icon icon="layout-split" class="iconito"></b-icon>Filtro de
                cotizaciones</a
              >
              <a v-if="permisoCuadroComparativo" href="/cuadro_comparativo"
                ><b-icon icon="receipt" class="iconito"></b-icon>Cuadro
                comparativo</a
              >
              <a v-if="permisoInformeFinal" href="/informe_final"
                ><b-icon icon="card-list" class="iconito"></b-icon>Informe
                final</a
              >
              <a v-if="permisoPresupuestoDep" href="/presupuestoDep"
                ><b-icon icon="graph-up" class="iconito"></b-icon>Presupuesto
                Departamento</a
              >
              <a v-if="permisoPresupuestoUnidad" href="/presupuestos"
                ><b-icon icon="pencil" class="iconito"> </b-icon>Presupuestos
                Unidades</a
              >
              <a v-if="permisoBitacora" href="/logss"
                ><b-icon icon="cloud-check" class="iconito"></b-icon
                >Bitacoras</a
              >
              <a v-if="permisoBackup" href="/back"
                ><b-icon icon="check" class="iconito"></b-icon>Respaldos</a
              >
              <a v-if="username" href="/" @click="cerrar()"
                ><b-icon icon="arrow-return-left" class="iconito"></b-icon
                >Cerrar Sesion</a
              >
              <a v-if="!username" href="/acercaDeNosotros"
                ><b-icon icon="house" class="iconito"></b-icon>Acerca de
                nosotros</a
              >
              <a v-if="!username" href="/login"
                ><b-icon icon="arrow-return-left" class="iconito"></b-icon
                >Iniciar Sesion</a
              >
            </nav>
          </div>
        </div>
      </b-sidebar>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-nav-item-dropdown
            class="nav-link-inner--text"
            v-if="contadorGestionar > 0"
            text="Gestionar"
            id="subtitu"
            right
          >
            <b-dropdown-item
              href="/usuarios"
              id="elemento"
              v-if="permisoCrearUsuario"
              >Usuarios</b-dropdown-item
            >
            <b-dropdown-item href="/roles" v-if="permisoCrearRol"
              >Roles</b-dropdown-item
            >
            <b-dropdown-item href="/unidades" v-if="permisoUnidadDeGasto"
              >Unidades</b-dropdown-item
            >
            <b-dropdown-item href="/items" v-if="permisoItemDeGasto"
              >Item</b-dropdown-item
            >
            <b-dropdown-item href="/empresas" v-if="permisoEmpresa"
              >Empresas</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            v-if="contadorSolicitudes > 0"
            text="Solicitudes"
            id="subtitu"
            right
          >
            <b-dropdown-item href="/solicitudes" v-if="permisoSolicitud"
              >Nueva Solicitud</b-dropdown-item
            >
            <b-dropdown-item
              href="/revisar_solicitudes"
              v-if="permisoRevisionSolicitudes"
              >Revisar Solicitudes</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="contadorCotizaciones > 0"
            text="Cotizaciones"
            id="subtitu"
            right
          >
            <b-dropdown-item v-if="permisoCotizacion" href="/cotizaciones"
              >Nueva Cotizacion</b-dropdown-item
            >
            <b-dropdown-item
              v-if="permisoFiltroCotizacion"
              href="/filtro_cotizaciones"
              >Filtro de cotizaciones</b-dropdown-item
            >
            <b-dropdown-item
              href="/cuadro_comparativo"
              v-if="permisoCuadroComparativo"
              >Cuadro Comparativo</b-dropdown-item
            >
            <b-dropdown-item
              v-if="permisoInformeFinal"
              href="/informe_final"
              id="elemento"
              >Informe Final</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="contadorPresupuestos > 0"
            text="Presupuestos"
            id="subtitu"
            right
          >
            <b-dropdown-item v-if="permisoPresupuestoDep" href="/presupuestoDep"
              >Presupuesto Departamento</b-dropdown-item
            >
            <b-dropdown-item
              v-if="permisoPresupuestoUnidad"
              href="/presupuestos"
              >Presupuestos Unidad Gasto</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="contadorSistema > 0"
            text="Sistema"
            id="subtitu"
            right
          >
            <b-dropdown-item v-if="permisoBitacora" href="/logss"
              >Bitacoras</b-dropdown-item
            >
            <b-dropdown-item v-if="permisoBackup" href="/back"
              >Respaldos</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item v-if="username" id="subtitu1" @click="cerrar()" href="/"
            >Cerrar Sesion</b-nav-item
          >
          <b-nav-item v-if="!username" id="subtitu1" href="/acercaDeNosotros"
            >Acerca de nosotros</b-nav-item
          >
          <b-nav-item href="/login" v-if="!username" id="subtitu1"
            >Iniciar Sesion</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view />
    </transition>

    <div class="page-layout" delay="6000">
      <footerPagina />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

const AsyncComponent = () => ({
  component: import("@/views/FooterPagina.vue"),
  delay: 2000,
  timeout: 6000,
});
export default {
  components: { footerPagina: AsyncComponent },
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
      "contadorGestionar",
      "contadorSolicitudes",
      "contadorCotizaciones",
      "contadorPresupuestos",
      "contadorSistema",
      "permisoPresupuestoDep",
      "permisoHistorialPresupuestoDep",
      "permisoPresupuestoUnidad",
      "permisoHistorialPresupuestoUnidad",
      "permisoCuadroComparativo",
      "permisoBitacora",
      "permisoBackup",
      "permisoInformeFinal",
    ]),
  },
  methods: {
    ...mapActions(["getPermi", "leerToken"]),

    async cerrar() {
      console.log(this.contadorGestionar);
      this.$store.commit("setUser", false);
      localStorage.setItem("username", this.username);

      localStorage.removeItem("username");

      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("token");
      this.$store.commit("borrarContador1");
      this.$store.commit("borrarContador2");
      this.$store.commit("borrarContador3");
      this.$store.commit("borrarContador4");
      this.$store.commit("borrarContador5");

      this.$store.commit("setPermisoUsuario", false);
      this.$store.commit("setPermisoItem", false);
      this.$store.commit("setPermisoUnidad", false);
      this.$store.commit("setPermisoRol", false);
      this.$store.commit("setPermisoSolicitud", false);
      this.$store.commit("setPermisoEmpresa", false);
      this.$store.commit("setLista");
      this.$store.commit("setToken", null);

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
      this.$store.commit("setPermisoBitacora", false);
      this.$store.commit("setPermisoBackup", false);
      this.$store.commit("setPermisoInformeFinal", false);
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
    async paginaPrincipal() {
      if (this.username) {
        await this.$router.push("/principal");
      } else {
        await this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
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
  width: 100%;
  min-height: 100vh;
}

:root {
  --animate-duration: 550ms;
}
a.navbar-brand {
  font-weight: bold !important;
  font-size: 22px !important;
  font-family: "Times New Roman", Times, serifs;
}
#logotipo {
  margin-left: 45px;
  cursor: pointer;
  font-weight: bold;
  font-family: "Times New Roman", Times, serifs;
}
#icono-toggle {
  margin-right: 30px;
  border: 1px solid;
}
#subtitu {
  padding-right: 5px;
}
@media (max-width: 795px) {
  #subtitu {
    padding: 0%;
  }
}
#subtitu a span {
  color: white;
}
#subtitu a span:hover {
  color: white;
  border-bottom: 2px solid #c7c7c7;
  padding-bottom: 5px;
}
#subtitu1 a {
  color: white;
}
#subtitu1 a:hover {
  border-bottom: 2px solid #c7c7c7;
  padding-bottom: 5px;
}

.cont-menu nav a {
  display: block;
  text-decoration: none;
  padding: 10px 20px;
  color: gray;
  border-left: 5px solid transparent;
  transition: all 400ms ease;

  width: 100%;
}
.cont-menu nav a svg {
  margin-top: 3px;
  float: left;
}
.cont-menu nav a:hover {
  border-left: 8px solid #c7c7c7;
  opacity: 0.2;
  background-color: rgb(0, 0, 0);
  color: white;
  svg {
    font-weight: bold;
    color: white;

    width: 20px;
    height: 25px;
    padding: 0;
    margin: 0;
  }
}
.iconito {
  text-align: left;
  align-items: left;
}
#sidebar-1 {
  color: #0d6efd !important;
}
strong {
  font-weight: bold;
  font-family: "Times New Roman", Times, serifs;
}
</style>
