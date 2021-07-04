<template>
  <div class="contenedor-historial">
    <h2 class="item_title">Historial de Presupuestos por departamento</h2>

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
          v-on:change="forceRerender1(), forceRerender2()"
        ></lista-desplegable-change>
        <div
          class="form_check-error"
          v-if="!$v.historial.depto.validate_requerido_listas"
        >
          2. Campo Obligatorio.
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
          3. Campo Obligatorio.
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
        (*) Para poder ver el historial debe seleccionar una opción de los 3
        campos.
      </p>
    </div>
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
    <div v-if="this.mostrarMensaje && this.listaHistorialDatos.length == 0">
      <p
        class="form_check-error mensaje"
        v-if="
          historial.year != 'Seleccione una opcion' &&
            historial.facultad != 'Seleccione una opcion' &&
            historial.depto != 'Seleccione una opcion'
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
  name: "HistorialPresupuestosDep",
  components: { ListaDesplegableChange },
  computed: {
    ...mapState(["token"]),
  },

  data() {
    return {
      loading: false,
      sortBy: "Unidad_gasto",
      sortDesc: false,
      historial: {
        year: "Seleccione una opcion",
        facultad: "Seleccione una opcion",
        depto: "Seleccione una opcion",
      },
      fields: [
        "Nombre_usuario",
        "Fecha_Modificacion",
        "Departamento",
        "Presupuesto_Anterior",
        "Presupuesto_Actual",
      ],
      listaAños: [],

      listaCodFacultad: [],
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
          const facu = {
            nombre_facultad: listaFacultades[i].nombre_facultad,
            cod_facultad: listaFacultades[i].cod_facultad,
          };
          this.listaCodFacultad.push(facu);
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
      ).data.datos;

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
    async obtenerCodFacultad() {
      for (let i = 0; i < this.listfacultad.length; i++) {
        if (
          this.historial.facultad === this.listaCodFacultad[i].nombre_facultad
        ) {
          return this.listaCodFacultad[i].cod_facultad;
        }
      }
    },
    async getHistorialAnual() {
      this.loading=!this.loading
      try {
        const cod_dep = await this.obtenerCodDepartamento();
        const cod_facultad = await this.obtenerCodFacultad();

        this.mostrarMensaje = false;
        this.listaHistorialDatos = [];
        const historialAnual = (
          await this.$http.get(
            `departmentHistory?year=${this.historial.year}&codFac=${cod_facultad}&codDepto=${cod_dep}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data;

        for (let i = 0; i < historialAnual.length; i++) {
          let usuarioModifico = historialAnual[i].usuarioResponsable;
          let codUsuario = await this.transformarNombreUsuario(usuarioModifico);
          let nombreUser = await this.obtenerNombrePorCod(codUsuario);

          let fechaModificacion = historialAnual[i].fechaCambio;
          let fechaFormato = await this.transformarFecha(fechaModificacion);
          let nombreDep = historialAnual[i].nombreDepartamento;
          let datoNuevoPresupuesto =
            historialAnual[i].presupuestoDepartamentoNuevo;
          let datoViejoPresupuesto =
            historialAnual[i].presupuestoDepartamentoAnterior;
          const dato = {
            Nombre_usuario: nombreUser,
            Fecha_Modificacion: fechaFormato,
            Departamento: nombreDep,
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
      this.loading=!this.loading
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

<style lang="scss" scoped>
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
.loading-info{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
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
.primera-fila {
  background: #dfe4ea;
}
.tabla-historial {
  margin-top: 40px;
  text-align: left;
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
  width: 60%;
  padding-right: 70px;
}
.sr-only {
  display: none;
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
</style>
