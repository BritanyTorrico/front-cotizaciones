<template>
  <div class="container">
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
            placeholder="Ingrese su nombre"
            v-model="solicitud.nombre_solicitud"
          />
        </label>
      </div>
      <div class="form__detalle">
        <label>
          <div class="formulario_label">Justificacion:</div>
          <textarea
            :class="
              $v.solicitud.detalle_solicitud.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            placeholder="Ingrese su nombre"
            v-model="solicitud.detalle_solicitud"
          />
        </label>
      </div>

      <div class="form__categoria">
        <div class="container__label">Categoria:</div>
        <select
          v-model="solicitud.categoria"
          @change="obtenerItems()"
          class="container__list"
        >
          <option disabled="true">{{ solicitud.categoria }}</option>
          <option
            class="container__list__option"
            v-for="(item, index) in listaCategorias"
            :key="index"
            :value="item"
          >
            {{ item }}</option
          >
        </select>
      </div>
      <boton nombre="Enviar"></boton>
      {{ solicitud }}
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import boton from "@/components/Base/boton.vue";

export default {
  components: { boton },
  name: "SolicitudDatos",
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      solicitud: {
        nombre_solicitud: null,
        detalle_solicitud: null,
        categoria: null,
      },
      listaCategorias: [],
      listaItems: [],
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
    obtenerItems() {
      console.log("obtengo items");
    },
  },
};
</script>

<style lang="scss" scoped></style>
