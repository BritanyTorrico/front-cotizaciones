<template>
  <div class="card mb-3" style="max-width: 400px;">
    <div class="row g-0">
      <div class="col-md-4" :style="styles1">
        <font-awesome-icon class="iconito" :icon="['fas', `${nombreIcono}`]" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ titulo }}</h5>
          <p class="card-text">{{ contenido }}''</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelopeOpenText);
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
.permiso-contenedor {
  width: 100%;

  border: 3px solid;
  display: flex;
}
.iconito {
  height: 100%;
  border: 1px solid;
  width: 100%;
}
</style>
