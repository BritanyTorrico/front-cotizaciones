<template>
  <div class="contenedor__pres">
    <h2 class="item_title">Presupuesto</h2>

    <div class="form_desc">
      Ingrese el presupuesto anual para cada unidad de gasto
    </div>

    <form @submit.prevent="submitForm">
      <div class="form__datos">
        <div class="listas__desplegables">
          <div class="form__facultad">
            <div class="container__label">Facultad:</div>
            <select
              v-model="presupuesto.facultad"
              @change="
                obtenerDepartamentos(), forceRerender(), cambiaFacultad()
              "
              class="container__list"
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
          <div class="form__departamento" :key="componentKey">
            <lista-desplegable-change
              required
              v-model="presupuesto.departamento"
              nombreLista="Departamento:"
              :lista="listDepartament"
              :value="presupuesto.departamento"
              v-on:change="getObtenerUnidadesDeGasto()"
            ></lista-desplegable-change>
            <div
              class="form_check-error"
              v-if="!$v.presupuesto.departamento.validate_requerido_listas"
            >
              Campo Obligatorio.
            </div>
          </div>
        </div>
        <div
          v-if="this.listaUnidadesDeGasto.length > 0"
          class="form__unidadesGasto "
        >
          <table class="table table-hove table-bordered">
            <thead>
              <tr class="primera-fila ">
                <th>Nombre de unidad</th>
                <th colspan="2">Descripcion</th>
                <th>Jefe de unidad</th>
                <th>Presupuesto</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in this.listaUnidadesDeGasto"
                :key="index"
              >
                <div class="col-8">
                  <td>
                    {{ item.nombre_unidadgasto }}
                  </td>
                </div>

                <td colspan="2">
                  {{ item.descripcion_unidadgasto }}
                </td>

                <td>
                  {{ item.jefe_unidad }}
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
              Registrar
            </button>
          </div>
        </div>
        <div
          v-if="this.listaUnidadesDeGasto.length == 0 && !this.mostrarMensaje"
        >
          <p class="form_check-error mensaje">
            (*) Seleccione un departamento por facultad.
          </p>
        </div>
        <div
          v-if="this.listaUnidadesDeGasto.length == 0 && this.mostrarMensaje"
        >
          <p class="form_check-error mensaje">
            No existen unidades de gasto en este departamento.
          </p>
        </div>
      </div>
      <alert-2
        ref="alert2"
        aceptar="Aceptar"
        mensajeSub="(Se borrara la lista de presupuestos si presiona aceptar.)"
        @escucharHijo="variableHijo"
      ></alert-2>
      <Alert ref="alert"></Alert>
    </form>
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
import ListaDesplegableChange from "../Presupuestos/ListaDesplegableChange.vue";
import Alert2 from "@/Alert2.vue";
import Alert from "@/components/User/Alert.vue";

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
  components: { ListaDesplegableChange, Alert2, Alert },
  computed: {
    ...mapState(["token"]),
  },
  name: "PresupuestorForm",
  data() {
    return {
      listfacultad: [],
      listDepartament: [],
      listaUnidadesDeGasto: [],
      componentKey: 0,
      variableRecibida: null,
      presupuestosCaja: [],
      codUnidadDeGasto: [],
      mostrarMensaje: false,
      presupuesto: {
        facultad: "Seleccione una opcion",
        departamento: "Seleccione una opcion",
        presupuestoValor: [],
      },
    };
  },
  mounted() {
    this.obtenerFacultades();
  },
  validations: {
    presupuesto: {
      facultad: {
        validate_requerido_listas,
      },
      departamento: {
        validate_requerido_listas,
      },
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
    validador(value) {
      const datovalue = String(value);
      let cantidad = parseFloat(value);
      console.log(cantidad);
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
    variableHijo(value) {
      this.variableRecibida = value;
      if (this.variableRecibida) {
        this.listaUnidadesDeGasto = [];
        this.presupuesto.presupuestoValor = [];
        this.presupuestosCaja = [];
        this.codUnidadDeGasto = [];
      }
    },
    async actualizarPresupuesto(codigoUnidad, presupuestoUnidad) {
      try {
        console.log("actualizo presupuesto");
        await this.$http.put(
          `spendingUnitBudget/${codigoUnidad}`,
          {
            presupuesto_unidad: presupuestoUnidad,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async verificarMensaje() {
      let mensaje = false;
      let comparador = localStorage.getItem("presupuestosLista");
      let parts = comparador.split(",");
      for (let i = 0; i < this.presupuesto.presupuestoValor.length; i++) {
        if (this.presupuesto.presupuestoValor[i] != parts[i]) {
          //actual - anterior
          mensaje = true;
          break;
        }
      }
      console.log(mensaje + "del metodo");
      return mensaje;
    },
    async submitForm() {
      try {
        if (
          !this.$v.presupuesto.$invalid &&
          this.listaUnidadesDeGasto.length > 0
        ) {
          let comparador = localStorage.getItem("presupuestosLista");
          let parts = comparador.split(",");
          for (let i = 0; i < this.presupuesto.presupuestoValor.length; i++) {
            if (this.presupuesto.presupuestoValor[i] != parts[i]) {
              //actual - anterior
              await this.actualizarPresupuesto(
                this.codUnidadDeGasto[i],
                this.presupuesto.presupuestoValor[i]
              );
            } else {
              console.log("son iguales");
            }
          }
          //verifica que mensaje mandar
          let mensaje1 = await this.verificarMensaje();
          if (!mensaje1) {
            this.alert("warning", "No realizo ningun cambio.");
          } else {
            this.alert("success", "Presupuesto guardado exitosamente.");
            localStorage.removeItem("facultadPresupuesto");
            localStorage.removeItem("presupuestosLista");
            window.setInterval(window.location.reload(), 10000);
          }
        }
      } catch (error) {
        this.alert("warning", "Rellene todos los datos correctamente");
      }
    },
    async obtenerFacultades() {
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
    },
    async obtenerDepartamentos() {
      this.listDepartament = [];

      let listaDepartamentos = (
        await this.$http.get(`department?facu=${this.presupuesto.facultad}`, {
          headers: {
            authorization: this.token,
          },
        })
      ).data;

      for (let i = 0; i < listaDepartamentos.length; i++) {
        this.listDepartament.push(listaDepartamentos[i].nombre_departamento);
      }
      this.presupuesto.departamento = "Seleccione una opcion";
    },
    forceRerender() {
      this.componentKey += 1;
    },
    alert2(alertType, alertMessage) {
      this.$refs.alert2.showAlert(alertType, alertMessage);
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    async getObtenerUnidadesDeGasto() {
      try {
        this.listaUnidadesDeGasto = []; //actualizo la lista cada vez que cambia de departameno
        this.presupuesto.presupuestoValor = [];
        this.codUnidadDeGasto = [];
        this.presupuestosCaja = [];
        this.mostrarMensaje = false;
        localStorage.removeItem("presupuestosLista");
        if (this.presupuesto.facultad != "Seleccione una opcion") {
          localStorage.setItem(
            "facultadPresupuesto",
            this.presupuesto.facultad
          );
        }

        const unidadGastoPorDepartamento = (
          await this.$http.get(
            `spendingUnit?type=name&departamento=${this.presupuesto.departamento}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data;
        console.log(unidadGastoPorDepartamento);
        for (let i = 0; i < unidadGastoPorDepartamento.datos.length; i++) {
          this.listaUnidadesDeGasto.push(unidadGastoPorDepartamento.datos[i]);

          this.presupuesto.presupuestoValor.push("");
          this.presupuestosCaja.push("");
          this.codUnidadDeGasto.push(
            unidadGastoPorDepartamento.datos[i].cod_unidadgasto
          );
        }

        if (this.listaUnidadesDeGasto.length > 0) {
          for (let i = 0; i < this.listaUnidadesDeGasto.length; i++) {
            if (this.listaUnidadesDeGasto[i].presupuesto_unidad === "0.00") {
              this.presupuestosCaja[i] = "";
            } else {
              this.presupuesto.presupuestoValor[i] = this.listaUnidadesDeGasto[
                i
              ].presupuesto_unidad;
              this.presupuestosCaja[i] = this.listaUnidadesDeGasto[
                i
              ].presupuesto_unidad;
            }
          }
          localStorage.setItem(
            "presupuestosLista",
            this.presupuesto.presupuestoValor
          );
        } else {
          this.mostrarMensaje = true;
        }
      } catch (error) {
        this.alert("warning", "Algo salio mal");
        console.log(error);
      }
    },
    cambiaFacultad() {
      let facuAnterior = localStorage.getItem("facultadPresupuesto");
      if (facuAnterior != null) {
        //si no hay nada todavia
        let facuActual = this.presupuesto.facultad;
        if (facuAnterior != facuActual) {
          this.alert2("warning", "Esta seguro que quiere cambiar de Facultad");
        }
      }
    },
  },
};
</script>

<style scoped>
.contenedor__pres {
  background-color: #f7f6f6;
  padding: 20px 30px 20px 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.item_title {
  text-align: left;
  color: #3d8af7;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}
.container__list {
  width: 100%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
  border: 1px solid;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.form_check-errorCambio {
  color: grey;
  font-size: 10px;
  text-align: left;
}
.form__datos {
}
.listas__desplegables {
  display: flex;
  width: 100%;
}
.form__facultad {
  width: 50%;
  margin-top: 20px;
  margin-right: 30px;
}
.form__departamento {
  width: 50%;
  margin-right: 30px;
}
.form__unidadesGasto {
  text-align: left;
  margin: 20px;
}
table {
  table-layout: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
}
#miTablaPersonalizada {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#nombreTable {
  width: 500px;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
}
.primera-fila {
  background: #dfe4ea;
}
.size {
  margin: 0;
  padding: 0;
  width: 100%;
}
.input-tables {
  width: 100%;
  padding: 10px;
  border: none;
}
#miTablaPersonalizada22 td {
  overflow: auto;
  border: 1px solid;
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
.botoncito {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.mensaje {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  height: 260px;
  margin-right: 20px;
}
</style>
