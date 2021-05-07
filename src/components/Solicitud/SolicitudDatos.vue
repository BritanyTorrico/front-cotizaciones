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
      </div>

      <div class="form__categoria">
        <div class="container__label">Categoria:</div>
        <select v-model="solicitud.categoria" class="container__list">
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
      <div class="form__item">
        <lista-desplegable
          v-model="solicitud.item_gasto"
          nombreLista="Items de gasto:"
          :lista="listaItemsDeGasto"
        ></lista-desplegable>
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
            type="number"
            placeholder="Ingrese la cantidad"
            v-model="solicitud.cantidad"
          />
        </label>
      </div>
      <div>
        <button class="btn btn-success" @click="agragarItem()">Agregar</button>
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
            <tr v-for="(item, index) in listaItems" :key="index">
              <td>
                {{ item.cantidad }}
              </td>
              <td>
                {{ item.item_gasto }}
              </td>
              <td>
                <button class="btn btn-danger" @click="eliminarItems(index)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 v-if="listaItems.length == 0">Seleccione un item</h4>
      <div>
        <input type="submit" value="enviar" class="btn btn-success" />
      </div>

      {{ listaItems }}
      <p>datos</p>
      {{ solicitud }}
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import ListaDesplegable from "@/components/User/ListaDesplegable.vue";
export default {
  components: { ListaDesplegable },
  name: "SolicitudDatos",
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      solicitud: {
        nombre_solicitud: null,
        detalle_solicitud: null,
        categoria: "Seleccione una opcion",
        item_gasto: null,
        cantidad: null,
      },
      listaCategorias: [],
      listaItemsDeGasto: ["Computadoras", "Impresoras", "Mouse"],

      listaItems: [], //aqui esta la lista de items que mandare
      item: "",
    };
  },
  validations: {
    solicitud: {
      nombre_solicitud: {
        required,
      },
      detalle_solicitud: {
        required,
      },
      cantidad: {
        required,
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        if (!this.$v.solicitud.$invalid) {
          console.log("envio");
        } else {
          console.log("datos ivalidos");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      const categ = (await this.$http.get("specificCategory")).data;
      for (let i = 0; i < categ.length; i++) {
        this.listaCategorias.push(categ[i].nombre_categoriaespecifica);
      }
    },

    eliminarItems: function(index) {
      this.listaItems.splice(index, 1);
    },
    agragarItem: function() {
      if (this.solicitud.item_gasto != null) {
        const item = {
          item_gasto: this.solicitud.item_gasto,
          cantidad: this.solicitud.cantidad,
        };
        this.listaItems.push(item);
        this.solicitud.item_gasto = null;
        this.solicitud.cantidad = null;
      } else {
        console.log("seleccione una tarea");
      }
      //
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
