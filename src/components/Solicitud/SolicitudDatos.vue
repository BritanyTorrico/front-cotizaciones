<template>
  <div class="container-soli">
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
      crossorigin="anonymous"
    />

    <form @submit.prevent="submitForm">
      <div class="form_title">
        <div class="formulario_label">Titulo:</div>
        <input
          :class="
            $v.solicitud.nombre_solicitud.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="text"
          v-model="solicitud.nombre_solicitud"
          name="titulo"
        />

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
      <div class="lista">
        <div class="izquierda"></div>
        <div class="derecha" id="unidad">
          <lista-desplegable
            :key="componentKey"
            required
            v-model="solicitud.unidadgasto_solicitud"
            nombreLista="Unidad de gasto:"
            :lista="listaUnidadesDeGasto"
            Mensaje="Campo Obligatorio"
            :value="solicitud.unidadgasto_solicitud"
            
          ></lista-desplegable>
        </div>
      </div>

      <div class="form__justficacion">
        <div class="formulario_label">Detalle de solicitud:</div>
        <textarea
          rows="7"
          cols="50"
          :class="
            $v.solicitud.detalle_solicitud.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="text"
          v-model="solicitud.detalle_solicitud"
          name="detalle"
        />

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

      <div class="seccion2">
        <div class="seccion__Izq">
          <div class="formulario_label seccion__Izq-titulo">
            Agregar un nuevo item:
          </div>
          <div class="seccion__Izq-fila1">
            <div class="form__categoria">
              <div class="container__label">Categoria:</div>
              <div class="contenedor-select">
                <select
                  v-model="solicitud.categoria"
                  class="container__list"
                  @change="obtenerItems()"
                  name="categoria"
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
            </div>
            <div class="container-nombre-item">
              <div class="container__label">item de gasto:</div>
              <div class="contenedor-select">
                <select
                  required
                  class="container__list"
                  v-model="solicitud.nombre_item"
                  @change="obtenerDescripcion()"
                  name="item"
                >
                  <option disabled="true">{{ solicitud.nombre_item }}</option>

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
            </div>
          </div>

          <div class="seccion__Izq-fila2">
            <div
              v-if="this.solicitud.categoria != 'Servicios'"
              class="form__cantidad"
            >
              <div class="formulario_label">
                Cantidad:
              </div>
              <div class="cantidad-input">
                <input
                  :class="
                    $v.elemento.cantidad.$invalid
                      ? 'form_check-input-error'
                      : 'form__input'
                  "
                  :required="!habilitar"
                  :disabled="!disabled"
                  type="number"
                  v-model="elemento.cantidad"
                  name="cantidad"
                />
              </div>

              <div
                class="form_check-error"
                v-if="!$v.elemento.cantidad.between"
              >
                Ingrese valores entre 1-100.
              </div>
            </div>
            <div class="form__boton">
              <a class="btn btn-success boton-agregar" @click="agregarItem()" id="agregar"
                >Agregar</a
              >
            </div>
          </div>

          <!---->
        </div>

        <div class="seccion__Der">
          <div
            class="form__descripcion"
            v-if="solicitud.nombre_item != 'Seleccione una opcion'"
          >
            <div class="formulario_label">
              Descripción:
            </div>
            <div class="form__descripcion-contenido">
              <textarea
                rows="7"
                cols="50"
                class="form__input"
                type="text"
                v-model="descripcionItem"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="form__lista col-sm-8 col-sm-offset-2"
        v-if="this.listaSolicitudItems.length != 0"
      >
        <div
          class="formulario_label"
          v-if="this.solicitud.categoria != 'Servicios'"
        >
          Lista de items:
        </div>
        <div
          class="formulario_label"
          v-if="this.solicitud.categoria == 'Servicios'"
        >
          Lista de Servicios:
        </div>
        <div class="form__tabla">
          <table class="table table-striped tabla ">
            <thead>
              <tr class="primera-fila">
                <th>Cantidad</th>
                <th>Nombre de item</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in this.listaSolicitudItems"
                :key="index"
              >
                <td>
                  {{ item.cantidad }}
                </td>
                <td>
                  {{ item.nombre_item }}
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
      </div>
      <h4 class="form_check-error" v-if="this.listaSolicitudItems.length == 0">
        (*) Agregue un item
      </h4>
      <div class="form__presupuesto">
        <div class="aux-izquierdo"></div>
        <div class="presupuesto">
          <div class="formulario_label">Presupuesto:</div>
          <input
            :class="
              $v.solicitud.estimado_solicitud.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            v-model="solicitud.estimado_solicitud"
            name="presupuesto"
          />
          <div
            class="form_check-error"
            v-if="!$v.solicitud.estimado_solicitud.required"
          >
            Campo Obligatorio.
          </div>
          <div
            class="form_check-error"
            v-if="!$v.solicitud.estimado_solicitud.between"
          >
            Ingrese valores entre (1-10000).
          </div>
          <div
            class="form_check-error"
            v-if="!$v.solicitud.estimado_solicitud.validate_decimales"
          >
            Maximo 2 decimales.
          </div>
          <div
            class="form_check-error"
            v-if="!$v.solicitud.estimado_solicitud.alpha2"
          >
            Ingrese un valor numérico.
          </div>
        </div>
      </div>
      <Alert ref="alert"></Alert>
      <AlertConfirmation ref="alertConfirmation"></AlertConfirmation>
      <div class="boton-contenedor">
        <div class="boton-contenedor-izq"></div>
        <div class="boton-contenedor-der">
          <input
            type="submit"
            value="Enviar"
            class="btn btn-success boton-agregar"
            id="enviar"
          />
        </div>
      </div>
      <!--{{ this.listaSolicitudItems }}
      <p>datos</p>
      {{ solicitud }}-->
    </form>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  helpers,
  between,
} from "vuelidate/lib/validators";
import Alert from "@/components/User/Alert.vue";
const alpha1 = helpers.regex("alpha1", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.\s]*$/);
const alpha2 = helpers.regex("alpha1", /^[0-9,.\s]*$/);
import ListaDesplegable from "@/components/User/ListaDesplegable.vue";
import AlertConfirmation from "@/components/Solicitud/AlertConfirmation.vue";
import { mapState, mapActions } from "vuex";
import { store } from "@/store/index.js";

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
        nombre_item: "Seleccione una opcion",

        unidadgasto_solicitud: "Seleccione una opcion",
        estimado_solicitud: null,
      },
      elemento: {
        cantidad: null,
      },
      listaCategorias: [],

      listItems: [],
      listaPeticion: [], //aqui esta la lista de items que mandare
      item: "",
      disabled: true,
      habilitar: true,
      listaUnidadesDeGasto: [],
      descripcionItem: null,
      componentKey: 0,
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

      unidadgasto_solicitud: {
        required,
      },
      estimado_solicitud: {
        required,
        between: between(1, 10000),
        validate_decimales,
        alpha2,
      },
    },
    elemento: {
      cantidad: {
        required,
        between: between(1, 100),
      },
    },
  },
  methods: {
    ...mapActions(["setlistaSolicitudItems"]),
    forceRerender() {
      this.componentKey += 1;
    },
    async submitForm() {
      try {
        if (
          !this.$v.solicitud.$invalid &&
          this.listaSolicitudItems.length > 0
        ) {
          await this.$http.post(
            `request`,
            {
              nombre_solicitud: this.solicitud.nombre_solicitud,
              detalle_solicitud: this.solicitud.detalle_solicitud,
              estimado_solicitud: this.solicitud.estimado_solicitud,
              unidadgasto_solicitud: this.solicitud.unidadgasto_solicitud,
            },

            {
              headers: {
                authorization: this.token,
              },
            }
          );
          console.log(this.listaSolicitudItems);
          await this.$http.post(
            `itemsPerRequest`,
            {
              nombre_solicitud: this.solicitud.nombre_solicitud,
              items: this.listaSolicitudItems,
            },
            {
              headers: {
                authorization: this.token,
              },
            }
          );
          this.alert("success", "Solicitud enviada");
          //borrar todos los campos del fomrulario

          this.solicitud.nombre_solicitud = null;
          this.solicitud.detalle_solicitud = null;
          this.solicitud.categoria = "Seleccione una opcion";
          this.solicitud.nombre_item = "Seleccione una opcion";
          this.solicitud.unidadgasto_solicitud = "Seleccione una opcion";
          this.solicitud.estimado_solicitud = null;
          this.$store.commit("setDelete");
          this.listaUnidadesDeGasto = [];
          this.getDepartamento();
          this.forceRerender();
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
        this.alert("warning", "Algo salio mal");
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
            "No puede seleccionar Items de distinta categoria"
          );
        }
      }

      if (this.solicitud.categoria == "Servicios") {
        this.disabled = false;
        this.elemento.cantidad = null;
      } else {
        this.disabled = true;
      }

      this.listItems = [];

      let listaItems = (
        await this.$http.get(
          `expenseItem?type=cat&nombre=${this.solicitud.categoria}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
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
        this.solicitud.nombre_item != "Seleccione una opcion" &&
        this.solicitud.categoria === "Servicios"
      ) {
        const item = {
          nombre_item: this.solicitud.nombre_item,
          cantidad: 1,
          categoria: this.solicitud.categoria,
          unidad_solicitud: this.solicitud.nombre_item,
          detalle_solicitud: this.descripcionItem,
        };
        // this.listaPeticion.push(item);

        this.$store.commit("setlistaSolicitudItems", item);

        this.solicitud.nombre_item = "Seleccione una opcion";
        this.elemento.cantidad = null;
      } else {
        if (
          this.solicitud.nombre_item != "Seleccione una opcion" &&
          !this.$v.elemento.cantidad.$invalid
        ) {
          const item = {
            nombre_item: this.solicitud.nombre_item,
            cantidad: this.elemento.cantidad,
            categoria: this.solicitud.categoria,
            unidad_solicitud: this.solicitud.nombre_item,
            detalle_solicitud: this.descripcionItem,
          };
          // this.listaPeticion.push(item);
          this.$store.commit("setlistaSolicitudItems", item);

          this.solicitud.nombre_item = "Seleccione una opcion";
          this.elemento.cantidad = null;
        } else {
          this.alert("warning", "Rellene correctamente la seccion de items");
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
      const unidadGastoPorDepartamento = (
        await this.$http.get(
          `spendingUnit?type=name&departamento=${localStorage.getItem(
            "depto"
          )}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data;

      for (let i = 0; i < unidadGastoPorDepartamento.datos.length; i++) {
        this.listaUnidadesDeGasto.push(
          unidadGastoPorDepartamento.datos[i].nombre_unidadgasto
        );
      }
    },
    async obtenerDescripcion() {
      const descripcion = (
        await this.$http.get(
          `expenseItem?type=item&nombre=${this.solicitud.nombre_item}`,
          {
            headers: {
              authorization: this.token,
            },
          }
        )
      ).data;
      this.descripcionItem = descripcion.datos[0].descripcion_item;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container-soli {
  text-align: left;
  background-color: #f1f2f6;
  padding: 40px 80px 40px 80px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.container__label {
  color: var(--color-name);
  margin-bottom: 10px;
  font-weight: bold;
}
.container__list {
  font-size: 14px;
  width: 86%;
  color: #576574;
  padding: 6px;
  background: #ecf0f1;
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
.form__input:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #747d8c;
}
.formulario_label {
  padding-left: 6px;
  color: var(--color-name);
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  color: #576574;
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
.form_check-input-error:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid red;
}
.form_check-error {
  color: red;
  font-size: 13px;
  text-align: left;
  margin-left: 20px;
}
.lista {
  display: flex;
}
.izquierda {
  width: 65%;
}
.derecha {
  font-size: 20px;
  float: right;
  width: 35%;
  display: flex;
  justify-content: right;
  align-items: rigth;
  text-align: right;
}
.primera-fila {
  background: #033076;
  color: white;
}
.form__lista {
  width: 100%;
}
.seccion2 {
  display: flex;
  margin-top: 20px;
}
.seccion__Izq {
  width: 60%;
}
.seccion__Izq-fila1 {
  display: flex;
  margin-top: 20px;
}
.form__categoria {
  width: 50%;
}
.container-nombre-item {
  width: 50%;
}
.seccion__Izq-fila2 {
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
}
.form__cantidad {
  width: 50%;
}
.seccion__Der {
  width: 40%;
}
.form__boton {
  width: 40%;
}
.boton-agregar {
  margin-top: 30px;
  width: 100%;
  background: #033076;
  font-weight: bold;
}
.boton-agregar:hover {
  background: #0c59cf;
}
.form__tabla {
  display: flex;
  justify-content: center;
  align-content: center;
}
.tabla {
  width: 80%;
}
.form__presupuesto {
  display: flex;
  justify-content: right;
  align-content: right;
  text-align: right;
}
.aux-izquierdo {
  width: 70%;
}
.presupuesto {
  margin-top: 20px;
  width: 30%;
  text-align: right;
}
.boton-contenedor {
  display: flex;
}
.boton-contenedor-izq {
  width: 80%;
}
.boton-contenedor-der {
  width: 25%;
}
.form__descripcion-contenido {
  margin-top: 25px;
}
.cantidad-input {
  width: 80%;
}
.defecto {
  font-size: 10px;
}
.contenedor-select {
  width: 100%;
}
</style>
