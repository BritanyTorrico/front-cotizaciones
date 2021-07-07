<template>
  <div class="descripcion">
    <div class="descripcion__info">
      <h2 class="subtitulo">Acerca de nosotros </h2>
      <hr class="linea" />
      <p class="contenido_des">
        Ante las diferentes tareas academicas/administrativas que se hacen dentro de una universidad. Se introdujo en julio de 2021 el sistema de apoyo que permite a estas instituciones realizar de una mejor manera sus actividades.
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: "Acercade",
}
</script>

<style scope>
.descripcion {
  padding: 50px;
  background: #ebebeb;
  width: 100%;
  height: 400px;
  
}
.descripcion__info {
  width: 100%;
  height: 15%;
  text-align: center;
  margin:auto;
}
.subtitulo {
  font-weight: bold;
  font-size: 60px;
}
.linea {
  height: 2px;
  background-color: red;
  width: 70%;
  margin:auto;
}
.contenido_des {
  font-size: 30px;
  padding: 50px;
}
.imagen_cotizacion{
  padding: 200px;
}
</style>