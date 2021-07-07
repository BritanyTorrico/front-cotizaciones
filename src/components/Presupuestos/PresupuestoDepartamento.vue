<template>
  <div class="contenedor-dep">
    <div class="container-soli">
      <div v-if="loading">
        <div class="loading-info">
          <div class="clock-loader"></div>
        </div>
      </div>
      <div v-else>
        <form @submit.prevent="submitForm">
          <h2 class="item_title">
            Presupuestos por departamento gestion {{ this.gestion }}
          </h2>
          <div class="form_desc">
            Ingrese el presupuesto anual para cada departamento.
          </div>
          <div class="historial">
            <a href="/historial_presupuestos_dep" class="btn btn-primary"
              >Ver Historial</a
            >
          </div>
          <div>
            <div class="container__label">Facultad:</div>
            <select
              required
              :disabled="this.cambioFacu"
              :class="this.cambioFacu ? 'desabilitarLista' : 'container__list'"
              v-model="presupuesto.facultad"
              @change="cambiaFacultad(), obtenerDepartamentos()"
            >
              <option disabled="true">{{ presupuesto.facultad }}</option>
              <option
                v-for="(item, index) in listfacultad"
                :key="index"
                :value="item"
              >
                {{ item }}</option
              >
            </select>
            <div
              class="form_check-error"
              v-if="!$v.presupuesto.facultad.validate_requerido_listas"
            >
              Campo Obligatorio.
            </div>
          </div>

          <div
            class="tablaDepartamentos"
            v-if="presupuesto.facultad != 'Seleccione una opcion'"
          >
            <table class="table table-hove table-bordered">
              <thead>
                <tr class="primera-fila ">
                  <th colspan="2">Departamento</th>
                  <th>Presupuesto (Bs.)</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in listDepartament" :key="index">
                  <td colspan="2">
                    {{ item.nombre_departamento }}
                  </td>

                  <td>
                    <div>
                      <input
                        required
                        class="input-tables"
                        type="number"
                        step="0.01"
                        placeholder="Ingrese valor"
                        v-model="presupuesto.presupuestoValor[index]"
                        @change="validador(presupuesto.presupuestoValor[index])"
                      />
                    </div>
                    <div class="form_check-error">
                      {{ validador(presupuesto.presupuestoValor[index]) }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="botoncito">
              <button
                :disabled="$v.presupuesto.$invalid"
                :class="
                  $v.presupuesto.$invalid ? 'button-disabled' : 'form_button'
                "
              >
                Confirmar
              </button>
            </div>
          </div>
          <div class="form_check-error mensaje" v-else>
            Seleccione una facultad para que se muestren los departamentos
            correspondientes.
          </div>
        </form>
      </div>
      <alert-2
        ref="alert2"
        aceptar="Aceptar"
        mensajeSub="(Se borrara las modificaciones realizadas en presupuestos)"
        @escucharHijo="variableHijo"
        @escucharHijo1="variableHijo1"
      ></alert-2>
      <Alert ref="alert"></Alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  helpers,
  required,
  minLength,
  minValue,
  maxValue,
} from "vuelidate/lib/validators";
import Alert from "@/components/User/Alert.vue";
//import ListaDesplegableChange from "../Presupuestos/ListaDesplegableChange.vue";
import Alert2 from "@/Alert2.vue";
const validate_requerido_listas = (value) => {
  const datovalue = String(value);
  if (datovalue === "Seleccione una opcion") {
    return !helpers.req(value) || datovalue != "Seleccione una opcion";
  } else {
    return true;
  }
};
const validate_decimales = (value) => {
  const datovalue = String(value);
  if (datovalue.indexOf(".") > 0) {
    const parts = datovalue.split(".");
    const dato = String(parts[1]);
    return !helpers.req(value) || !(dato.length > 2);
  } else {
    return true;
  }
};
export default {
  name: "PresupuestoDepartamento",
  components: {
    ////ListaDesplegableChange,
    Alert2,
    Alert,
  },
  computed: {
    ...mapState(["token"]),
  },

  data() {
    return {
      loading: false,
      presupuesto: {
        departamento: "Seleccione una opcion",
        presupuestoValor: [],
        facultad: "Seleccione una opcion",
      },
      listDepartament: [],
      listfacultad: [],
      componentKey: 0,
      facultadAnterior: null,
      variableRecibida: null,
      variableRecibida1: null,
      cambioFacu: false,
      presupuestoSinModificar: [],
      gestion: null,
    };
  },

  mounted() {
    this.gestion = null;
    const today = new Date();
    this.gestion = today.getFullYear();
    this.obtenerFacultades();
  },
  validations: {
    presupuesto: {
      facultad: { validate_requerido_listas },
      presupuestoValor: {
        required,
        $each: {
          required,
          minLength: minLength(2),
          minValue: minValue(100),
          maxValue: maxValue(1000000),
          validate_decimales,
        },
      },
    },
  },
  methods: {
    rangeYear() {
      const max = new Date().getFullYear();

      return max;
    },
    async obtenerFacultades() {
      this.loading = !this.loading;
      try {
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
      } catch (error) {
        this.alert("warning", "Algo salio mal");
        console.log(error);
      }
      this.loading = !this.loading;
    },

    async obtenerDepartamentos() {
      this.loading = !this.loading;
      if (!this.cambioFacu) {
        this.listDepartament = [];
        this.presupuestoSinModificar = [];
        let listaDepartamentos = (
          await this.$http.get(
            `departmentWithBudget?facu=${this.presupuesto.facultad}&gestion=${this.gestion}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data;

        for (let i = 0; i < listaDepartamentos.length; i++) {
          this.listDepartament.push(listaDepartamentos[i]);
          this.presupuesto.presupuestoValor.push(
            listaDepartamentos[i].presupuesto_departamento
          );
          this.presupuestoSinModificar.push(
            listaDepartamentos[i].presupuesto_departamento
          );
        }

        this.presupuesto.departamento = "Seleccione una opcion";

        if (this.presupuesto.facultad != "Seleccione una opcion") {
          //guardo la facultad anterior

          this.facultadAnterior = this.presupuesto.facultad;
        }
      }
      this.loading = !this.loading;
    },
    variableHijo(value) {
      this.variableRecibida = value;
      if (this.variableRecibida) {
        this.listDepartament = [];
        this.presupuesto.presupuestoValor = [];
        this.cambioFacu = false;
        this.presupuestoSinModificar = [];
        this.obtenerDepartamentos();
      }
    },
    variableHijo1(value) {
      this.variableRecibida1 = value;
      if (this.variableRecibida1) {
        this.cambioFacu = false;
        this.presupuesto.facultad = this.facultadAnterior;
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    alert2(alertType, alertMessage) {
      this.$refs.alert2.showAlert(alertType, alertMessage);
    },
    async cambiaFacultad() {
      this.cambioFacu = false;
      if (this.facultadAnterior != null) {
        let facuActual = this.presupuesto.facultad;

        if (this.facultadAnterior != facuActual) {
          this.cambioFacu = true;
          await this.obtenerDepartamentos();
          this.alert2(
            "warning",
            "Esta seguro que quiere cambiar de Facultad ?"
          );
        }
      }
    },
    validador(value) {
      const datovalue = String(value);
      let cantidad = parseFloat(value);
      if (cantidad < 100) {
        return "Mínimo  100 bs.";
      } else if (cantidad > 1000000) {
        return "Máximo  1.000.000 bs.";
      } else if (datovalue.indexOf(".") > 0) {
        const parts = datovalue.split(".");
        const dato = String(parts[1]);
        if (dato.length > 2) {
          return "Máximo 2 decimales";
        }
      }
    },
    async actualizarPresupuesto(codDep, presupuesto) {
      try {
        await this.$http.put(
          `departmentBudget/${codDep}`,
          {
            presupuesto_departamento: presupuesto,
            gestion: this.gestion,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
        this.alert("success", "Presupuesto actualizado exitosamente");
        window.setInterval(window.location.reload(), 10000);
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async submitForm() {
      this.loading = !this.loading;
      try {
        if (!this.$v.presupuesto.$invalid) {
          for (let i = 0; i < this.presupuesto.presupuestoValor.length; i++) {
            if (
              this.presupuesto.presupuestoValor[i] !=
              this.presupuestoSinModificar[i]
            ) {
              //actual - anterior
              let codigoDepartamento = await this.listDepartament[i]
                .cod_departamento;
              let presupuestoEditado = this.presupuesto.presupuestoValor[i];
              await this.actualizarPresupuesto(
                codigoDepartamento,
                presupuestoEditado
              );
            }
          }
        }
      } catch (error) {
        this.alert("warning", error);
      }
      this.loading = !this.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedor-dep {
  background-color: #f7f6f6;
  padding: 2.5% 8% 2.5% 8%;
  width: 100%;
  min-height: 100vh;
}
.item_title {
  text-align: left;
  color: #3d8af7;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
.desabilitarLista {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ccc;
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  border: 1px solid;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
  margin-top: 30px;
}
.tablaDepartamentos {
  margin-top: 30px;
  text-align: left;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.botoncito {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.button-disabled {
  display: block;
  background: #999999;
  padding: 12px 115px 12px 115px;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}
.form_button {
  display: block;
  background-color: #0c59cf;
  padding: 12px 115px 12px 115px;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}
.input-tables {
  width: 100%;
  padding: 10px;
  border: none;
}
.primera-fila {
  background: #dfe4ea;
}
.mensaje {
  margin: 20px;
  text-align: center;
}
.historial {
  text-align: right;
  margin-top: 20px;
}
</style>
