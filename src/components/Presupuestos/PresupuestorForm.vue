<template>
  <div class="contenedor__pres">
    <h2 class="item_title">Registrar Presupuesto</h2>
    <label>
      <div class="form_desc">
        Ingrese el presupuesto anual para cada unidad de gasto
      </div>
    </label>
    <div class="form__datos">
      <div class="listas__desplegables">
        <div class="form__facultad">
          <div class="container__label">Facultad:</div>
          <select
            v-model="presupuesto.facultad"
            @change="obtenerDepartamentos(), forceRerender()"
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
      <div class="form__unidadesGasto ">
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
                <input
                  class="input-tables"
                  type="text"
                  placeholder="Ingrese valor"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <!--  {{ this.listaUnidadesDeGasto }}-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { helpers } from "vuelidate/lib/validators";
import ListaDesplegableChange from "../Presupuestos/ListaDesplegableChange.vue";

const validate_requerido_listas = (value) => {
  const datovalue = String(value);
  if (datovalue === "Seleccione una opcion") {
    return !helpers.req(value) || datovalue != "Seleccione una opcion";
  } else {
    return true;
  }
};
export default {
  components: { ListaDesplegableChange },
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
      presupuesto: {
        facultad: "Seleccione una opcion",
        departamento: "Seleccione una opcion",
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
    async getObtenerUnidadesDeGasto() {
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

      for (let i = 0; i < unidadGastoPorDepartamento.datos.length; i++) {
        this.listaUnidadesDeGasto.push(unidadGastoPorDepartamento.datos[i]);
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
</style>
