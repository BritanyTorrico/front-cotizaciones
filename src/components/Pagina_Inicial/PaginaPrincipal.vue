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
    <div class="descripcion__info">
      <h2 class="subtitulo">Presupuesto para los departamentos</h2>
      <hr class="linea" />
      <p class="contenido_des">
        Asigna a cada departamento el presupuesto que tendrá durante toda la gestion universitaria ajustando a las diferentes necesidades.
        Ten un control completo del presupuesto designado a los departamentos.
        Cada departamento sera consciente de cuanto podra invertir en los productos/sericios que consideran necesarios.
      </p>
    </div>
     <div class="descripcion__info">
      <h2 class="subtitulo">Creador de unidades de gasto</h2>
      <hr class="linea" />
      <p class="contenido_des">
        La universidad es una institucion grande, la misma tiene varias unidades de gasto. Cree y mantenga organizada todas las unidades de gasto de los diferentes departamentos. Mantiene una comunicacion con cada una de ellas para conocer las necesidades que tendra a lo largo de toda la gestion.
      </p>
    </div>
     <div class="descripcion__info">
      <h2 class="subtitulo">Realiza solicitudes</h2>
      <hr class="linea" />
      <p class="contenido_des">
        Cuando la unidad de gasto requiera algun producto/servicio, cree una solicitud de lo que se requiera. De esa manera, hara conocer lo que necesitara y si existe el presupuesto para poder contratar o adquirir el producto/servicio, esperando si su solicitud es aceptada o rechazada
      </p>
    </div>
    <div class="descripcion__info">
      <h2 class="subtitulo">Cotiza los productos/servicios con empresas</h2>
      <hr class="linea" />
      <p class="contenido_des">
        Realiza el formulario de las coizaciones ya sea de manera digital o imprime tus formularios. 
      </p>
    </div>
     <div class="descripcion__info">
      <h2 class="subtitulo">Manten un registro de las empresas</h2>
      <hr class="linea" />
      <p class="contenido_des">
        Mantiene la informacion de las empresas que hayan interactuado con la institucion. Ten registro de las empresas, contacta con ellas y obten un estimado de los precios que tienen en cuanto a sus productos/servicios
      </p>
    </div>
     <div class="descripcion__info">
      <h2 class="subtitulo">Generador de cuadro comparativo de cotizaciones</h2>
      <hr class="linea" />
      <p class="contenido_des">
        Cada una de las empresas tendran diferentes precios encuanto a sus productos o servicios. Por eso, ten la informacion y visualiza las cotizaciones hechas con las empresas y decide cual es la mejor opcion.
      </p>
    </div>
    <div class="descripcion__imagenes">
      <div>
        <img src="@/assets/coti.jpg" class="imagen__cotizacion"  />
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
  padding: 50px;
  background: #ebebeb;
  width: 100%;
  height: 2000px;
  display: inline-block;
}
.descripcion__info {
  width: 100%;
  height: 15%;
  text-align: center;
  display: block;
  margin:auto;
}
.subtitulo {
  font-weight: bold;
  font-size: 40px;
}
.linea {
  height: 2px;
  background-color: red;
  width: 70%;
  margin:auto;
}
.descripcion__imagenes {
  width: 50%;
  padding-top: 20px;
  margin:auto;
}
.imagen__cotizacion {
  width: 80%;
  height: 285px;
  
}
.contenido_des {
  font-size: 20px;
  padding: 50px;
 
}
</style>
