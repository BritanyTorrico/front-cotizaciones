<template>
  <div class="container">
    <div class="formulario_label">{{ nombreLista }}</div>
    <select>
      <option v-for="(item, index) in facultad" :key="index" value="1">
        {{ facultad[index] }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  name: "ListaDesplegable",
  data() {
    return {
      facultad: ["Tecnologia", "Economia", "Derecho"],
    };
  },
  props: {
    nombreLista: String,
  },
};
</script>

<style lang="css" scoped>
.container {
  text-align: left;
  padding-top: 20px;
}
.formulario_label {
  padding-left: 6px;
  color: var(--color-name);
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
