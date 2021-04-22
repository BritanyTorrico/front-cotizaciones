<template>
  <div class="container">
    <div class="container__label">{{ nombreLista }}</div>
    <select class="container__list">
      <option
        xlass="container__list__option"
        v-for="(item, index) in facultad"
        :key="index"
        value="facultad[index"
      >
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
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 80%;
  color: #576574;
  padding: 6px;
}
.container__list__option {
}
</style>
