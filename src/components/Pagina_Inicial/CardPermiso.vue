<template>
  <div class="col-sm-3 ">
    <div class="card mb-3 " style="width:300px;  height: 160px;">
      <div class="row g-0">
        <div class="col-md-4" :style="styles1" style=" height: 160px;">
          <b-icon :icon="nombreIcono" class="iconito"></b-icon>
        </div>

        <div class="col-md-8 ">
          <div class="card-body" style=" height: 160px;">
            <h5 class="card-title titulo">{{ titulo }}</h5>
            <hr class="linea" />
            <p class="card-text contenido">
              {{ contenido }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPermiso",
  props: {
    titulo: String,
    contenido: String,
    nombreIcono: String,
    colorFondo: String,
    colorIcono: String,
  },
  computed: {
    styles1() {
      return (
        "background-color: " +
        `${this.colorFondo}` +
        ";color: " +
        `${this.colorIcono}`
      );
    },
  },
};
</script>

<style scoped>
.iconito {
  height: 100%;
  border: 1px solid;
  width: 100%;
  padding: 0px 5px;
}
.linea {
  padding: 0;
  margin: 0;
  background: grey;
  height: 2px;
}
.contenido {
  font-size: 12px;
}
.titulo {
  font-size: 15px;
  font-weight: bold;
}
</style>
