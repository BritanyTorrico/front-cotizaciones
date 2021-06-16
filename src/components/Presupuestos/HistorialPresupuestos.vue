<template>
  <div class="contenedor-historial">
    <h2 class="item_title">Historial de Presupuestos</h2>

    <div class="form_desc"></div>
    <div class="seccion">
      <div class="cuadrado">
        <lista-desplegable-change
          required
          v-model="historial.facultad"
          nombreLista="Facultades:"
          :lista="listfacultad"
          :value="historial.facultad"
          v-on:change="obtenerDepartamentos(), forceRerender()"
        ></lista-desplegable-change>
        <div
          class="form_check-error"
          v-if="!$v.historial.facultad.validate_requerido_listas"
        >
          1. Campo Obligatorio.
        </div>
      </div>

      <div class="cuadrado" :key="componentKey">
        <lista-desplegable-change
          required
          v-model="historial.depto"
          nombreLista="Departamento:"
          :lista="listDepartament"
          :value="historial.depto"
          v-on:change="obtenerUnidadesDeGasto(), forceRerender1()"
        ></lista-desplegable-change>
        <div
          class="form_check-error"
          v-if="!$v.historial.depto.validate_requerido_listas"
        >
          2. Campo Obligatorio.
        </div>
      </div>
    </div>
    <div class="seccion">
      <div class="cuadrado">
        <lista-desplegable-change
          required
          :key="componentKey1"
          v-model="historial.unidadDeGasto"
          nombreLista="Unidades de gasto:"
          :lista="listaUnidadesDeGasto"
          :value="historial.unidadDeGasto"
          v-on:change="forceRerender2()"
        ></lista-desplegable-change>
        <div
          class="form_check-error"
          v-if="!$v.historial.unidadDeGasto.validate_requerido_listas"
        >
          3. Campo Obligatorio.
        </div>
      </div>
      <div class="cuadrado">
        <lista-desplegable-change
          required
          :key="componentKey2"
          v-model="historial.year"
          nombreLista="Año:"
          :lista="listaAños"
          :value="historial.year"
          v-on:change="getHistorialAnual()"
        ></lista-desplegable-change>
        <div
          class="form_check-error"
          v-if="!$v.historial.year.validate_requerido_listas"
        >
          4. Campo Obligatorio.
        </div>
      </div>
    </div>

    <div
      v-if="
        !this.mostrarMensaje &&
          this.listaHistorialDatos.length == 0 &&
          this.historial.year == 'Seleccione una opcion'
      "
    >
      <p class="form_check-error mensaje">
        (*) Para poder ver el historial debe seleccionar una opción de los 4
        campos.
      </p>
    </div>

    <div v-if="this.mostrarMensaje && this.listaHistorialDatos.length == 0">
      <p
        class="form_check-error mensaje"
        v-if="
          historial.year != 'Seleccione una opcion' &&
            historial.facultad != 'Seleccione una opcion' &&
            historial.depto != 'Seleccione una opcion' &&
            historial.unidadDeGasto != 'Seleccione una opcion'
        "
      >
        No existe un historial de este año.
      </p>
    </div>
    <div
      v-if="this.listaHistorialDatos.length > 0"
      class="tabla-historial"
      id="tablaH"
    >
      <b-table
        light
        hover
        bordered
        fixed
        :items="listaHistorialDatos"
        :fields="fields"
        thead-class="bg-secondary hola text-white"
      >
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListaDesplegableChange from "./ListaDesplegableChange.vue";
import { helpers } from "vuelidate/lib/validators";
const validate_requerido_listas = (value) => {
  const datovalue = String(value);
  if (datovalue === "Seleccione una opcion") {
    return !helpers.req(value) || datovalue != "Seleccione una opcion";
  } else {
    return true;
  }
};
export default {
  name: "HistorialPresupuestos",
  components: { ListaDesplegableChange },
  computed: {
    ...mapState(["token"]),
  },

  data() {
    return {
      historial: {
        year: "Seleccione una opcion",
        facultad: "Seleccione una opcion",
        depto: "Seleccione una opcion",
        unidadDeGasto: "Seleccione una opcion",
      },
      fields: [
        "Unidad_gasto",
        "Nombre_usuario",
        "Fecha_Modificacion",
        "Presupuesto_Anterior",
        "Presupuesto_Actual",
      ],
      listaAños: [],
      listaUnidadesDeGasto: [],
      listaCodUnidad: [],
      listfacultad: [],
      listDepartament: [],
      listaCodDepartament: [],
      listaHistorialDatos: [],

      mostrarMensaje: false,
      componentKey: 0,
      componentKey1: 1,
      componentKey2: 0,
    };
  },
  validations: {
    historial: {
      year: {
        validate_requerido_listas,
      },
      facultad: { validate_requerido_listas },
      depto: { validate_requerido_listas },
      unidadDeGasto: { validate_requerido_listas },
    },
  },
  mounted() {
    this.listaAños = [];
    this.listfacultad = [];
    this.listaAños = this.rangeYear();
    this.obtenerFacultades();
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
      this.listDepartament = [];
      this.listaCodDepartament = [];
      let listaDepartamentos = (
        await this.$http.get(`department?facu=${this.historial.facultad}`, {
          headers: {
            authorization: this.token,
          },
        })
      ).data;
      for (let i = 0; i < listaDepartamentos.length; i++) {
        const depa = {
          nombre_departamento: listaDepartamentos[i].nombre_departamento,
          cod_departamento: listaDepartamentos[i].cod_departamento,
        };
        this.listDepartament.push(listaDepartamentos[i].nombre_departamento);
        this.listaCodDepartament.push(depa);
      }
      this.historial.depto = "Seleccione una opcion";
    },
    async obtenerUnidadesDeGasto() {
      this.historial.unidadDeGasto = "Seleccione una opcion";

      this.listaUnidadesDeGasto = [];
      this.listaCodUnidad = [];
      const unidadGastoPorDepartamento = (
        await this.$http.get(
          `spendingUnit?type=name&departamento=${this.historial.depto}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data;
      for (let i = 0; i < unidadGastoPorDepartamento.datos.length; i++) {
        const unidad = {
          nombre_unidadgasto:
            unidadGastoPorDepartamento.datos[i].nombre_unidadgasto,
          cod_unidadgasto: unidadGastoPorDepartamento.datos[i].cod_unidadgasto,
        };
        this.listaCodUnidad.push(unidad);

        this.listaUnidadesDeGasto.push(
          unidadGastoPorDepartamento.datos[i].nombre_unidadgasto
        );
      }
    },
    rangeYear() {
      const max = new Date().getFullYear();
      const min = max - 10;
      const years = [];

      for (let i = max; i >= min; i--) {
        years.push(i);
      }
      return years;
    },
    async transformarFecha(value) {
      const yyvalue = value.slice(0, 4);
      const mmvalue = value.slice(5, 7);
      const ddvalue = value.slice(8, 10);
      const fechaNormal = ddvalue + "-" + mmvalue + "-" + yyvalue;
      return fechaNormal;
    },
    async obtenerCodDepartamento() {
      for (let i = 0; i < this.listDepartament.length; i++) {
        if (
          this.historial.depto ===
          this.listaCodDepartament[i].nombre_departamento
        ) {
          return this.listaCodDepartament[i].cod_departamento;
        }
      }
    },
    async obtenerCodUnidades() {
      for (let i = 0; i < this.listaUnidadesDeGasto.length; i++) {
        if (
          this.historial.unidadDeGasto ===
          this.listaCodUnidad[i].nombre_unidadgasto
        ) {
          return this.listaCodUnidad[i].cod_unidadgasto;
        }
      }
    },
    async transformarNombreUsuario(value) {
      try {
        const nombreUsuario = (
          await this.$http.get(`users/name/${value}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0];

        return nombreUsuario.cod_usuario;
      } catch (error) {
        console.log(error);
      }
    },
    async obtenerNombrePorCod(value) {
      try {
        const nombreUsuario = (
          await this.$http.get(`users/${value}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0];
        const nombreU = nombreUsuario.nombres;
        const apellidoU = nombreUsuario.apellidos;
        const nombreCompleto = nombreU + " " + apellidoU;
        return nombreCompleto;
      } catch (error) {
        console.log(error);
      }
    },
    async getHistorialAnual() {
      try {
        const cod_dep = await this.obtenerCodDepartamento();
        const cod_unidad = await this.obtenerCodUnidades();
        console.log(cod_dep);
        console.log(cod_unidad);
        this.mostrarMensaje = false;
        this.listaHistorialDatos = [];
        const historialAnual = (
          await this.$http.get(
            `spendingUnitSpendingHistory?year=${this.historial.year}&codUnit=${cod_unidad}&codDepto=${cod_dep}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data;
        console.log(historialAnual);

        for (let i = 0; i < historialAnual.length; i++) {
          let usuarioModifico = historialAnual[i].usuarioResponsable;
          let codUsuario = await this.transformarNombreUsuario(usuarioModifico);
          let nombreUser = await this.obtenerNombrePorCod(codUsuario);

          let fechaModificacion = historialAnual[i].fechaCambio;
          let fechaFormato = await this.transformarFecha(fechaModificacion);
          let datoNuevoNombreUnidad = historialAnual[i].nombreUnidad;

          let datoNuevoPresupuesto = historialAnual[i].presupuestoUnidadNuevo;
          let datoViejoPresupuesto =
            historialAnual[i].presupuestoUnidadAnterior;
          const dato = {
            Unidad_gasto: datoNuevoNombreUnidad,
            Nombre_usuario: nombreUser,
            Fecha_Modificacion: fechaFormato,
            Presupuesto_Actual: datoNuevoPresupuesto,
            Presupuesto_Anterior: datoViejoPresupuesto,
          };
          this.listaHistorialDatos.push(dato);
        }
        if (this.listaHistorialDatos.length == 0) {
          this.mostrarMensaje = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    forceRerender() {
      this.componentKey += 1;
    },
    forceRerender1() {
      this.componentKey1 += 1;
    },
    forceRerender2() {
      this.historial.year = "Seleccione una opcion";
      console.log("hola");
      this.componentKey2 += 1;
    },
  },
};
</script>

<style scoped>
.contenedor-historial {
  background-color: #f7f6f6;
  padding: 20px 30px 20px 30px;
  display: flex;
  flex-direction: column;
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
.primera-fila {
  background: #dfe4ea;
}
.tabla-historial {
  margin-top: 40px;
  text-align: left;
}
table thead tr th {
  background: red;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.mensaje {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  height: 260px;
  margin-right: 20px;
}
.container__list {
  font-size: 16px;
  width: 86%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}
.seccion {
  display: flex;
}
.cuadrado {
  width: 50%;
  padding-right: 70px;
}
.green-bg {
  background-color: green;
}
.hola {
  background: red;
}
</style>
