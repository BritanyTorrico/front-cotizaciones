<template>
  <div class="container-user">
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
      integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
      crossorigin="anonymous"
    />
    <form @submit.prevent="submitForm">
      <div class="flex-container">
        <div class="form__datos">
          <div class="titulo">
            <div class="tii"><h2 class="item_title">Editar Usuario</h2></div>

            <div class="form_desc">
              Puede editar los datos del usuario.
            </div>
          </div>
          <div class="form__section">
            <div class="form__name">
              <div class="formulario_label">Nombre:</div>
              <div class="tam-input">
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
              </div>

              <div class="form_check-error" v-if="!$v.users.nombres.required">
                Campo obligatorio.
              </div>
              <div class="form_check-error" v-if="!$v.users.nombres.maxLength">
                Máximo
                {{ $v.users.nombres.$params.maxLength.max }} caracteres.
              </div>
              <div class="form_check-error" v-if="!$v.users.nombres.minLength">
                Mínimo 3 caracteres.
              </div>
              <div class="form_check-error" v-if="!$v.users.nombres.alpha1">
                No se aceptan caracteres especiales.
              </div>
            </div>
            <div class="form__name">
              <div class="formulario_label">Apellidos:</div>
              <div class="tam-input">
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
              </div>

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
                Mínimo 4 caracteres.
              </div>
              <div class="form_check-error" v-if="!$v.users.apellidos.alpha1">
                No se aceptan caracteres especiales.
              </div>
            </div>
          </div>
          <div class="form__section">
            <div class="form__name">
              <div class="formulario_label">Nombre de usuario:</div>
              <div class="tam-input">
                <input
                  :class="
                    $v.users.nombre_usuario.$invalid
                      ? 'form_check-input-error'
                      : 'form__input'
                  "
                  type="text"
                  placeholder="Ingrese nombre de usuario"
                  v-model="users.nombre_usuario"
                  required
                />
              </div>

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
              <div
                class="form_check-error"
                v-if="!$v.users.nombre_usuario.minLength"
              >
                Mínimo 3 caracteres.
              </div>
            </div>
            <div class="form__name">
              <div class="formulario_label">Celular:</div>
              <div class="tam-input">
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
              </div>

              <div class="form_check-error" v-if="!$v.users.celular.integer">
                Solo se aceptan valores numericos.
              </div>
              <div class="form_check-error" v-if="!$v.users.celular.required">
                Campo obligatorio.
              </div>
              <div class="form_check-error" v-if="!$v.users.celular.maxLength">
                Máximo 8 caracteres.
              </div>
            </div>
          </div>

          <div class="form__section3">
            <div class="fomrm__section__item">
              <div class="container-facu">
                <div class="container__label">Facultad:</div>
                <select
                  v-model="users.facultad"
                  @change="obtenerDepartamentos()"
                  class="container__list"
                >
                  <option disabled="true">{{ users.facultad }}</option>
                  <option
                    class="container__list__option"
                    v-for="(item, index) in listfacultad"
                    :key="index"
                    :value="item"
                  >
                    {{ item }}</option
                  >
                </select>
                <div
                  class="form_check-error"
                  v-if="!$v.users.facultad.validate_requerido_listas"
                >
                  1. Campo Obligatorio.
                </div>
              </div>
            </div>
            <div class="fomrm__section__item">
              <lista-desplegable
                :key="componentKey"
                required
                v-model="users.departamento"
                nombreLista="Departamento:"
                :lista="listDepartament"
                :value="users.departamento"
              ></lista-desplegable>
              <div
                class="form_check-error"
                v-if="!$v.users.departamento.validate_requerido_listas"
              >
                2. Campo Obligatorio.
              </div>
            </div>

            <div class="fomrm__section__item">
              <lista-desplegable
                :key="componentKey1"
                v-model="users.nombre_rol"
                nombreLista="Rol:"
                :lista="listRoles"
                :value="users.nombre_rol"
              ></lista-desplegable>
              <div
                class="form_check-error"
                v-if="!$v.users.nombre_rol.validate_requerido_listas"
              >
                3.Campo Obligatorio.
              </div>
            </div>
          </div>
          <div class="contenedor-cuadro">
            <div class="cuadro_contra" @click="muestro = !muestro">
              <b-icon
                icon="key-fill"
                aria-hidden="true"
                class="iconito"
              ></b-icon>
              Cambiar contraseña <label v-if="muestro">( Si )</label>
              <label v-if="!muestro">( No )</label>
            </div>
            <div class="muestroOpciones" v-if="muestro">
              <div class="form__section2">
                <div class="formulario_label">
                  Contraseña:
                </div>
                <div class="flex__contraseña">
                  <input
                    type="password"
                    id="password"
                    :class="
                      $v.nuevo.contrasena.$invalid
                        ? 'form_check-input-error'
                        : 'form__input'
                    "
                    placeholder="Ingrese su contraseña"
                    v-model="nuevo.contrasena"
                  />
                  <div class="flex__contraseña__icon">
                    <i @click="mostrarContrasena()" class="fas fa-eye"></i>
                  </div>
                </div>

                <div class="form_check-error" v-if="!$v.nuevo.contrasena.valid">
                  La contraseña debe contener al menos una mayuscula, minuscula
                  un número y un caracter especial de las siguientes opciones:
                  ?!@$%^&*-
                </div>
                <div
                  class="form_check-error"
                  v-if="!$v.nuevo.contrasena.minLength"
                >
                  Minimo 8 caracteres
                </div>
                <div
                  class="form_check-error"
                  v-if="!$v.nuevo.contrasena.maxLength"
                >
                  Contraseña muy larga máximo
                  {{ $v.nuevo.contrasena.$params.maxLength.max }} caracteres.
                </div>
              </div>
              <div class="form__section2">
                <div class="formulario_label">Confirmar Contraseña:</div>
                <div class="flex__contraseña">
                  <input
                    type="password"
                    id="password2"
                    :class="
                      $v.nuevo.confirmarContraseña.$invalid
                        ? 'form_check-input-error'
                        : 'form__input'
                    "
                    placeholder="Ingrese su contraseña"
                    v-model="nuevo.confirmarContraseña"
                  />
                  <div class="flex__contraseña__icon">
                    <i @click="mostrarContrasena2()" class="fas fa-eye"></i>
                  </div>
                </div>

                <div
                  class="form_check-error"
                  v-if="!$v.nuevo.confirmarContraseña.required"
                >
                  Campo obligatorio.
                </div>
                <div
                  class="form_check-error"
                  v-if="!$v.nuevo.confirmarContraseña.sameAsPassword"
                >
                  Las contraseñas debe coincidir.
                </div>
                <div
                  class="form_check-error"
                  v-if="!$v.nuevo.confirmarContraseña.maxLength"
                >
                  Contraseña muy larga maximo
                  {{ $v.nuevo.confirmarContraseña.$params.maxLength.max }}
                  caracteres.
                </div>
              </div>
            </div>
          </div>

          <div class="boton">
            <input type="submit" value="Confirmar" class="boton__input" />
          </div>
          
        </div>
      </div>
    </form>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  integer,
  helpers,
  sameAs,
} from "vuelidate/lib/validators";
import ListaDesplegable from "../ListaDesplegable.vue";
import { mapState, mapActions } from "vuex";
import Alert from "@/components/User/Alert.vue";
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/);
const validate_requerido_listas = (value) => {
  const datovalue = String(value);
  if (datovalue === "Seleccione una opcion") {
    return !helpers.req(value) || datovalue != "Seleccione una opcion";
  } else {
    return true;
  }
};
export default {
  components: { ListaDesplegable, Alert },
  name: "RegisterUser",
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      loading: false,
      requerido: true,
      muestro: false,
      users: {
        nombre_usuario: null,
        nombres: null,
        apellidos: null,
        celular: null,
        facultad: "Seleccione una opcion",
        departamento: "Seleccione una opcion",
        nombre_rol: "Seleccione una opcion",
      },
      nuevo: { contrasena: null, confirmarContraseña: null },
      listDepartament: [],
      listfacultad: [],
      listRoles: [],
      componentKey: 0,
      componentKey1: 0,
      old_department: null,
      old_role: null,
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
        minLength: minLength(3),
        maxLength: maxLength(20),
        alpha1,
      },
      celular: {
        required,
        maxLength: maxLength(8),
        integer,
      },
      facultad: {
        required,
        validate_requerido_listas,
      },
      departamento: {
        required,
        validate_requerido_listas,
      },
      nombre_rol: {
        required,
        validate_requerido_listas,
      },
    },
    nuevo: {
      contrasena: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
        valid: function(value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsSpecial = /[?!@$%^&*-]/.test(value);
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
    },
  },
  mounted: async function() {
    this.loading=!this.loading
    const userData = (
      await this.$http.get(`users/${this.$route.params.id}`, {
        headers: {
          authorization: this.token,
        },
      })
    ).data.datos[0];
    this.users.nombre_usuario = userData.nombre_usuario;
    this.users.nombres = userData.nombres;
    this.users.apellidos = userData.apellidos;
    this.users.celular = userData.celular;
    this.users.facultad = userData.facultad;
    this.users.departamento = userData.departamento;
    await this.obtenerFacultades();
    await this.obtenerDepartamentos();
    await this.obtenerRoles();
    
    const codrol = (
      await this.$http.get(`usersPerRole/${this.$route.params.id}`, {
        headers: {
          authorization: this.token,
        },
      })
    ).data.datos[0];
    const rolname = (
      await this.$http.get(`roles/${codrol.cod_rol}`, {
        headers: {
          authorization: this.token,
        },
      })
    ).data.datos[0];
    this.users.nombre_rol = rolname.nombre_rol;

    this.old_department = userData.departamento;
    this.old_role = rolname.nombre_rol;
    this.loading=!this.loading
  },

  methods: {
    ...mapActions(["datosProtegidos"]),
    forceRerender() {
      this.componentKey += 1;
    },
    forceRerender1() {
      this.componentKey1 += 1;
    },
    async obtenerFacultades() {
      const listaFacultades = (
        await this.$http.get("faculty", {
          headers: {
            authorization: this.token,
          },
        })
      ).data;

      for (let i = 0; i < listaFacultades.length; i++) {
        this.listfacultad.push(listaFacultades[i].nombre_facultad);
      }
    },
    async obtenerDepartamentos() {
      this.listDepartament = [];

      let listaDepartamentos = (
        await this.$http.get(`department?facu=${this.users.facultad}`, {
          headers: {
            authorization: this.token,
          },
        })
      ).data.datos;

      for (let i = 0; i < listaDepartamentos.length; i++) {
        this.listDepartament.push(listaDepartamentos[i].nombre_departamento);
      }
      listaDepartamentos.splice(1, 5);
    },

    async obtenerRoles() {
      const listaRoles = (
        await this.$http.get(`roles`, {
          headers: {
            authorization: this.token,
          },
        })
      ).data.datos;

      for (let i = 0; i < listaRoles.length; i++) {
        this.listRoles.push(listaRoles[i].nombre_rol);
      }
    },
    keyhandler(e) {
      if (!e.key.match(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.\s]*$/)) {
        e.preventDefault();
      }
    },
    async submitForm() {
      this.loading=!this.loading
      try {
        if (!this.$v.users.$invalid) {
          if (!this.muestro) {
            //sin contraseña
            await this.sendDataUsers();
            if (this.old_department != this.users.departamento) {
              await this.sendUserDepartment();
            }
            if (this.old_role != this.users.nombre_rol) {
              await this.sendUsernameRol();
            }
            this.alert("success", "Usuario editado exitosamente");
            //restablecer variables
            this.$router.push(`/usuarios`);
          } else {
            //con contraseña
            if (this.muestro && !this.$v.nuevo.$invalid) {
              await this.sendDataUsersContra();
              if (this.old_department != this.users.departamento) {
                await this.sendUserDepartment();
              }
              if (this.old_role != this.users.nombre_rol) {
                await this.sendUsernameRol();
              }
              this.alert("success", "Usuario editado exitosamente");
              console.log("CAMBIO CONTRASEÑA");
            } else {
              this.alert(
                "warning",
                "Rellene la seccion de contraseña correctamente"
              );
            }
          }
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
      this.loading=!this.loading
    },
    async sendUserDepartment() {
      try {
        let orig_dep = null;
        let nuevo_dep = null;
        const codep = (
          await this.$http.get(`department?facu=${this.users.facultad}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        for (let i of codep) {
          if (i.nombre_departamento == this.users.departamento) {
            nuevo_dep = i.cod_departamento;
          }
          if (i.nombre_departamento == this.old_department) {
            orig_dep = i.cod_departamento;
          }
        }
        if (nuevo_dep != null) {
          await this.$http.put(
            `usersPerDeparment/${this.$route.params.id}`,
            {
              cod_departamentoNuevo: nuevo_dep,
              cod_departamentoOriginal: orig_dep,
              cod_usuarioNuevo: this.$route.params.id,
              estado: true,
            },
            {
              headers: {
                authorization: this.token,
              },
            }
          );
        }
      } catch (error) {
        //borra usario
        // await this.$http.delete("users", { data: this.users.nombre_usuario });
        console.log(error);
        throw new Error("Error departamento");
      }
    },
    async sendUsernameRol() {
      try {
        let vie_rol = null;
        let nue_rol = null;
        const corol = (
          await this.$http.get(`roles`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        for (let i of corol) {
          if (i.nombre_rol == this.users.nombre_rol) {
            nue_rol = i.cod_rol;
          }
          if (i.nombre_rol == this.old_role) {
            vie_rol = i.cod_rol;
          }
        }
        if (nue_rol != null) {
          await this.$http.put(
            `usersPerRole/${this.$route.params.id}`,
            {
              cod_rolOriginal: vie_rol,
              cod_rolNuevo: nue_rol,
              estado: true,
            },
            {
              headers: {
                authorization: this.token,
              },
            }
          );
        }
      } catch (error) {
        //borrar un usuario  y departamento modulo departamento
        throw new Error("Error Roles");
      }
    },
    async sendDataUsers() {
      try {
        await this.$http.put(
          `users/${this.$route.params.id}?type=noPass`,
          {
            nombre_usuario: this.users.nombre_usuario,
            nombres: this.users.nombres,
            apellidos: this.users.apellidos,
            celular: this.users.celular,
            facultad: this.users.facultad,
            departamento: this.users.departamento,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        throw new Error("El nombre de usuario ya fue registrado");
      }
    },
    async sendDataUsersContra() {
      try {
        await this.$http.put(
          `users/${this.$route.params.id}?type=All`,
          {
            nombre_usuario: this.users.nombre_usuario,
            contrasena: this.nuevo.contrasena,
            nombres: this.users.nombres,
            apellidos: this.users.apellidos,
            celular: this.users.celular,
            facultad: this.users.facultad,
            departamento: this.users.departamento,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
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

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.flex-container {
  display: flex;

  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 50px 100px 50px 100px;
  background-color: #46b1c95b;
  margin-top: 0;
}
.form__image {
  width: 45%;
}
.form__image img {
  width: 100%;
  height: 900px;
  background: gray;
}

.form__datos {
  width: 70%;
  margin-left: 40px;
  margin-right: 40px;

  padding: 40px;
  background-color: #ecf0f1;
}
.loading-info{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.clock-loader {
  --clock-color: #000000;
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;
  
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: calc(var(--clock-radius) * 0.25);
    width: var(--clock-thickness);
    background: var(--clock-color);
    border-radius: 10px;
    transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: var(--clock-minute-length);
    animation-duration: 2s;
  }

  &::after {
    top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
    height: var(--clock-hour-length);
    animation-duration: 15s;
  }
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
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
  margin-left: 0;
}
.fomrm__section__item {
  width: 33%;
  font-size: 20px;
  margin-right: 40px;
}
.fomrm__section__item select {
  font-size: 16px;
}
.formulario_label {
  padding-left: 6px;
  color: var(--color-name);
  text-align: left;
  font-weight: bold;
  font-size: 20px;
}
.form__name {
  width: 100%;

  text-align: left;
}
.boton {
  align-items: left;
  margin: 50px 15px;
  text-align: right;
}

.boton__input {
  background-color: #0c59cf;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  width: 25%;
  padding: 8px 0;
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
.container-user {
  text-align: center;
  width: 100%;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  border: 1px solid;
}
.container-facu {
  padding-top: 20px;
  text-align: left;
}
.form_desc {
  text-align: left;
  color: #0d58cf;
  font-size: 18px;
  font-weight: 400;
  padding-bottom: 5px;
  border-bottom: 2px solid #0d58cf;
  width: 100%;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.item_title {
  text-align: left;
  color: #3d8af7;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 0;
}
.titulo {
  text-align: left;
  width: 100%;
  margin-top: 0;
}
.tam-input {
  width: 80%;
}
.tii {
  margin: 0;
  padding: 0;
}
.contenedor-cuadro {
  width: 100%;
  min-height: 100px;
}

.cuadro_contra {
  width: 50%;
  height: 50px;
  border: 1px solid #f5f6fa;
  text-decoration: none;
  padding: 10px;
  margin-top: 40px;
  background: #a4b0be;
  font-weight: bold;
  color: white;
}

.iconito {
  width: 50px;
}
.muestroOpciones {
  width: 100%;
  height: 350px;
  border: 1px solid transparent;
  padding: 0px 20px;
  background: #dfe4ea;
}
</style>
