<template>
  <section class="crear_rol">
    <div v-if="loading">
      <div class="loading-info">
        <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
      <div class="titulo">
        <h2 class="item_title">Crear Rol</h2>
        <div class="form_desc"></div>
      </div>

      <form class="form_crear" @submit.prevent="submitForm" :key="componentKey">
        <div class="form_section">
          <div class="form_name">Nombre de rol:</div>
          <div class="form__nombre">
            <input
              name="nombreRol"
              id="nombreRol"
              :class="
                $v.dato.nombre_rol.$invalid
                  ? 'form_check-input-error'
                  : 'form__input'
              "
              type="text"
              minlength="5"
              maxlength="25"
              required
              placeholder="Ingrese nombre aquí"
              v-model="dato.nombre_rol"
            />
          </div>

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
          <div class="form_name">Seleccione los Permisos:</div>

          <div class="checkbox-style">
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="gestionUsuario"
                  name="funcion"
                  value="Registrar Usuarios"
                />
              </div>

              <label for="gestionUsuario">Gestionar Usuarios</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="gestionRol"
                  name="funcion"
                  value="Crear Roles"
                />
              </div>

              <label for="gestionRol">Gestionar Roles</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="gestionUnidades"
                  name="funcion"
                  value="Añadir Unidades de Gasto"
                />
              </div>

              <label for="gestionUnidades">Gestionar Unidades de Gasto</label
              ><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="gestionItems"
                  name="funcion"
                  value="Añadir Items de Gasto"
                />
              </div>
              <label for="gestionItems">Gestionar Items de Gasto</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="regEmp"
                  name="funcion"
                  value="Registro de empresas"
                />
              </div>
              <label for="regEmp">Gestionar Empresas</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="hacerSol"
                  name="funcion"
                  value="Hacer solicitud"
                />
              </div>
              <label for="hacerSol">Hacer Solicitudes</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="revSol"
                  name="funcion"
                  value="Revisar solicitud"
                />
              </div>
              <label for="revSol">Revisar Solicitudes</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="creaCot"
                  name="funcion"
                  value="Crear cotización"
                />
              </div>
              <label for="creaCot">Realizar Cotizaciones</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="filtrito"
                  name="funcion"
                  value="Filtro cotizaciones"
                />
              </div>
              <label for="filtrito">Ver Cotizaciones</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="tablita"
                  name="funcion"
                  value="Crear Tabla"
                />
              </div>
              <label for="tablita">Crear Tablas Comparativas</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="bita"
                  name="funcion"
                  value="Ver Bitacora"
                />
              </div>
              <label for="bita">Ver Bitácora</label><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="backup"
                  name="funcion"
                  value="Hacer Backup"
                />
              </div>
              <label for="backup">Realizar Respaldos y Restauraciones</label
              ><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="presunidad"
                  name="funcion"
                  value="Actualizar Presupuesto Unidad"
                />
              </div>
              <label for="presunidad">Actualizar Presupuestos de Unidades</label
              ><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="presdep"
                  name="funcion"
                  value="Actualizar Presupuesto Departamento"
                />
              </div>
              <label for="presdep"
                >Actualizar Presupuestos de Departamentos</label
              ><br />
            </div>
            <div class="form-function">
              <div class="input-check">
                <input
                  type="checkbox"
                  id="repfin"
                  name="funcion"
                  value="Reporte final"
                />
              </div>
              <label for="repfin">Realizar Informes Finales</label><br />
            </div>
          </div>
        </div>
        <div class="botoncito">
          <button class="form_button">
            Crear
          </button>
        </div>
      </form>
    </div>
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
      loading: false,
      disabled: false,
      dato: {
        nombre_rol: null,
      },
      funciones: [],
      componentKey: 0,
      permiso1: "",
      permiso2: "",
      permiso3: "",
      permiso4: "",
      permiso5: "",
      permiso6: "",
      permiso7: "",
      permiso8: "",
      permiso9: "",
      permiso10: "",
      permiso11: "",
      permiso12: "",
      permiso13: "",
      permiso14: "",
      permiso15: "",
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
    forceRerender() {
      this.componentKey += 1;
    },
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
      for (let i of this.funciones) {
        if (i == "Registrar Usuarios") this.permiso1 = i;
        if (i == "Crear Roles") this.permiso2 = i;
        if (i == "Añadir Unidades de Gasto") this.permiso3 = i;
        if (i == "Añadir Items de Gasto") this.permiso4 = i;
        if (i == "Hacer solicitud") this.permiso5 = i;
        if (i == "Revisar solicitud") this.permiso6 = i;
        if (i == "Crear cotización") this.permiso7 = i;
        if (i == "Registro de empresas") this.permiso8 = i;
        if (i == "Filtro cotizaciones") this.permiso9 = i;
        if (i == "Crear Tabla") this.permiso10 = i;
        if (i == "Ver Bitacora") this.permiso11 = i;
        if (i == "Hacer Backup") this.permiso12 = i;
        if (i == "Actualizar Presupuesto Unidad") this.permiso13 = i;
        if (i == "Actualizar Presupuesto Departamento") this.permiso14 = i;
        if (i == "Reporte final") this.permiso15 = i;
      }
    },
    async submitForm() {
      this.loading = !this.loading;
      await this.getFunciones();
      try {
        if (!this.$v.dato.$invalid && this.funciones.length > 0) {
          await this.sendRolData();
          await this.sendFuncData();

          this.alert("success", "Rol creado exitosamente");
          this.dato.nombre_rol = null;
          this.forceRerender();
        } else {
          this.alert("warning", "Seleccione minimamente un permiso.");
        }
      } catch (error) {
        this.alert("warning", error);
      }
      this.loading = !this.loading;
    },
    async sendRolData() {
      try {
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
      } catch (error) {
        throw new Error("No existe dicha función");
      }
    },
    async sendFuncData() {
      try {
        await this.$http.post(
          "rolePerFunctionsGroupSP2",
          {
            permiso1: this.permiso1,
            permiso2: this.permiso2,
            permiso3: this.permiso3,
            permiso4: this.permiso4,
            permiso5: this.permiso5,
            permiso6: this.permiso6,
            permiso7: this.permiso7,
            permiso8: this.permiso8,
            permiso9: this.permiso9,
            permiso10: this.permiso10,
            permiso11: this.permiso11,
            permiso12: this.permiso12,
            permiso13: this.permiso13,
            permiso14: this.permiso14,
            permiso15: this.permiso15,
            nombre_rol: this.dato.nombre_rol,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        throw new Error("Este rol ya esta registrado");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted() {
    var validCodesRole = [
      32,
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      90,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
      106,
      107,
      108,
      109,
      110,
      111,
      112,
      113,
      114,
      115,
      116,
      117,
      118,
      119,
      120,
      121,
      122,
      193,
      201,
      205,
      209,
      211,
      218,
      225,
      233,
      237,
      241,
      243,
      250,
    ];
    var myTextbox1 = document.getElementById("nombreRol");
    myTextbox1.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesRole.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
  },
};
</script>

<style lang="scss" scoped>
.crear_rol {
  background-color: #f1f2f6;
  padding: 20px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.loading-info {
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

.form_name {
  color: #3f4b5b;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_section {
  padding: 25px 0px 25px 0px;
  width: 100%;
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
  width: 50%;
  font-size: 17px;
  display: inline-block;
  text-align: start;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding: 0 0 1.2% 0;
}
.checkbox-style {
  margin-top: 20px;
}
.form__input {
  width: 100%;
  padding: 6px;
  margin: 6px 6px;
  border: none;
  border-bottom: 2px solid var(--color-line);
  background-color: transparent !important;
  color: black;
  font-size: 14px;
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
  width: 2.7%;
  float: left;
}
.laber-check {
  width: 95%;
  float: left;
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
}
.titulo {
  text-align: left;
  width: 100%;
}
.form__nombre {
  margin-top: 10px;
  width: 60%;
}
label {
  margin-left: 3%;
}
</style>
