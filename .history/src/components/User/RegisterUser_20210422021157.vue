<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="flex-container">
        <div class="form__image">
          <img src="@/assets/edificioUMSS.jpg" alt="" />
        </div>

        <div class="form__datos">
          <div class="form_title">
            <h1>Registrar Usuario</h1>
            <hr class="form__linea" />
          </div>
          <div class="form__section">
            <div class="form__name">
              <label
                ><div class="formulario_label">Nombre:</div>
                <input
                  v-on:keydown="keyhandler($event)"
                  :class="
                    $v.users.nombres.$invalid
                      ? 'form_check-input-error'
                      : 'form__input'
                  "
                  type="text"
                  placeholder="Ingrese su nombre"
                  v-model="users.nombres"
                />
              </label>
              <div class="form_check-error" v-if="!$v.users.nombres.required">
                Campo obligatorio.
              </div>
            </div>
            <div class="form__name">
              <label
                ><div class="formulario_label">Apellidos:</div>
                <input
                  :class="
                    $v.users.apellidos.$invalid
                      ? 'form_check-input-error'
                      : 'form__input'
                  "
                  type="text"
                  placeholder="Ingrese su apellido"
                  required
                  v-model="users.apellidos"
                />
              </label>
              <div class="form_check-error" v-if="!$v.users.apellidos.required">
                Campo obligatorio.
              </div>
            </div>
          </div>
          <div class="form__section">
            <div class="form__name">
              <label
                ><div class="formulario_label">Nombre de usuario:</div>
                <input
                  :class="
                    $v.users.nombre_usuario.$invalid
                      ? 'form_check-input-error'
                      : 'form__input'
                  "
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  v-model="users.nombre_usuario"
                  required
                />
              </label>
              <div
                class="form_check-error"
                v-if="!$v.users.nombre_usuario.required"
              >
                Campo obligatorio.
              </div>
            </div>
            <div class="form__name">
              <label
                ><div class="formulario_label">Celular:</div>
                <input
                  :class="
                    $v.users.celular.$invalid
                      ? 'form_check-input-error'
                      : 'form__input'
                  "
                  type="text"
                  placeholder="Ingrese su celular"
                  v-model="users.celular"
                />
              </label>
              <div class="form_check-error" v-if="!$v.users.celular.required">
                Campo obligatorio.
              </div>
            </div>
          </div>
          <div class="form__section2">
            <div class="formulario_label">Contraseña:</div>
            <input
              type="password"
              :class="
                $v.users.contrasena.$invalid
                  ? 'form_check-input-error'
                  : 'form__input'
              "
              placeholder="Ingrese su contraseña"
              v-model="users.contrasena"
            />
            <div class="form_check-error" v-if="!$v.users.contrasena.required">
              Campo obligatorio.
            </div>
          </div>
          <div class="form__section2">
            <div class="formulario_label">Confirmar Contraseña:</div>
            <input
              type="password"
              :class="
                $v.users.confirmarContraseña.$invalid
                  ? 'form_check-input-error'
                  : 'form__input'
              "
              placeholder="Ingrese su contraseña"
              v-model="users.confirmarContraseña"
            />
            <div
              class="form_check-error"
              v-if="!$v.users.confirmarContraseña.required"
            >
              Campo obligatorio.
            </div>
          </div>
          <div class="form__section3">
            <div class="container__base">
              <div class="container__label">Facultad</div>
              <select class="container__list" v-model="users.facultad">
                <option
                  class="container__list__option"
                  v-for="(item, index) in listfacultad"
                  :key="index"
                  value="1"
                >
                  {{ listfacultad[index] }}</option
                >
              </select>
            </div>
            <div class="container__base">
              <div class="container__label">Departamento</div>
              <select class="container__list" v-model="users.departamento">
                <option
                  class="container__list__option"
                  v-for="(item, index) in listfacultad"
                  :key="index"
                  value="1"
                >
                  {{ listfacultad[index] }}</option
                >
              </select>
            </div>
          </div>
          <div class="boton">
            <button>CONFIRMAR</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  name: "RegisterUser",
  data() {
    return {
      users: {
        nombre_usuario: null,
        contrasena: null,
        confirmarContraseña: null,
        nombres: null,
        apellidos: null,
        celular: null,
        facultad: null,
        departamento: null,
      },
      listfacultad: ["Tecnologia", "Economia", "Derecho"],
    };
  },
  validations: {
    users: {
      nombres: {
        required,
        maxLength: maxLength(30),
      },
      apellidos: {
        required,
      },
      nombre_usuario: {
        required,
      },
      contrasena: {
        required,
      },
      confirmarContraseña: {
        required,
      },
      celular: {
        required,
      },
    },
  },
  methods: {
    keyhandler(e) {
      if (!e.key.match(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.\s]*$/)) {
        e.preventDefault();
      }
    },
    async submitForm() {
      try {
        await this.sendDataUsers();
        console.log("CORRECTO");
      } catch (error) {
        console.log("ERROR");
      }
    },
    async sendDataUsers() {
      try {
        console.log(this.users);
        await this.$http.post("users", {
          nombre_usuario: this.users.nombre_usuario,
          contrasena: this.users.contrasena,
          nombres: this.users.nombres,
          apellidos: this.users.apellidos,
          celular: this.users.celular,
          facultad: this.users.facultad,
          departamento: this.users.departamento,
        });
      } catch (error) {
        throw new Error("ALGO SALIO MAL");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.flex-container {
  display: flex;
  background-color: #ecf0f1;
}
.form__image {
  width: 40%;
}
.form__image img {
  width: 100%;
  height: 600px;
}

.form__datos {
  width: 60%;
  margin-left: 40px;
  margin-right: 40px;
}
.form_title {
  color: var(--color-title);
  text-align: left;
  font-size: 14px;
}
.form_title h1 {
  padding-top: 30px;
  padding-bottom: 12px;
}
.form__linea {
  color: var(--color-title);
}
.form__input {
  width: 100%;
  padding: 6px;
  margin: 6px 6px;
  border: none;
  border-bottom: 2px solid var(--color-line);
  background-color: transparent;
  color: black;
  font-size: 14px;
}
.form_check-input-error {
  width: 100%;
  padding: 6px;
  margin: 6px 6px;
  border: none;
  border-bottom: 2px solid #ed1c24;
  background-color: transparent;
  color: black;
  font-size: 14px;
}
.form__input:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #747d8c;
}
.form_check-input-error:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid red;
}
::placeholder {
  color: #576574;
}
.form__section {
  margin-top: 20px;
  display: flex;
}
.form__section2 {
  margin-top: 20px;
  margin-right: 40px;
}
.form__section3 {
  display: flex;
}
.formulario_label {
  padding-left: 6px;
  color: var(--color-name);
  text-align: left;
  font-weight: bold;
}
.form__name {
  width: 100%;
  padding-right: 50px;
}
.boton {
  display: flex;
  justify-content: right;
  align-items: right;
  margin: 50px 15px;
}
.boton__input {
  width: 120px;
  height: 35px;
  border-radius: 30px;
  background: blue;
  color: white;
  font-weight: bold;
  border-bottom: none;
  border: none;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.container__base {
  text-align: left;
  padding-top: 20px;
  width: 33%;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 90%;
  color: #576574;
  padding: 6px;
}
.container__list__option {
}
</style>
