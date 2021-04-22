<template>
  <div class="container">
    <div class="list__name">{{ nombreLista }}</div>
    <select>
      <option v-for="(item, index) in facultad" :key="index" value="1"
        >Windows Vista</option
      >
      <option value="2">Windows 7</option>
      <option value="3">Windows XP</option>
      <option value="10">Fedora</option>
      <option value="11">Debian</option>
      <option value="12">Suse</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ListaDesplegable",
  data() {
    facultad: ["Tecnologia", "Economia", "Derecho"];
  },
  props: {
    nombreLista: String,
  },
};
</script>

<style lang="css" scoped></style>
