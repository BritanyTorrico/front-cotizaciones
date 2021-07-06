<template>
  <div class="contenedor-permi" v-if="username">
    <div class="bienvenido">
      <h2 class="datos">
        Bienvenido...
      </h2>
      <h2>
        {{ nombre }} {{ apellido }} , {{ rol }}
        <b-icon
          icon="caret-down-fill "
          animation="cylon-vertical"
          class="iconito1"
        ></b-icon>
      </h2>
    </div>

    <div>
      <div class="row filas">
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoCrearUsuario"
        >
          <a class="redireccion" href="/usuarios">
            <card-permiso
              class="adentro"
              colorIcono="#FFFFFF"
              colorFondo=" #2bcbba"
              nombreIcono="person"
              titulo="Gestionar Usuarios"
              contenido="Usted puede crear usuarios con un rol especifico,editar los datos de los usuarios creados anteriormente."
            ></card-permiso>
          </a>
        </div>

        <div class="col-sm-6 col-md-4 col-xl-3 columnas" v-if="permisoCrearRol">
          <a class="redireccion" href="/roles">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #fd9644"
              nombreIcono="bag"
              titulo="Gestionar Roles"
              contenido="Usted puede crear usuarios con un rol especifico,editar y ver los roles creados anteriormente."
            ></card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoUnidadDeGasto"
        >
          <a class="redireccion" href="/unidades">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #fed330"
              nombreIcono="file-text"
              titulo="Gestionar Unidades"
              contenido="Usted puede crear nuevas unidades de gasto ,editar y ver las unidades de gasto creados anteriormente."
            ></card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoItemDeGasto"
        >
          <a class="redireccion" href="/items">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #20bf6b"
              nombreIcono="cart"
              titulo="Gestionar Items"
              contenido="Usted puede crear nuevos items de gasto por categorias ,editar y ver los items de gasto creados anteriormente."
            ></card-permiso>
          </a>
        </div>

        <div class="col-sm-6 col-md-4 col-xl-3 columnas" v-if="permisoEmpresa">
          <a class="redireccion" href="/empresas">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #a55eea"
              nombreIcono="house-door"
              titulo="Gestionar Empresas"
              contenido="Usted puede crear usuarios con un rol especifico,editar los datos de los usuarios creados anteriormente."
            ></card-permiso>
          </a>
        </div>

        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoSolicitud"
        >
          <a class="redireccion" href="/solicitudes">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #A3CB38"
              nombreIcono="envelope"
              titulo="Gestionar Solicitudes"
              contenido="Usted puede crear nuevas solicitudes de cotizaciones, editar y ver sus solicitudes creadas anteriormente."
            ></card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoRevisionSolicitudes"
        >
          <a class="redireccion" href="/revisar_solicitudes">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #e55039"
              nombreIcono="envelope-open"
              titulo="Revisar Solicitudes"
              contenido="Usted puede ver todas las solicitudes de cotizadciones entrantes y aceptar o rechazar las mismas."
            ></card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoCotizacion"
        >
          <a class="redireccion" href="/cotizaciones">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #f1c40f"
              nombreIcono="check2-circle"
              titulo="Realizar Cotización"
              contenido="Usted puede realizar la correspondiente cotización de las solicitud aceptadas para 3 empresas,ya sea en formato digital o impreso"
            ></card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoFiltroCotizacion"
        >
          <a class="redireccion" href="/filtro_cotizaciones">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #84817a"
              nombreIcono="layout-split"
              titulo="Ver cotizaciones"
              contenido="Usted puede ver todas las cotizaciones por diferentes filtros ya sea popr fechas,item/servicios , por el rubro de una empresa y mas."
            >
            </card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoPresupuestoDep"
        >
          <a class="redireccion" href="/presupuestoDep">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #ff6348"
              nombreIcono="graph-up"
              titulo="Presupuestos por departamento"
              contenido="Usted puede registrar todos los presupuestos por departamento y editar los mismos si ya existe algun registro."
            >
            </card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoPresupuestoUnidad"
        >
          <a class="redireccion" href="/presupuestos">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #70a1ff"
              nombreIcono="pencil"
              titulo="Presupuestos Unidad gasto"
              contenido="Usted puede registrar todos los presupuestos por unidad de gasto y editar los mismos si ya existe algun registro."
            >
            </card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoCuadroComparativo"
        >
          <a class="redireccion" href="/cuadro_comparativo">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo=" #7bed9f"
              nombreIcono="receipt"
              titulo="Cuadro Comparativo"
              contenido="Usted puede realizar un cuadro compartivo sobre una respectiva cotización "
            >
            </card-permiso>
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-3 columnas" v-if="permisoBitacora">
          <a class="redireccion" href="/logss">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo="#9c88ff"
              nombreIcono="cloud-check"
              titulo="Bitacoras"
              contenido="Usted puede revisar todas los modificaciones de todo el sistema "
            >
            </card-permiso>
          </a>
        </div>
        <div
          class="col-sm-6 col-md-4 col-xl-3 columnas"
          v-if="permisoInformeFinal"
        >
          <a class="redireccion" href="/informe_final">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo="#f1c40f"
              nombreIcono="card-list"
              titulo="Informe final"
              contenido="Usted puede revisar cuadros comparativos, realizar informes y aceptar o rechazar solicitudes"
            >
            </card-permiso>
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-xl-3 columnas" v-if="permisoBackup">
          <a class="redireccion" href="/back">
            <card-permiso
              colorIcono="#FFFFFF"
              colorFondo="#3498db"
              nombreIcono="check"
              titulo="Respaldo y Restauracion"
              contenido="Usted puede revisar ,crear y restaurar las informacion del sistema "
            >
            </card-permiso>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardPermiso from "../components/Pagina_Inicial/CardPermiso.vue";
import { mapState } from "vuex";
export default {
  components: { CardPermiso },
  name: "PaginaPermisos",
  computed: {
    ...mapState([
      "token",
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
      "permisoBitacora",
      "permisoBackup",
      "permisoInformeFinal",
    ]),
  },
  data() {
    return {
      nombre: null,
      apellido: null,
      rol: null,
    };
  },
  mounted() {
    this.obtenerDatos();
    this.obtenerRol();
  },
  methods: {
    async obtenerDatos() {
      try {
        const datos = (
          await this.$http.get(
            `getFullName?usuario=${localStorage.getItem("nombreUsuario")}`
          )
        ).data[0];
        console.log(datos);
        this.nombre = datos.nombres;
        this.apellido = datos.apellidos;
      } catch (error) {
        console.log(error);
      }
    },
    async obtenerRol() {
      try {
        const datos = (
          await this.$http.get(
            `getRoleName?usuario=${localStorage.getItem("nombreUsuario")}`
          )
        ).data[0];

        this.rol = datos.nombre_rol;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.contenedor-permi {
  min-height: 600px;
  padding: 20px 60px 20px 60px;
  min-width: ;
  /*home*/
}

.bienvenido {
  text-align: left;
  padding-bottom: 20px;
  color: #003975;
}
.datos {
  font-weight: bold;
}
.iconito1 {
  height: 25px;
}
.redireccion {
  text-decoration: none;
  color: #576574;
}
.columnas {
}
.adentro {
}
</style>
