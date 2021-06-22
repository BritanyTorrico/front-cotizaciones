<template>
  <div class="contenedor__pres">
    <form @submit.prevent="submitForm()">
      <h2 class="item_title">Presupuesto de la gestion {{ this.gestion }}</h2>

      <div class="form_desc">
        Ingrese el presupuesto anual para cada unidad de gasto
      </div>
      <div class="historial">
        <a href="/historial_presupuestos" class="btn btn-primary"
          >Ver Historial</a
        >
      </div>
      <div class="listas__desplegables">
        <div class="form__facultad">
          <div class="container__label">Facultad:</div>
          <select
            v-model="presupuesto.facultad"
            @change="cambiaFacultad(), obtenerDepartamentos()"
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
        <div class="form__facultad">
          <div class="container__label">Departamento:</div>
          <select
            :disabled="this.cambioFacu"
            :class="this.cambioFacu ? 'desabilitarLista' : 'container__list'"
            v-model="presupuesto.departamento"
            @change="
              cambiaDepartamento(), getObtenerUnidadesDeGasto(), obtenerTope()
            "
          >
            <option disabled="true">{{ presupuesto.departamento }}</option>
            <option
              v-for="(item, index) in listDepartament"
              :key="index"
              :value="item"
            >
              {{ item }}</option
            >
          </select>
          <div
            class="form_check-error"
            v-if="!$v.presupuesto.departamento.validate_requerido_listas"
          >
            Campo Obligatorio.
          </div>
          <div
            class="presupuesto__total"
            v-if="this.presupuesto.departamento != 'Seleccione una opcion'"
          >
            Presupuesto del departamento: {{ tope }} Bs.
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
              <th colspan="2">Descripción</th>
              <th>Jefe de unidad</th>
              <th>Presupuesto</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in this.listaUnidadesDeGasto" :key="index">
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
            :class="$v.presupuesto.$invalid ? 'button-disabled' : 'form_button'"
          >
            Confirmar
          </button>
        </div>
      </div>
      <div v-if="this.listaUnidadesDeGasto.length == 0 && !this.mostrarMensaje">
        <p class="form_check-error mensaje">
          (*) Seleccione un departamento por facultad.
        </p>
      </div>
      <div v-if="this.listaUnidadesDeGasto.length == 0 && this.mostrarMensaje">
        <p class="form_check-error mensaje">
          No existen unidades de gasto en este departamento.
        </p>
      </div>
    </form>

    <alert-2
      ref="alert2"
      aceptar="Aceptar"
      mensajeSub="(Se borrara la lista de presupuestos si presiona aceptar.)"
      @escucharHijo="variableHijo"
      @escucharHijo1="variableHijo1"
    ></alert-2>
    <alert-2
      ref="alert22"
      aceptar="Aceptar"
      mensajeSub="(Se borrara la lista de presupuestos si presiona aceptar.)"
      @escucharHijo="variableHijo_otro"
      @escucharHijo1="variableHijo1_otro"
    ></alert-2>
    <Alert ref="alert"></Alert>
    <!--{{ presupuesto }}
    depa_{{ cambioDepa }} facu_ {{ cambioFacu }}-->
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
  name: "PresupuestoUnidad",

  computed: {
    ...mapState(["token"]),
  },
  components: {
    Alert2,
    Alert,
  },
  mounted() {
    this.gestion = null;
    const today = new Date();
    this.gestion = today.getFullYear();
    this.obtenerFacultades();
  },
  data() {
    return {
      presupuesto: {
        facultad: "Seleccione una opcion",
        departamento: "Seleccione una opcion",
        presupuestoValor: [],
      },
      listfacultad: [],
      cambioFacu: false,
      cambioDepa: false,
      facultadAnterior: null,
      listDepartament: [],
      listaUnidadesDeGasto: [],
      depaAnterior: null,
      tope: null,
      presupuestoSinModificar: [],
      codDepartamentos: [],
      desabilitarTope: false,
      sumaPresu: 0,
      mostrarMensaje: false,
      gestion: null,
    };
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
      }
    },
    async obtenerDepartamentos() {
      if (!this.cambioFacu) {
        this.listDepartament = [];
        this.codDepartamentos = [];
        let listaDepartamentos = (
          await this.$http.get(`department?facu=${this.presupuesto.facultad}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        for (let i = 0; i < listaDepartamentos.length; i++) {
          const depa = {
            nombre_departamento: listaDepartamentos[i].nombre_departamento,
            cod_departamento: listaDepartamentos[i].cod_departamento,
          };
          this.codDepartamentos.push(depa);
          this.listDepartament.push(listaDepartamentos[i].nombre_departamento);
        }
        this.presupuesto.departamento = "Seleccione una opcion";
        if (this.presupuesto.facultad != "Seleccione una opcion") {
          //guardo la facultad anterior
          this.facultadAnterior = this.presupuesto.facultad;
        }
      }
    },

    async obtenerDepartamentosVariante() {
      if (!this.cambioFacu) {
        this.listDepartament = [];
        let listaDepartamentos = (
          await this.$http.get(`department?facu=${this.presupuesto.facultad}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        for (let i = 0; i < listaDepartamentos.length; i++) {
          this.listDepartament.push(listaDepartamentos[i].nombre_departamento);
        }
        //this.presupuesto.departamento = "Seleccione una opcion";
        if (this.presupuesto.facultad != "Seleccione una opcion") {
          //guardo la facultad anterior
          this.facultadAnterior = this.presupuesto.facultad;
        }
      }
    },
    async obtenerCodDepto() {
      try {
        for (let i = 0; i < this.listDepartament.length; i++) {
          if (
            this.presupuesto.departamento ===
            this.codDepartamentos[i].nombre_departamento
          ) {
            const codDepa = (
              await this.$http.get(
                `department/${this.codDepartamentos[i].cod_departamento}`,
                {
                  headers: {
                    authorization: this.token,
                  },
                }
              )
            ).data.datos[0].cod_departamento;
            return codDepa;
          }
        }
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async obtenerTope() {
      try {
        this.tope = null;
        let codigo = await this.obtenerCodDepto();
        const topePresupuesto = (
          await this.$http.get(
            `departmentWithBudget/${codigo}?gestion=${this.gestion}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data[0].presupuesto_departamento;
        this.tope = topePresupuesto;
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async getObtenerUnidadesDeGasto() {
      try {
        //verificar si mi depa anterior es igual al original si es no cambio
        if (!this.cambioDepa) {
          this.listaUnidadesDeGasto = []; //actualizo la lista cada vez que cambia de departameno
          this.presupuesto.presupuestoValor = []; //este no tiene
          this.presupuestoSinModificar = [];
          this.mostrarMensaje = false;
          const unidadGastoPorDepartamento = (
            await this.$http.get(
              `spendingUnitWithBudget?type=name&departamento=${this.presupuesto.departamento}&gestion=${this.gestion}`,
              {
                headers: {
                  authorization: this.token,
                },
              }
            )
          ).data;

          for (let i = 0; i < unidadGastoPorDepartamento.length; i++) {
            this.listaUnidadesDeGasto.push(unidadGastoPorDepartamento[i]);

            this.presupuesto.presupuestoValor.push(
              unidadGastoPorDepartamento[i].presupuesto_unidad
            );
            this.presupuestoSinModificar.push(
              unidadGastoPorDepartamento[i].presupuesto_unidad
            );
          }
          if (this.listaUnidadesDeGasto.length == 0) {
            this.mostrarMensaje = true;
          }
          if (this.presupuesto.departamento != "Seleccione una opcion") {
            //guardo la facultad anterior
            this.depaAnterior = this.presupuesto.departamento;
          }
        }
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async cambiaFacultad() {
      this.cambioFacu = false;
      if (this.listaUnidadesDeGasto.length > 0) {
        if (this.facultadAnterior != null) {
          let facuActual = this.presupuesto.facultad;
          if (this.facultadAnterior != facuActual) {
            this.cambioFacu = true;
            await this.obtenerDepartamentos();
            this.alert22(
              "warning",
              "Esta seguro que quiere cambiar de Facultad ?"
            );
          }
        }
      }
    },
    async cambiaDepartamento() {
      this.cambioDepa = false;
      if (this.listaUnidadesDeGasto.length > 0) {
        if (this.depaAnterior != null) {
          let depaActual = this.presupuesto.departamento;
          if (this.depaAnterior != depaActual) {
            this.cambioDepa = true;
            await this.getObtenerUnidadesDeGasto();
            this.alert2(
              "warning",
              "Esta seguro que quiere cambiar de Departamento? "
            );
          } else {
            this.cambioDepa = true; //para qu no se recargue de nuevo si selecciono el mismo dep
          }
        }
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    alert2(alertType, alertMessage) {
      this.$refs.alert2.showAlert(alertType, alertMessage);
    },
    alert22(alertType, alertMessage) {
      this.$refs.alert22.showAlert(alertType, alertMessage);
    },
    //DEPARTA
    variableHijo(value) {
      this.variableRecibida = value;
      if (this.variableRecibida) {
        this.cambioDepa = false;
        this.presupuesto.presupuestoValor = [];
        this.presupuestoSinModificar = [];
        this.listDepartament = []; //los departamentos se borran

        this.getObtenerUnidadesDeGasto(); //facultad
        this.obtenerDepartamentosVariante(); //este es distinto departamento no pone seleccione una opcion
      }
    },
    variableHijo1(value) {
      this.variableRecibida1 = value;
      if (this.variableRecibida1) {
        this.cambioFacu = false;
        this.cambioDepa = false;
        this.presupuesto.facultad = this.facultadAnterior;
        this.presupuesto.departamento = this.depaAnterior;
      }
    },
    //FACULTAD
    variableHijo_otro() {
      this.cambioFacu = false;
      this.listaUnidadesDeGasto = [];
      this.presupuesto.departamento = "Seleccione una opcion";
      this.depaAnterior = null;
      this.presupuesto.presupuestoValor = [];
      this.presupuestoSinModificar = [];
      this.listDepartament = []; //los departamentos se borran
      this.getObtenerUnidadesDeGasto(); //facultad
      this.obtenerDepartamentos(); //este es distinto departamento
    },
    variableHijo1_otro(value) {
      this.variableRecibida1 = value;
      if (this.variableRecibida1) {
        this.cambioFacu = false;
        this.cambioDepa = false;
        this.presupuesto.facultad = this.facultadAnterior;
        this.presupuesto.departamento = this.depaAnterior;
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
      } else if (cantidad > this.tope) {
        return "Mayor al tope";
      }
    },
    async verificarTope() {
      this.desabilitarTope = false;
      let suma = 0;
      for (let i = 0; i < this.presupuesto.presupuestoValor.length; i++) {
        let cantidad = parseFloat(this.presupuesto.presupuestoValor[i]);
        suma = suma + cantidad;
        if (cantidad > this.tope) {
          this.desabilitarTope = true;

          break;
        }
      }
      if (suma > this.tope) {
        this.desabilitarTope = true;
      }
      return this.desabilitarTope;
    },
    async actualizarPresupuesto(codUni, presupuesto) {
      try {
        await this.$http.put(
          `spendingUnitBudget/${codUni}`,
          {
            presupuesto_unidad: presupuesto,
            gestion_presupuestounidad: this.gestion,
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
    async sumarPresupues() {
      this.sumaPresu = 0;
      for (let i = 0; i < this.presupuesto.presupuestoValor.length; i++) {
        let cantidad = parseFloat(this.presupuesto.presupuestoValor[i]);
        this.sumaPresu = this.sumaPresu + cantidad;
      }
    },
    async submitForm() {
      try {
        let desabilito = await this.verificarTope();
        if (!this.$v.presupuesto.$invalid) {
          if (!desabilito) {
            for (let i = 0; i < this.presupuesto.presupuestoValor.length; i++) {
              if (
                this.presupuesto.presupuestoValor[i] !=
                this.presupuestoSinModificar[i]
              ) {
                //actual - anterior
                let codigoUnidad = await this.listaUnidadesDeGasto[i]
                  .cod_unidadgasto;
                let presupuestoEditado = this.presupuesto.presupuestoValor[i];
                await this.actualizarPresupuesto(
                  codigoUnidad,
                  presupuestoEditado
                );
              }
            }
            this.alert("success", "Presupuesto actualizado exitosamente");
            window.setInterval(window.location.reload(), 10000);
          } else {
            this.alert("warning", "El presupuesto sobrepasa el tope.");
          }
        }
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
  },
};
</script>

<style scoped>
.contenedor__pres {
  background-color: #f7f6f6;
  padding: 40px 60px 40px 60px;
  width: 100%;
  min-height: 500px;
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
.form__unidadesGasto {
  text-align: left;
  margin: 20px;
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
.listas__desplegables {
  display: flex;
  width: 100%;
}
.form__facultad {
  width: 50%;
  margin-top: 20px;
  margin-right: 30px;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}
.presupuesto__total {
  text-align: left;
  margin-top: 20px;
  font-weight: bold;
  color: #003975;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.primera-fila {
  background: #dfe4ea;
}
.input-tables {
  width: 100%;
  padding: 10px;
  border: none;
}
.mensaje {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  height: 260px;
  margin-right: 20px;
}
.historial {
  text-align: right;
  margin-top: 20px;
}
</style>
