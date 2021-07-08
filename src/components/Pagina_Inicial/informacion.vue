<template>
    <div class="informacion">
      <div class="informacion__seccion">
        <h3 class="informacion__titulo">Empresa Transhumant</h3>
        <p class="informacion__contenido">
          La empresa Transhumant fue la encargada del desarrollo de este sistema con el fin de apoyar a las tareas que existen dentro de la institucion en cuanto a cotizaciones de productos o servicios. De esa manera hacer mas eficientes las actividades y tener un buen registro de toda la informacion necesaria para asi tomar la mejor decision.
        </p>
      </div>
      <div class="informacion__seccion">
        <h3 class="informacion__titulo">Usuarios</h3>
        <p class="informacion__contenido ">
          Los usuarios de la institucion ahora podran acceder al sistema que les proveera de una excelente experiencia al momento de realizar sus actividades referentes a la cotizacion y al apoyo en la toma de desiciones en la adquisicion de sus siguientes productos o servicios 
        </p>
      </div>
    </div>
  
</template>

<script>
export default {
  name: "Informacion",
};
</script>

<style scoped>
.informacion {
  width: 100%;
  height: 430px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
}
.informacion__seccion {
  margin: 25px;
  margin-bottom: 45px;
  padding: 50px;
  background: #e9ecef;
  text-align: left;
  width: 50%;
}
.informacion__titulo {
  color: #050536;
  margin-bottom: 20px;
}
.informacion__contenido {
  font-size: 18px;
}
</style>
