<template>
  <div class="contenedor-historial">
    <h2 class="item_title">Historial de Presupuestos</h2>

    <div class="form_desc">
      Ingrese el año para ver el historial de presupuestos.
    </div>

    <lista-desplegable-change
      required
      v-model="historial.year"
      nombreLista="Año:"
      :lista="listaAños"
      :value="historial.year"
      v-on:change="getHistorialAnual()"
    ></lista-desplegable-change>
    <div
      v-if="
        !this.mostrarMensaje &&
          this.listaHistorialDatos.length == 0 &&
          this.historial.year == 'Seleccione una opcion'
      "
    >
      <p class="form_check-error mensaje">
        (*) Para poder ver el historial seleccione una año.
      </p>
    </div>

    <div v-if="this.mostrarMensaje && this.listaHistorialDatos.length == 0">
      <p class="form_check-error mensaje">
        No existe un historial de este año.
      </p>
    </div>
    <div v-if="this.listaHistorialDatos.length > 0" class="tabla-historial">
      <b-table
        light
        hover
        bordered
        fixed
        :items="listaHistorialDatos"
        :fields="fields"
      >
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListaDesplegableChange from "./ListaDesplegableChange.vue";
export default {
  components: { ListaDesplegableChange },
  computed: {
    ...mapState(["token"]),
  },
  name: "HistorialPresupuestos",
  data() {
    return {
      historial: {
        year: "Seleccione una opcion",
      },
      fields: [
        "Departamento",
        "Unidad_gasto",
        "Usuario",
        "Fecha_Modificacion",
        "Presupuesto_Anterior",
        "Presupuesto_Actual",
      ],
      listaAños: [],
      listaHistorialDatos: [],
      mostrarMensaje: false,
    };
  },
  mounted() {
    this.listaAños = [];
    this.listaAños = this.rangeYear();
  },
  methods: {
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
    async getNombreDep(value) {
      try {
        const infoDep = (
          await this.$http.get(`department/${value}`, {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos[0].nombre_departamento;
        return infoDep;
      } catch (error) {
        console.log(error);
      }
    },
    async getHistorialAnual() {
      try {
        this.mostrarMensaje = false;
        this.listaHistorialDatos = [];
        const historialAnual = (
          await this.$http.get(
            `spendingUnitSpendingHistory?year=${this.historial.year}`,
            {
              headers: {
                authorization: this.token,
              },
            }
          )
        ).data.datos;
        for (let i = 0; i < historialAnual.length; i++) {
          let usuarioModifico = historialAnual[i].usuario;
          let fechaModificacion = historialAnual[i].fecha;
          let fechaFormato = await this.transformarFecha(fechaModificacion);
          let datoNuevoNombreUnidad =
            historialAnual[i].dato_nuevo.nombre_unidadgasto;
          let datoNuevoCodDepartamento =
            historialAnual[i].dato_nuevo.cod_departamento;
          let nombreDepartamento = await this.getNombreDep(
            datoNuevoCodDepartamento
          );
          let datoNuevoPresupuesto =
            historialAnual[i].dato_nuevo.presupuesto_unidad;
          let datoViejoPresupuesto =
            historialAnual[i].dato_viejo.presupuesto_unidad;
          const dato = {
            Departamento: nombreDepartamento,
            Unidad_gasto: datoNuevoNombreUnidad,
            Usuario: usuarioModifico,
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
</style>
