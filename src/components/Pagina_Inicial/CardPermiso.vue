<template>
  <div class="card mb-3 " style="max-width:300px;  max-height: 200px;">
    <div class="row g-0">
      <div
        class="col-md-4"
        :style="styles1"
        style="max-width:350px;  max-height: 300px;"
      >
        <b-icon :icon="nombreIcono" class="iconito"></b-icon>
      </div>

      <div class="col-md-8">
        <div class="card-body" style="max-width:350px;  max-height: 300px;">
          <h5 class="card-title titulo">{{ titulo }}</h5>
          <hr class="linea" />
          <p class="card-text contenido">
            {{ contenido }}
          </p>
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
