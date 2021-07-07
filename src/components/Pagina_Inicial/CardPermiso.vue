<template>
  <div>
    <div class="card mb-3 carta ">
      <div class="row g-0">
        <div class="col-md-4 iconooo" :style="styles1">
          <b-icon :icon="nombreIcono" class="iconito"></b-icon>
        </div>

        <div class="col-md-8 ">
          <div class="card-body coooon">
            <h5 class="card-title titulo">{{ titulo }}</h5>
            <div class="d-none d-sm-block">
              <hr class="linea" />
              <p class="card-text contenido ">
                {{ contenido }}
              </p>
            </div>
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
.carta {
  width: 100%;
}
.iconooo {
  min-height: 29vh;
}
.coooon {
  max-height: 29vh;
  width: 100%;
  display: block;
  display: -webkit-box;

  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
