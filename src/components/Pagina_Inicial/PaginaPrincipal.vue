<template>
  <div class="descripcion">
    <div class="descripcion__info">
      <h2 class="subtitulo">Descripción del sistema</h2>
      <hr class="linea" />
      <p class="contenido_des">
        Bienvenido al sistema de cotizaciones de la Universidad Mayor de San
        Simon,donde usted podra manejar de manera mas practica cotizaciones de
        toda la universidad , El sistema de cotizaciones: Es un sistema web para
        que puedas administrar cotizaciones. Tu puedes facilmente administrar: /
        Solicitudes / Unidades de gasto / items / servicios / usuarios /
        Empresas / Presupuestos / Cotizaciones y hasta realizar un cuadro
        comparativo para la cotización de manera mas sencilla y rapida.
      </p>
    </div>
    <div class="desripcion__imagenes">
      <div>
        <img src="@/assets/coti.jpg" class="imagen__cotizacion" />
        <img src="@/assets/transhumant.jpg" class="imagen__transhumant" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginaPrincipal",
};
</script>

<style scoped>
.descripcion {
  padding: 30px;
  background: #ebebeb;
  width: 100%;
  height: 450px;
  display: flex;
}
.descripcion__info {
  width: 50%;
  height: 100%;
  text-align: left;
}
.subtitulo {
  font-weight: bold;
}
.linea {
  height: 2px;
  background-color: red;
  width: 70%;
}
.desripcion__imagenes {
  width: 50%;
  padding-top: 20px;
}
.imagen__cotizacion {
  width: 80%;
  height: 285px;
}
.imagen__transhumant {
  width: 80%;
  height: 100px;
}
.contenido_des {
  font-size: 18px;
  padding: 20px;
}
</style>
