<template>
  <div
    class="acerca"
    :style="{
      backgroundImage: 'url(' + require('@/assets/acercaaaa.png') + ')',
    }"
  >
    <div class="subtitulo">
      TRANSHUMANT SRL.
    </div>
    <div class="primero">
      <div class="contenido">
        <div class="subs">Sobre nosotros:</div>
        <div class="info">
          Somos una familia empoderada que realiza esfuerzos incansables para
          cumplir con los objetivos estratégicos de la empresa y más aún a la
          hora de perseguir nuestros pasatiempos, entretenernos y divertirnos.
        </div>
        <img class="imagenLogo" src="@/assets/transhumant.jpg" alt="" />
        <div class="cuadros">
          <div class="mision">
            <div class="subs">MISIÓN</div>
            <div class="info">
              Transformar las aplicaciones de software empresariales y sus datos
              en un entorno colaborativo.
            </div>
          </div>
          <div class="vision">
            <div class="subs">VISIÓN</div>
            <div class="info">
              Construir tecnología de software para cambiar el mundo.
            </div>
          </div>
        </div>

        <div class="logo">
          TRANSHUMANT SRL.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Acerca",
  computed: {
    imageUrl: function() {
      return "url(" + "@/assets/ACERCA.png" + ")";
    },
  },
};
</script>

<style scoped>
.acerca {
  min-height: 100vh;
  font-family: Source Sans Pro, arial, helvética;
}
.tituloInicial {
  color: #545b62;
  text-align: left;
  font-size: 16px;
  background: #f5f5f5;
  padding: 1%;
}

.subtitulo {
  color: #003975;
  text-align: center;
  padding: 1% 10%;
  font-size: 35px;
  width: 100%;
}
.iconito {
  margin: 0px 20px;
}
.linea {
  height: 2px;
  color: #545b62;
  width: 100%;
  padding: 0;
  margin: 0;
}
.imagenLogo {
  padding: 2% 0%;
  width: 100%;
}

.contenido {
  padding: 0% 10%;

  width: 100%;
  height: 100%;
}

.subs {
  text-align: left;
  color: #003975;
  padding-top: 3%;
  font-size: 22px;
  font-weight: bold;
}
.info {
  text-align: left;
}
.logo {
  padding: 5% 0%;
  text-align: right;
  color: #003975;
  font-weight: bold;
  font-size: 20px;
  font-family: "Times New Roman", Times, serifs;
}
.listo {
  color: #003975;
  margin-right: 8px;
}
.cuadros {
  display: flex;
}
.mision {
  width: 50%;
  border: 1px solid gray;
  padding: 4%;
  margin: 1% 3%;
  box-shadow: -6px 6px 6px -5px black;
}
.vision {
  width: 50%;
  border: 1px solid gray;
  padding: 4%;
  margin: 1% 3%;
  box-shadow: -6px 6px 6px -5px black;
}
</style>
