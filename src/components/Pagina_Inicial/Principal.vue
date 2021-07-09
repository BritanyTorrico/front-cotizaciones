<template>
  <div
    class="contenedor"
    :style="{
      backgroundImage: 'url(' + require('@/assets/bonita.jpg') + ')',
    }"
  >
    <div class="descripcion">
      <div class="titulo">SISTEMA DE COTIZACIONES</div>
      <p class="">
        Bienvenido al sistema de cotizaciones de la Universidad Mayor de San
        Simon, donde usted podra manejar de manera mas practica cotizaciones de
        toda la universidad de manera mas rapida y sencilla. El sistema permite
        la administración y gestión de: cotizaciones, usuarios, items y unidades
        y le permite agregar los datos de la empresa ,registrar presupuestos
        ,realizar solicitudes , cotizaciones un cuadro comparativo entre otros.
      </p>
    </div>
    <div class="opcionesContenedor">
      <div class="izquierda">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="person"
          titulo="Administración de Usuarios."
        ></opciones>
      </div>
      <div class="derecha">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="file-text"
          titulo="Gestionar Unidades de Gasto."
        ></opciones>
      </div>
      <div class="izquierda">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="house"
          titulo="Guardar información de empresas."
        ></opciones>
      </div>
      <div class="derecha">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="envelope"
          titulo="Crear solicitudes de cotización."
        ></opciones>
      </div>
      <div class="izquierda">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="card-checklist"
          titulo="Revisión de cotizaciones"
        ></opciones>
      </div>
      <div class="derecha">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="ui-checks-grid"
          titulo="Realizar un cuadro comparativo"
        ></opciones>
      </div>
      <div class="izquierda">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="graph-up"
          titulo="Registro de presupuestos"
        ></opciones>
      </div>
      <div class="derecha">
        <opciones
          colorIcono="#FFFFFF"
          nombreIcono="clipboard-check"
          titulo="Informe final y mucho mas..."
        ></opciones>
      </div>
    </div>
  </div>
</template>

<script>
import opciones from "./opciones.vue";
export default {
  components: { opciones },
  name: "Principal",
};
</script>

<style scoped>
.contenedor {
  width: 100%;
  min-height: 91vh;
  padding: 2.5%;
  padding-bottom: 0%;
}

.descripcion {
  color: white;

  width: 32%;
  position: absolute;
  bottom: 0;
  right: 0;
  font-family: Source Sans Pro, arial, helvética;
  font-size: 16.4px;
  padding: 3%;

  height: 60%;
  text-align: left;
}
.titulo {
  font-size: 24px;
  text-align: center;
  font-weight: bold;

  padding-bottom: 3%;
  font-family: helvética;
}
.opcionesContenedor {
  width: 45%;

  margin-left: 5%;
}
.derecha {
  margin-left: 30%;
}
.izquierda {
  margin-right: 30%;
}
</style>
