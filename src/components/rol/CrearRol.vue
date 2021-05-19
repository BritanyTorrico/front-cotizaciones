<template>
  <section class="crear_rol">
    <h2 class="rol_title">Crear rol</h2>
    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <div class="form_name">Nombre de rol:</div>
        <input
          name="nombreRol"
          :class="
            $v.dato.nombre_rol.$invalid
              ? 'form_check-input-error'
              : 'form_check-input'
          "
          type="text"
          minlength="5"
          maxlength="25"
          required
          placeholder="Ingrese nombre aquí"
          v-model="dato.nombre_rol"
        />

        <div class="form_check-error" v-if="!$v.dato.nombre_rol.required">
          Campo obligatorio.
        </div>
        <div class="form_check-error" v-if="!$v.dato.nombre_rol.alpha1">
          No se aceptan caracteres especiales.
        </div>
        <div class="form_check-error" v-if="!$v.dato.nombre_rol.minLength">
          Minimo 5 caracteres.
        </div>
      </div>
      <div class="form_section">
        <div class="form_name">Seleccione las funciones:</div>

        <div class="checkbox-style">
          <div class="input-check">
            <input
              type="checkbox"
              id="gestionUsuario"
              name="funcion"
              value="Gestionar Usuarios"
            />
          </div>

          <label for="gestionUsuario">Regisro de Usuarios</label><br />
          <div class="input-check">
            <input
              type="checkbox"
              id="gestionRol"
              name="funcion"
              value="Gestionar Roles"
            />
          </div>

          <label for="gestionRol">Regisro de Roles</label><br />
          <div class="input-check">
            <input
              type="checkbox"
              id="gestionUnidades"
              name="funcion"
              value="Gestionar unidadDeGasto"
            />
          </div>

          <label for="gestionUnidades">Regisro de Unidades de Gasto</label
          ><br />
          <div class="input-check">
            <input
              type="checkbox"
              id="gestionItems"
              name="funcion"
              value="Gestionar itemsDeGasto"
            />
          </div>

          <label for="gestionItems">Regisro de Items de Gasto</label><br />
          <div class="input-check">
            <input
              type="checkbox"
              id="empresa"
              name="funcion"
              value="Gestionar Empresa"
            />
          </div>

          <label for="empresa">Regisrtrar Empresas</label><br />
          <div class="input-check">
            <input
              type="checkbox"
              id="solicitud"
              name="funcion"
              value="Gestionar Solicitud"
            />
          </div>

          <label for="solicitud">Enviar Solicitudes</label><br />
        </div>
      </div>
      <div class="botoncito">
        <button class="form_button" @click="obtenerValor()">
          Crear
        </button>
      </div>
    </form>

    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  helpers,
} from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/);
export default {
  name: "CrearRol",
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert },
  data() {
    return {
      disabled: false,
      dato: {
        nombre_rol: null,
      },
      funciones: [],
    };
  },

  validations: {
    dato: {
      nombre_rol: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(25),
        alpha1,
      },
    },
  },
  methods: {
    keyhandler(e) {
      if (!e.key.match(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$/)) {
        e.preventDefault();
      }
    },
    async getFunciones() {
      this.funciones = [];
      const checkboxes = document.querySelectorAll(
        'input[name="funcion"]:checked'
      );
      checkboxes.forEach((checkbox) => {
        this.funciones.push(checkbox.value);
      });
    },
    async submitForm() {
      this.getFunciones();
      try {
        console.log("comienza envio");
        if (!this.$v.dato.$invalid && this.funciones.length > 0) {
          console.log("es valido");
          console.log(this.funciones[0]);
          await this.sendRolData();
          for (let i = 0; i < this.funciones.length; i++) {
            await this.sendFuncData(i);
          }

          this.alert("success", "Rol creado exitosamente");
        } else {
          console.log("es invalido");
          this.alert("warning", "Seleccione una función ");
        }
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async sendRolData() {
      try {
        console.log("comienza registro de rol");
        await this.$http.post(
          "roles",
          {
            nombre_rol: this.dato.nombre_rol,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
        console.log("termina registro de rol");
      } catch (error) {
        console.log("error en rol");
        throw new Error("Este rol ya esta registrado");
      }
    },
    async sendFuncData(index) {
      try {
        console.log("comienza a enviar funcion " + index);
        console.log(this.funciones[index]);
        await this.$http.post(
          "rolePerFunctions",
          {
            nombre_funcion: this.funciones[index],
            nombre_rol: this.dato.nombre_rol,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
        console.log("termina de enviar funcion " + index);
      } catch (error) {
        console.log("error en funcion");
        throw new Error("Este rol ya esta registrado");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
};
</script>

<style scoped>
.crear_rol {
  background-color: #f1f2f6;
  padding: 20px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.rol_title {
  width: 100%;
  text-align: left;
  color: #5c9aeb;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_crear {
  padding: 8px;
  text-align: left;
  width: 100%;
}

.crear_rol input {
  background-color: #f7f6f6;
  border-style: none none solid none;
  border: 0px 0px 5px 0px;
  border-color: #3a3a3a;
  border-radius: 3px;
  padding: 8px;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.crear_rol input ::placeholder {
  color: #999999;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_name {
  color: #3f4b5b;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_section {
  padding: 25px 0px 25px 0px;
}

.form_button {
  background-color: #0c59cf;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  width: 30%;
  padding: 8px 0;
}
.botoncito {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}

form label {
  width: 300px;
  font-weight: bold;
  display: inline-block;
}
.checkbox-style {
  margin-top: 20px;
}

.form_check-input {
  width: 100%;
  padding: 3px;
  margin: 3px 3px;
  border: none;
  border-bottom: 1px solid #999999;
  background-color: transparent;
  color: #3a3a3a;
  font-size: 14px;
  border-radius: 3px;
}
.form_check-input-error {
  width: 100%;
  padding: 3px;
  margin: 3px 3px;
  border: none;
  border-bottom: 1px solid #ed1c24;
  background-color: transparent;
  color: #3a3a3a;
  font-size: 14px;
  border-radius: 3px;
}
.form_check-input:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #999999;
}
.form_check-input-error:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #ed1c24;
}
.form_check-error {
  color: #ed1c24;
  font-size: 14px;
  padding: 0 0 0 2%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.input-check {
  width: 5%;
  float: left;
}
.laber-check {
  width: 95%;
  float: left;
}
</style>
