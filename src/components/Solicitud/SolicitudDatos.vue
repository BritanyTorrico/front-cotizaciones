<template>
  <div class="container">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
      crossorigin="anonymous"
    />

    <form @submit.prevent="submitForm">
      <div class="form_title">
        <label>
          <div class="formulario_label">Titulo:</div>
          <input
            :class="
              $v.solicitud.nombre_solicitud.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            v-model="solicitud.nombre_solicitud"
          />
        </label>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.nombre_solicitud.required"
        >
          Campo obligatorio.
        </div>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.nombre_solicitud.maxLength"
        >
          Máximo
          {{ $v.solicitud.nombre_solicitud.$params.maxLength.max }}caracteres.
        </div>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.nombre_solicitud.minLength"
        >
          Minimo 5 caracteres.
        </div>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.nombre_solicitud.alpha1"
        >
          No se aceptan caracteres especiales.
        </div>
      </div>
      <div class="form_unidadGasto">
        <lista-desplegable
          required
          v-model="solicitud.unidadgasto_solicitud"
          nombreLista="Unidad de gasto"
          :lista="listaUnidadesDeGasto"
        ></lista-desplegable>
      </div>

      <div class="form__justficacion">
        <label>
          <div class="formulario_label">Justificacion:</div>
          <textarea
            rows="4"
            cols="50"
            :class="
              $v.solicitud.detalle_solicitud.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            v-model="solicitud.detalle_solicitud"
          />
        </label>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.detalle_solicitud.required"
        >
          Campo obligatorio.
        </div>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.detalle_solicitud.maxLength"
        >
          Máximo
          {{ $v.solicitud.detalle_solicitud.$params.maxLength.max }}caracteres.
        </div>
        <div
          class="form_check-error"
          v-if="!$v.solicitud.detalle_solicitud.minLength"
        >
          Minimo 5 caracteres.
        </div>
      </div>

      <div class="form__categoria">
        <div class="container__label">Categoria:</div>
        <select
          v-model="solicitud.categoria"
          class="container__list"
          @change="obtenerItems()"
        >
          <option disabled="true">{{ solicitud.categoria }}</option>
          <option
            class="container__list__option"
            v-for="(item, index) in listaCategorias"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
      <div class="container">
        <div class="container__label">item de gasto:</div>
        <select required class="container__list" v-model="solicitud.item_gasto">
          <option disabled="true">{{ solicitud.item_gasto }}</option>

          <option
            class="container__list__option"
            v-for="(item, index) in listItems"
            :key="index"
            :value="item"
          >
            {{ item }}</option
          >
        </select>
      </div>

      <div class="form__cantidad">
        <label>
          <div class="formulario_label">Cantidad:</div>
          <input
            :class="
              $v.solicitud.cantidad.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            :required="!habilitar"
            :disabled="!disabled"
            type="number"
            placeholder="Ingrese la cantidad"
            v-model="solicitud.cantidad"
          />
        </label>
      </div>
      <div>
        <a class="btn btn-success" @click="agregarItem()">Agregar</a>
      </div>

      <div class="form__descripcion">Descripción:</div>
      <div class="form__lista col-sm-8 col-sm-offset-2">
        <table class="table">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre de item</th>
              <th>eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.listaSolicitudItems" :key="index">
              <td>
                {{ item.cantidad }}
              </td>
              <td>
                {{ item.item_gasto }}
              </td>
              <td>
                <a class="btn btn-danger" @click="eliminarItems(index)"
                  >Eliminar</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 v-if="this.listaSolicitudItems.length == 0">Seleccione un item</h4>
      <Alert ref="alert"></Alert>
      <AlertConfirmation ref="alertConfirmation"></AlertConfirmation>
      <div>
        <input type="submit" value="enviar" class="btn btn-success" />
      </div>
      {{ this.listaSolicitudItems }}
      <p>datos</p>
      {{ solicitud }}
    </form>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  helpers,
} from "vuelidate/lib/validators";
import Alert from "@/components/User/Alert.vue";
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/);
import ListaDesplegable from "@/components/User/ListaDesplegable.vue";
import AlertConfirmation from "@/components/Solicitud/AlertConfirmation.vue";
import { mapState, mapActions } from "vuex";
import { store } from "@/store/index.js";
export default {
  components: { Alert, ListaDesplegable, AlertConfirmation },
  name: "SolicitudDatos",
  store,
  mounted() {
    this.getCategories();
    this.getDepartamento();
  },
  computed: {
    ...mapState(["token", "listaSolicitudItems"]),
  },
  data() {
    return {
      solicitud: {
        nombre_solicitud: null,
        detalle_solicitud: null,
        categoria: "Seleccione una opcion",
        item_gasto: "Seleccione una opcion",
        cantidad: null,
        unidadgasto_solicitud: null,
      },
      listaCategorias: [],

      listItems: [],
      listaPeticion: [], //aqui esta la lista de items que mandare
      item: "",
      disabled: true,
      habilitar: true,
      listaUnidadesDeGasto: [],
    };
  },
  validations: {
    solicitud: {
      nombre_solicitud: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50),
        alpha1,
      },
      detalle_solicitud: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(1000),
      },
      cantidad: {
        required,
      },
      unidadgasto_solicitud: {
        required,
      },
    },
  },
  methods: {
    ...mapActions(["setlistaSolicitudItems"]),
    async submitForm() {
      try {
        if (!this.$v.solicitud.$invalid) {
          this.alert("success", "Solicitud enviada");
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
        console.log(error);
      }
    },
    async getCategories() {
      const categ = (
        await this.$http.get("specificCategory", {
          headers: {
            authorization: this.token,
          },
        })
      ).data;
      for (let i = 0; i < categ.length; i++) {
        this.listaCategorias.push(categ[i].nombre_categoriaespecifica);
      }
    },

    async obtenerItems() {
      if (
        this.solicitud.categoria != null &&
        this.listaSolicitudItems.length > 0
      ) {
        let categoriaLista = this.listaSolicitudItems[
          this.listaSolicitudItems.length - 1
        ].categoria;
        if (categoriaLista != this.solicitud.categoria) {
          //si la categoria cambia
          this.alertConfirmation(
            "warning",
            "Si cambia de categoria se borrara toda la lista !"
          );
        }
      }

      if (this.solicitud.categoria == "Servicios") {
        this.disabled = false;
        this.solicitud.cantidad = 1;
      } else {
        this.disabled = true;
      }

      this.listItems = [];

      let listaItems = (
        await this.$http.get(`expenseItem?cat=${this.solicitud.categoria}`, {
          headers: {
            authorization: this.token,
          },
        })
      ).data;

      for (let i = 0; i < listaItems.length; i++) {
        this.listItems.push(listaItems[i].nombre_itemgasto);
      }
    },

    eliminarItems: function(index) {
      this.$store.commit("setEliminar", index);
    },
    agregarItem: function() {
      this.obtenerItems();

      if (
        this.solicitud.item_gasto != "Seleccione una opcion" &&
        this.solicitud.categoria === "Servicios"
      ) {
        const item = {
          item_gasto: this.solicitud.item_gasto,
          cantidad: this.solicitud.cantidad,
          categoria: this.solicitud.categoria,
        };
        // this.listaPeticion.push(item);

        this.$store.commit("setlistaSolicitudItems", item);

        this.solicitud.item_gasto = "Seleccione una opcion";
        this.solicitud.cantidad = null;
      } else {
        if (
          this.solicitud.item_gasto != "Seleccione una opcion" &&
          !this.$v.solicitud.cantidad.$invalid
        ) {
          const item = {
            item_gasto: this.solicitud.item_gasto,
            cantidad: this.solicitud.cantidad,
            categoria: this.solicitud.categoria,
          };
          // this.listaPeticion.push(item);
          this.$store.commit("setlistaSolicitudItems", item);

          this.solicitud.item_gasto = "Seleccione una opcion";
          this.solicitud.cantidad = null;
        } else {
          this.alert("warning", "Ingrese un item porfavor");
        }
      }
      //SEGUNDA VERIFICACION
      if (this.listaSolicitudItems.length > 1) {
        let anteriorCat = this.listaSolicitudItems[
          this.listaSolicitudItems.length - 2
        ].categoria;
        let actual = this.listaSolicitudItems[
          this.listaSolicitudItems.length - 1
        ].categoria;
        console.log("anterior" + anteriorCat);
        console.log("anterior" + actual);
        if (anteriorCat != actual) {
          for (let i = 0; i < this.listaSolicitudItems.length; i++) {
            if (this.listaSolicitudItems[i].categoria === actual) {
              this.$store.commit("setEliminar", i);
            }
          }
        }
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
    alertConfirmation(alertType, alertMessage) {
      this.$refs.alertConfirmation.showAlert(alertType, alertMessage);
    },
    async getDepartamento() {
      const departamentoOfUser = (
        await this.$http.get(
          `departmentOfUser?typeIn=name&typeOut=cod&user=${localStorage.getItem(
            "nombreUsuario"
          )}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data;
      const dep = departamentoOfUser[0].cod_departamento;
      const unidadGastoPorDepartamento = (
        await this.$http.get(`spendingUnit?type=cod&departamento=${dep}`, {
          headers: {
            authorization: this.token,
          },
        })
      ).data;
      console.log(unidadGastoPorDepartamento.datos.length);
      for (let i = 0; i < unidadGastoPorDepartamento.datos.length; i++) {
        this.listaUnidadesDeGasto.push(
          unidadGastoPorDepartamento.datos[i].nombre_unidadgasto
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: left;
  padding-top: 20px;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  width: 80%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
}
</style>
