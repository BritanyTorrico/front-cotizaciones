<template>
  <div class="contenedor-permi">
    <card-permiso
      colorIcono="#0D6EFD"
      colorFondo=" #d30c6c"
      nombreIcono="user-secret"
      titulo="Gestionar Usuarios"
      contenido="Loremasda dasdasd asdasdasdad asdaa"
    ></card-permiso>
  </div>
</template>

<script>
import CardPermiso from "../components/Pagina_Inicial/CardPermiso.vue";
export default {
  components: { CardPermiso },
  name: "PaginaPermisos",
};
</script>

<style scoped>
.contenedor-permi {
  height: 543px;
  width: 100%;
  border: 1px solid red;
}
</style>
