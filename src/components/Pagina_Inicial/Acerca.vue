<template>
  <div class="acerca">
    <div class="tituloInicial">
      <b-icon icon="house" class="iconito"></b-icon>
      <b-icon icon="chevron-compact-right"></b-icon> Acerca de nosotros
    </div>
    <hr class="linea" />
    <div class="subtitulo">
      SISTEMA DE COTIZACIONES DE LA UNIVERSIDAD MAYOR DE SAN SIMON

      <hr class="linea2" />
    </div>
    <div class="primero">
      <div
        class="contenido"
        :style="{
          backgroundImage: 'url(' + require('@/assets/Telet.png') + ')',
        }"
      >
        <div class="subs">INTRODUCCION</div>
        <div class="info">
          Ante las diferentes tareas académicas/administrativas que se hacen
          dentro de una universidad. Se introdujo en julio de 2021 el sistema de
          apoyo que permite a estas instituciones realizar de una mejor manera
          sus actividades.
        </div>
        <div class="subs">EMPRESA TRANSHUMANT</div>
        <div class="info">
          La empresa Transhumant fue la encargada del desarrollo de este sistema
          con el fin de apoyar a las tareas que existen dentro de la institución
          en cuanto a cotizaciones de productos o servicios. De esa manera hacer
          mas eficientes las actividades y tener un buen registro de toda la
          información necesaria para así tomar la mejor decisión.
        </div>
        <div class="subs">MISIÓN</div>
        <div class="info">
          Tenemos como misión ofrecer un sistema seguro ,facil de manejar, que
          nos permita automatizar el proceso de realización de cotizaciones ,
          minimizando el tiempo en que estas tomaban en ser realizadas de forma
          manual ademas de tener
        </div>
        <div class="subs">VISIÓN</div>
        <div class="info">
          La empresa Transhumant tiene como visión ofrecer sistemas que ayuden
          facilitar tareas administrativas sistematizadas en un sistema
          computacional.
        </div>
        <div class="subs">OBJETIVO</div>
        <div class="info">
          Ofrecer un sitema que brinde apoyo al proceso de cotizaciones de la
          Universidad Mayor de San Simón
        </div>
        <div class="subs">FUNCIONALIDADES</div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Gestionar usuarios.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Gestionar Items.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Gestionar Unidades.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Gestionar Empresas.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Gestionar Roles.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Realizar solicitudes de
          cotizaciones.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Revisar solicitudes.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Realizar cotizaciones.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Ver cotizaciones .
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Realizar cuadro
          compartivo.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Realizar un informe
          final.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Registrar presupuestos.
        </div>
        <div class="info">
          <b-icon icon="check2" class="listo"></b-icon>Respaldos y
          restauraciones del sistema.
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
  font-size: 20px;
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

.linea2 {
  border-bottom: 2px solid red;
  margin: 1% 10%;
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
</style>
