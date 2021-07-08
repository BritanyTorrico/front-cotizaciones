<template>
  <div v-if="show" class="alert" :class="type">
    {{ message }}
    <div class="botones">
      <p class="advertencia">(Se borrara la lista si cambia de categoria)</p>
      <button class="btn btn-success botonBorrar" @click="eliminarLista()">
        Cambiar Categoria
      </button>
      <button class="btn btn-light" @click="hideAlert()">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script defer>
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
      this.hideAlert();
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
.botones {
  margin-top: 15px;
  text-align: right;
}
.botonBorrar {
  margin-right: 18px;
}
.advertencia {
  padding: 0;
  text-align: left;
  font-size: 13px;
}
</style>
