<template>
  <div class="avisos__contenedor">
    <div class="avisos__nombre">
      <h2 class="titulo1">Avisos</h2>

      <b-icon icon="chat-left-dots-fill" class="icono1"></b-icon>
    </div>

    <div class="avisos">
      <div class="avisos__seccion">
        <h3 class="aviso__titulo">Politicas del sistema</h3>
        <p class="aviso__contenido">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda,
          dolorem. Sequi ullam repellendus voluptatem adipisci, facere, eum,
          eaque molestiae laborum enim odit minus deserunt expedita quo veniam
          soluta quod ipsum?
        </p>
      </div>
      <div class="avisos__seccion">
        <h3 class="aviso__titulo">Inicio de Sesión</h3>
        <p class="aviso__contenido">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda,
          dolorem. Sequi ullam repellendus voluptatem adipisci, facere, eum,
          eaque molestiae laborum enim odit minus deserunt expedita quo veniam
          soluta quod ipsum?
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avisos",
};
</script>

<style scoped>
.avisos {
  width: 100%;
  height: 430px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
}
.avisos__seccion {
  margin: 25px;
  margin-bottom: 45px;
  padding: 50px;
  background: #e9ecef;
  text-align: left;
}
.avisos__nombre {
  display: flex;
}
.aviso__titulo {
  color: #003975;
  margin-bottom: 20px;
}
.titulo1 {
  text-align: left;
  padding-top: 20px;
  padding-left: 40px;
  font-size: 32px;
  font-weight: bold;
}
.icono1 {
  width: 90px;
  height: 40px;
  margin-top: 15px;
}
</style>
