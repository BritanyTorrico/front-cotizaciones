<template>
  <div class="portada">
    <div class="portada__umss">
      <img src="@/assets/logoH.png" class="portada__imagen" />
    </div>
    <img src="@/assets/largoideal.jpg" class="portada__imagen__fondo" />
    <div class="portada__titulo">
      <h1>SISTEMA DE COTIZACIONES</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "VPortada",
};
</script>

<style scoped>
.portada__umss {
  text-align: left;
  margin-left: 30px;
}
.portada__imagen {
  width: 180px;
  height: 90px;
  object-fit: contain;
}

.portada__imagen__fondo {
  width: 80%;
  height: 400px;
}

.portada__titulo {
  margin-top: 25px;
  height: 70px;
  text-align: center;
  color: #003975;
}
</style>
