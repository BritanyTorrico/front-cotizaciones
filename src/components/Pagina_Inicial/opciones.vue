<template>
  <div class="opciones">
    <div :style="styles1">
      <b-icon :icon="nombreIcono" class="iconito"></b-icon
      ><label class="nombre">{{ titulo }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "opciones",

  props: {
    titulo: String,
    nombreIcono: String,
    colorFondo: String,
    colorIcono: String,
  },
  computed: {
    styles1() {
      return "color: " + `${this.colorIcono}`;
    },
  },
};
</script>

<style scoped>
.opciones {
  width: 90%;
  background-color: rgba(71, 30, 30, 0.07);
  height: 2.8em;
  box-shadow: -6px 6px 6px -6px white;
  margin-bottom: 1.5em;
  font-family: helvética;
}
.nombre {
  padding: 0;
  margin: 0;
  color: white !important;
  opacity: 1;
  padding-top: 0.5em;
  font-size: 18px;
  width: 70%;
  height: 100%;
}
@media (max-width: 1200px) {
  .nombre {
    font-size: 15px;
  }
}
@media (max-width: 1000px) {
  .nombre {
    font-size: 14px;
  }
}
@media (max-width: 600px) {
  .nombre {
    font-size: 11px;
  }
}
.iconito {
  width: 20%;
  padding: 0;
  margin-top: 10px;

  float: left;
  font-size: 28px;
}
</style>
