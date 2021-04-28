<template>
  <div class="base">
    <div class="container">
      <form class="form" @submit.prevent="submitForm">
        <img class="form__img" src="@/assets/umss.png" alt="" />

        <div class="form__input">
          <div class="form__name">NOMBRE DE USUARIO:</div>
          <input
            class="form__caja"
            type="text"
            v-model="users.nombre_usuario"
          />
        </div>
        <div class="form_check-error" v-if="!$v.users.nombre_usuario.required">
          Campo obligatorio.
        </div>
        <div class="form_check-error" v-if="!$v.users.nombre_usuario.maxLength">
          Maximo 20 caracteres
        </div>
        <div class="form_check-error" v-if="!$v.users.nombre_usuario.alpha1">
          Sin caracteres especiales.
        </div>
        <div class="form__input">
          <div class="form__name">CONTRASEÑA:</div>
          <input class="form__caja" type="text" v-model="users.contrasena" />
        </div>
        <div class="form_check-error" v-if="!$v.users.contrasena.required">
          Campo obligatorio.
        </div>
        <div class="form_check-error" v-if="!$v.users.contrasena.maxLength">
          Maximo 20 caracteres.
        </div>

        <div class="form__section">
          <input class="form__section__boton" type="submit" value="Ingresar" />
        </div>
      </form>
      {{ users }}
      <Alert ref="alert"></Alert>
    </div>
  </div>
</template>

<script>
import { required, maxLength, helpers } from "vuelidate/lib/validators";
import Alert from "@/components/User/Alert.vue";
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/);
export default {
  name: "IniciarSesion",
  components: {
    Alert,
  },
  data() {
    return {
      users: {
        nombre_usuario: null,
        contrasena: null,
      },
    };
  },
  validations: {
    users: {
      nombre_usuario: {
        required,
        maxLength: maxLength(20),
        alpha1,
      },
      contrasena: {
        required,
        maxLength: maxLength(20),
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        if (!this.$v.users.$invalid) {
          console.log("inicio a verificar");
          await this.verificarDatos();
          console.log("termino verficacion");
          this.alert("success", "Ha iniciador sesion ");
        } else {
          console.log("datos incorrectos");
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        console.log("ERRROR");
        this.alert("warning", error);
      }
    },
    async verificarDatos() {
      try {
        console.log("metodo");
        await this.$http.get("secret", {
          nombre_usuario: this.users.nombre_usuario,
          contrasena: this.users.contrasena,
        });
        console.log("metodo termina");
      } catch (error) {
        throw new Error("Error inicio");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
};
</script>

<style scoped>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #46b1c95b;
  height: 640px;
}
.container {
  margin-top: 30px;
  border: 1px solid;
  width: 390px;
  padding: 20px;
  border-radius: 30px;
  background: var(--fondo-gris-claro);
  border: none;
}
.form__img {
  width: 250px;
  height: 300px;
  text-align: center;
}
.form__name {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 8px;
}
.form__section {
  text-align: center;
  width: 400px;
}
.form__section__boton {
  padding: 8px;
  background: var(--color-title);
  color: white;
  font-weight: bold;
  border: none;
  width: 41%;
  margin-right: 13px;
  margin-top: 20px;
}
.form__caja {
  padding: 5px;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: center;
  margin-left: 20px;
}
</style>
