<template>
  <div class="register" v-if="this.permisoItemDeGasto">
    <div class="register_container">
      <EditarItem class="register_item" />
    </div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
import EditarItem from "../components/item_gasto/Edit/EditarItem.vue";
export default {
  components: { EditarItem },
  name: "EditarItemGasto",
  computed: {
    ...mapState(["permisoItemDeGasto"]),
  },
  mounted() {
    if (!this.permisoItemDeGasto) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.register {
  min-height: 100vh;
  background-color: #46b1c95b;
  margin-top: 0;
}

.register_container {
  display: block;
  padding: 2.5% 22% 5% 22%;
}
@media (max-width: 800px) {
  .register_container {
    padding: 0%;
  }
}
</style>
