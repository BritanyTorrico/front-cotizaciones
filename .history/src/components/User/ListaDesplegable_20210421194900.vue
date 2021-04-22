<template>
  <div class="container">
    <div class="list__name">{{ nombreLista }}</div>
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

<style lang="css" scoped></style>
