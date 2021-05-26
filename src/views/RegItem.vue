<template>
  <div class="register" v-if="this.permisoItemDeGasto">
    <div class="register_container">
      <RegistroItem class="register_item" />
    </div>
  </div>
</template>

<script>
import RegistroItem from "@/components/item_gasto/RegistroItem.vue";
import { mapState } from "vuex";
export default {
  name: "RegistroItemGasto",
  components: {
    RegistroItem,
  },
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
  background-color: #46b1c95b;
  margin-top: 0;
}

.register_container {
  display: block;
  padding: 2.5% 22% 5% 22%;
}
</style>
