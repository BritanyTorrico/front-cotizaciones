<template>
  <div
    class="contactos"
    :style="{
      backgroundImage: 'url(' + require('@/assets/bonita2.jpg') + ')',
    }"
  >
    <div class="contenido">
      <p class="nombre1">Comunicate con Nosotros:</p>
      <div class="opcion">
        <b-icon icon="telephone-fill" class="iconito"></b-icon>
        <label class="nombre">Telefonos: +591 4 4251515 </label>
        <label class="nombre"> , +591 4 4251515 </label>
      </div>

      <div class="opcion">
        <b-icon icon="envelope-fill" class="iconito"></b-icon>
        <label class="nombre">transtestinghumant@gmail.com</label>
      </div>
      <div class="opcion">
        <b-icon icon="house-door-fill" class="iconito"></b-icon>
        <label class="nombre">Dirección: </label>
        <p class="nombre direccion ">
          Calle La Merced entre Av. Perú y Diego de Almagro, zona Ingavi
          1543,Cochabamba , Bolivia
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactoOficial",
};
</script>

<style scoped>
.contenido {
  text-align: left;
  font-family: Source Sans Pro, arial, helvética;
  width: 70%;
  padding: 8% 8%;
  padding-bottom: 0%;
}
.contactos {
  min-height: 91vh;
  font-size: 2.5em;
  color: #174d8b;
}
.nombre1 {
  font-size: 35px;
  font-weight: bold;
  border-left: 3px solid #003975;
  text-align: left;
  padding: 6px 10px;
  margin-bottom: 8%;
}
.nombre {
  font-size: 26px;
  padding-left: 4%;
  padding-right: 0;
}
.direccion {
  padding-left: 9%;
}
</style>
