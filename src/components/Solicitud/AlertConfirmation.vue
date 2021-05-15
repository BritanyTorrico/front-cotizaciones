<template>
  <div v-if="show" class="alert" :class="type">
    <span class="closebtn" @click="hideAlert()">&times;</span>
    {{ message }}
    <button @click="eliminarLista()">Aceptar</button>
    <button @click="hideAlert()">Cancelar</button>
  </div>
</template>

<script>
import { store } from "@/store/index.js";
export default {
  name: "AlertConfirmation",
  store,

  data() {
    return {
      show: false,
      type: "",
      message: "",
    };
  },
  methods: {
    showAlert(alertType, alertMessage) {
      this.type = alertType;
      this.message = alertMessage;
      this.show = true;
    },
    hideAlert() {
      this.show = false;
    },
    eliminarLista() {
      this.$store.commit("setDelete");
    },
  },
};
</script>

<style scoped>
.alert {
  display: block;
  padding: 20px;
  color: white;
  top: 30px;
  right: 0px;
  position: fixed;
  z-index: 2;
}
.success {
  background-color: #0064d0;
}
.warning {
  background-color: #ed1c24;
}
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.closebtn:hover {
  color: black;
}
</style>
