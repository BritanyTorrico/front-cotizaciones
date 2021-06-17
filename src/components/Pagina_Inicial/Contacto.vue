<template>
  <div class="contacto">
    <div class="contacto__seccion">
      <div class="titulo1">
        Consultas generales
      </div>
      <div class="contactos">
        <b-icon icon="envelope-fill" class="icono2"></b-icon
        >informaciones@umss.edu.bo
      </div>
      <div class="contactos">
        Teléfonos: <b-icon icon="telephone-fill " class="icono1"></b-icon>+591 4
        4251515

        <div class="phone1">
          <b-icon icon="telephone-fill " class="icono1"></b-icon>+591 4 4525161
        </div>
      </div>
    </div>
    <div class="contacto__seccion">
      <div class="titulo1">
        Consultas específicas
      </div>
      <div class="contactos">
        <b-icon icon="envelope-fill" class="icono2"></b-icon
        >transtestinghumant@gmail.com
      </div>
      <div class="contactos">
        Teléfonos: <b-icon icon="telephone-fill " class="icono1"></b-icon>+591 4
        4251515

        <div class="phone1">
          <b-icon icon="telephone-fill " class="icono1"></b-icon>+591 76471185
        </div>
      </div>
    </div>
    <div class="contacto__seccion">
      <div class="titulo1">
        Redes sociales
      </div>
      <div>
        <a href="https://www.facebook.com/UmssCochabamba">
          <b-icon icon="facebook" class="icono3"></b-icon
        ></a>
        <a href="https://www.instagram.com/umssboloficial/?hl=es-la">
          <b-icon icon="instagram" class="icono3"></b-icon
        ></a>
        <a href="https://twitter.com/umssboloficial?lang=es">
          <b-icon icon="twitter" class="icono3"></b-icon
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacto",
};
</script>

<style scoped>
.contacto {
  width: 100%;
  height: 200px;
  display: flex;
  background: #ebebeb;
  padding: 20px;
  color: #003975;
}
.titulo1 {
  border-left: 3px solid #003975;
  margin-left: 40px;
  text-align: left;
  padding: 6px 10px;
  font-size: 19px;
  margin-bottom: 20px;
}
.contacto__seccion {
  width: 100%;
}
.contactos {
  text-align: left;
  margin-left: 50px;
  margin-top: 10px;
}
.icono1 {
  margin: 0 10px;
}
.icono2 {
  margin-right: 10px;
}
.icono3 {
  margin: 10px;
  height: 40px;
  width: 30px;
}
.phone1 {
  margin-left: 78px;
}
a {
  color: #003975;
  height: 40px;
  width: 30px;
}
</style>
