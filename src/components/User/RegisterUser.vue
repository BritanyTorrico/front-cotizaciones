<template>
  <div class="container">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
      integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
      crossorigin="anonymous"
    />
    <form @submit.prevent="submitForm">
      <div class="flex-container">
        <div class="form__image">
          <img src="@/assets/edificioUMSS.jpg" alt="" />
        </div>

        <div class="form__datos">
          <div class="form_title">
            <h1>Registrar Usuario</h1>
          </div>
          <div class="form__section">
            <div class="form__name">
              <label
                ><div class="formulario_label">Nombre:</div>
                <input
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
              <div class="form_check-error" v-if="!$v.users.nombres.maxLength">
                Máximo
                {{ $v.users.nombres.$params.maxLength.max }}caracteres.
              </div>
              <div class="form_check-error" v-if="!$v.users.nombres.minLength">
                Minimo 3 caracteres.
              </div>
              <div class="form_check-error" v-if="!$v.users.nombres.alpha1">
                No se aceptan caracteres especiales.
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
              <div
                class="form_check-error"
                v-if="!$v.users.apellidos.maxLength"
              >
                Máximo
                {{ $v.users.apellidos.$params.maxLength.max }} caracteres.
              </div>
              <div
                class="form_check-error"
                v-if="!$v.users.apellidos.minLength"
              >
                Minimo 4 caracteres.
              </div>
              <div class="form_check-error" v-if="!$v.users.apellidos.alpha1">
                No se aceptan caracteres especiales.
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

              <div
                class="form_check-error"
                v-if="!$v.users.nombre_usuario.maxLength"
              >
                Máximo
                {{ $v.users.nombre_usuario.$params.maxLength.max }} caracteres.
              </div>

              <div
                class="form_check-error"
                v-if="!$v.users.nombre_usuario.alpha1"
              >
                No se aceptan caracteres especiales.
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
                  type=""
                  placeholder="Ingrese su celular"
                  v-model="users.celular"
                />
              </label>
              <div class="form_check-error" v-if="!$v.users.celular.integer">
                Solo se aceptan valores numericos.
              </div>
              <div class="form_check-error" v-if="!$v.users.celular.required">
                Campo obligatorio.
              </div>
              <div class="form_check-error" v-if="!$v.users.celular.minLength">
                Minimo 8 caracteres.
              </div>
            </div>
          </div>
          <div class="form__section2">
            <div class="formulario_label">
              Contraseña:
            </div>
            <div class="flex__contraseña">
              <input
                type="password"
                id="password"
                :class="
                  $v.users.contrasena.$invalid
                    ? 'form_check-input-error'
                    : 'form__input'
                "
                placeholder="Ingrese su contraseña"
                v-model="users.contrasena"
              />
              <div class="flex__contraseña__icon">
                <i @click="mostrarContrasena()" class="fas fa-eye"></i>
              </div>
            </div>

            <div class="form_check-error" v-if="!$v.users.contrasena.valid">
              La contraseña debe contener minimo 8 caracteres y al menos una
              mayuscula, minuscula un número y un caracter especial #?!@$%^&*-
            </div>
            <div class="form_check-error" v-if="!$v.users.contrasena.required">
              Campo obligatorio.
            </div>
            <div class="form_check-error" v-if="!$v.users.contrasena.maxLength">
              Contraseña muy larga máximo
              {{ $v.users.contrasena.$params.maxLength.max }} caracteres.
            </div>
          </div>
          <div class="form__section2">
            <div class="formulario_label">Confirmar Contraseña:</div>
            <div class="flex__contraseña">
              <input
                type="password"
                id="password2"
                :class="
                  $v.users.confirmarContraseña.$invalid
                    ? 'form_check-input-error'
                    : 'form__input'
                "
                placeholder="Ingrese su contraseña"
                v-model="users.confirmarContraseña"
              />
              <div class="flex__contraseña__icon">
                <i @click="mostrarContrasena2()" class="fas fa-eye"></i>
              </div>
            </div>

            <div
              class="form_check-error"
              v-if="!$v.users.confirmarContraseña.required"
            >
              Campo obligatorio.
            </div>
            <div
              class="form_check-error"
              v-if="!$v.users.confirmarContraseña.sameAsPassword"
            >
              Las contraseñas debe coincidir.
            </div>
            <div
              class="form_check-error"
              v-if="!$v.users.confirmarContraseña.maxLength"
            >
              Contraseña muy larga maximo
              {{ $v.users.confirmarContraseña.$params.maxLength.max }}
              caracteres.
            </div>
          </div>
          <div class="form__section3">
            <div class="fomrm__section__item">
              <lista-desplegable
                required
                v-model="users.facultad"
                nombreLista="Facultad:"
                :lista="listfacultad"
              ></lista-desplegable>
            </div>
            <div class="fomrm__section__item">
              <lista-desplegable
                required
                v-model="users.departamento"
                nombreLista="Departamento:"
                :lista="listDepartament"
              ></lista-desplegable>
            </div>

            <div class="fomrm__section__item">
              <lista-desplegable
                v-model="users.nombre_rol"
                nombreLista="Rol:"
                :lista="listRoles"
              ></lista-desplegable>
            </div>
          </div>
          <div class="boton">
            <input type="submit" value="Confirmar" class="boton__input" />
          </div>
          <Alert ref="alert"></Alert>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  sameAs,
  integer,
  helpers,
} from "vuelidate/lib/validators";
import ListaDesplegable from "./ListaDesplegable.vue";
import Alert from "@/components/User/Alert.vue";
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/);
export default {
  components: { ListaDesplegable, Alert },
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
        nombre_rol: null,
      },
      listDepartament: [
        "Ingeniería de Sistemas",
        "Ingeniería Informática",
        "Ingeniería Civil",
        "Ingeniería Mecánica",
        "Administración",
      ],
      listfacultad: [],
      listRoles: [
        "Super Usuario",
        "Jefe de Departamento",
        "Secretario",
        "Cotizador",
        "Responsable de Presupuestos",
      ],
      datos: {
        cod_facultad: 1,
      },
    };
  },

  validations: {
    users: {
      nombres: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        alpha1,
      },
      apellidos: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
        alpha1,
      },
      nombre_usuario: {
        required,
        maxLength: maxLength(20),
        alpha1,
      },
      contrasena: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
        valid: function(value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsSpecial = /[#?!@$%^&*-]/.test(value);
          return (
            containsUppercase &&
            containsLowercase &&
            containsNumber &&
            containsSpecial
          );
        },
      },
      confirmarContraseña: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
        sameAsPassword: sameAs("contrasena"),
      },
      celular: {
        required,
        minLength: minLength(8),
        integer,
      },
      facultad: {
        required,
      },
      departamento: {
        required,
      },
      nombre_rol: {
        required,
      },
    },
  },
  mounted() {
    this.obtenerFacultades();
    this.obtenerDepartamentos();
  },
  methods: {
    async obtenerFacultades() {
      const listaFacultades = (await this.$http.get(`faculty`)).data;
      for (let i = 0; i < listaFacultades.length; i++) {
        this.listfacultad.push(listaFacultades[i].nombre_facultad);
      }
    },
    async obtenerDepartamentos() {},
    keyhandler(e) {
      if (!e.key.match(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.\s]*$/)) {
        e.preventDefault();
      }
    },
    async submitForm() {
      try {
        if (!this.$v.users.$invalid) {
          console.log("creo");
          await this.sendDataUsers();
          await this.sendUserDepartment();
          await this.sendUsernameRol();
          this.alert("success", "Usuario creado exitosamente");
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async sendUserDepartment() {
      try {
        console.log("departamento");
        await this.$http.post("usersPerDeparment", {
          nombre_departamento: this.users.departamento,
          nombre_usuario: this.users.nombre_usuario,
        });
      } catch (error) {
        //borra usario
        throw new Error("Error departamento");
      }
    },
    async sendUsernameRol() {
      try {
        console.log("roles");
        await this.$http.post("usersPerRole", {
          nombre_rol: this.users.nombre_rol,
          nombre_usuario: this.users.nombre_usuario,
        });
      } catch (error) {
        //borrar un usuario  y departamento modulo departamento
        throw new Error("Error Roles");
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
        throw new Error("El nombre de usuario ya fue registrado");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    mostrarContrasena() {
      var tipo = document.getElementById("password");
      if (tipo.type == "password") {
        tipo.type = "text";
      } else {
        tipo.type = "password";
      }
    },
    mostrarContrasena2() {
      var tipo = document.getElementById("password2");
      if (tipo.type == "password") {
        tipo.type = "text";
      } else {
        tipo.type = "password";
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
  height: 670px;
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
  border-bottom: 1px solid var(--color-title);
  box-shadow: 0 1px 0 0 gray;
}
.form_title h1 {
  padding-top: 30px;
  padding-bottom: 12px;
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
  border-bottom: 2px solid gray;
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
.flex__contraseña {
  display: flex;
  padding-top: 10px;
}
.flex__contraseña__icon {
  padding-top: 12px;
}
.form__section3 {
  display: flex;
}
.fomrm__section__item {
  width: 33%;
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
  align-items: left;
  margin: 50px 15px;
  text-align: right;
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
.requerido__listas {
  padding-top: 60px;
  color: red;
}
</style>
