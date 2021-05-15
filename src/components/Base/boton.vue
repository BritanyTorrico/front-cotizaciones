<template>
  <div>
    <div class="boton">
      <input type="submit" :value="nombre" class="boton__input" />
    </div>
  </div>
</template>

<script>
export default {
  name: "boton",
  props: {
    nombre: String,
  },
};
</script>

<style scoped>
.boton__input {
  width: 120px;
  height: 35px;
  border-radius: 30px;
  background: blue;
  color: white;
  font-weight: bold;
  border-bottom: none;
  border: none;
}
.boton {
  align-items: left;
  margin: 50px 15px;
  text-align: right;
}
</style>
