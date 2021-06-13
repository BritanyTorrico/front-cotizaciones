<template>
  <div class="contenedor-permi">
    <div class="bienvenido">
      <h2>Bienvenido...</h2>
      <h2>{{ nombre }} {{ apellido }} , {{ rol }}</h2>
    </div>

    <div>
      <div class="row">
        <div class="col-sm-3">
          <card-permiso
            colorIcono="#FFFFFF"
            colorFondo=" #2bcbba"
            nombreIcono="person-fill"
            titulo="Gestionar Usuarios"
            contenido="Usted puede crear usuarios con un rol especifico,editar los datos de los usuarios creados anteriormente."
          ></card-permiso>
        </div>

        <div class="col-sm-3">
          <card-permiso
            colorIcono="#FFFFFF"
            colorFondo=" #fed330"
            nombreIcono="file-text"
            titulo="Gestionar Unidades"
            contenido="Usted puede crear nuevas unidades de gasto ,editar y ver las unidades de gasto creados anteriormente."
          ></card-permiso>
        </div>
        <div class="col-sm-3">
          <card-permiso
            colorIcono="#FFFFFF"
            colorFondo=" #20bf6b"
            nombreIcono="cart"
            titulo="Gestionar Items"
            contenido="Usted puede crear nuevos items de gasto por categorias ,editar y ver los items de gasto creados anteriormente."
          ></card-permiso>
        </div>
        <div class="col-sm-3">
          <card-permiso
            colorIcono="#FFFFFF"
            colorFondo=" #fd9644"
            nombreIcono="bag"
            titulo="Gestionar Roles"
            contenido="Usted puede crear usuarios con un rol especifico,editar y ver los roles creados anteriormente."
          ></card-permiso>
        </div>
        <div class="col-sm-3">
          <card-permiso
            colorIcono="#FFFFFF"
            colorFondo=" #a55eea"
            nombreIcono="house-door"
            titulo="Gestionar Empresas"
            contenido="Usted puede crear usuarios con un rol especifico,editar los datos de los usuarios creados anteriormente."
          ></card-permiso>
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
    ...mapState(["token"]),
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
          await this.$http.get(`users/${localStorage.getItem("userID")}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0];
        this.nombre = datos.nombres;
        this.apellido = datos.apellidos;
      } catch (error) {
        console.log(error);
      }
    },
    async obtenerRol() {
      try {
        const datos = (
          await this.$http.get(`roles/${localStorage.getItem("roleCod")}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0];
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
}
.bienvenido {
  text-align: left;
  padding-bottom: 20px;
}
</style>
