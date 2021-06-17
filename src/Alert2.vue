<template>
  <div v-if="show" class="alert" :class="type">
    {{ message }}
    <div class="botones">
      <p class="advertencia">{{ mensajeSub }}</p>
      <button class="btn btn-primary botonBorrar" @click="EnviarPadre()">
        {{ aceptar }}
      </button>
      <button class="btn btn-light" @click="EnviarPadre1()">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script>
import { store } from "@/store/index.js";
export default {
  name: "Alert2",
  store,

  data() {
    return {
      show: false,
      type: "",
      message: "",
    };
  },
  props: {
    aceptar: String,
    mensajeSub: String,
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
    EnviarPadre() {
      this.$emit("escucharHijo", true);
      this.show = false;
    },
    EnviarPadre1() {
      this.$emit("escucharHijo1", true);
      this.show = false;
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
  background: #747d8c;
  border: none;
  padding: 7px 20px;
}
.advertencia {
  padding: 0;
  text-align: left;
  font-size: 13px;
}
</style>
