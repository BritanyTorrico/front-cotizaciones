<template>
  <section class ="reg_item">
      <h2 class="item_title">Registrar Item de Gasto</h2>
      <label>
          <div class="form_desc">Ingrese los datos de un nuevo item de gasto</div>
      </label>
      <form class="form_itemreg" @submit.prevent="submitForm" autocomplete="off">
          <div class="form_section">
              <label>
                  <div class="form_name">Item:</div>
                  <input
                    name="nombreItem"
                    :class="
                      $v.item.nombre_itemgasto.$invalid
                      ? 'form_check-input-error'
                      : 'form_check-input'
                    "
                    type="text"
                    maxlength="50"
                    v-on:keydown="keyhandler($event)"
                    required
                    placeholder="Ingrese el nombre aquí"
                    v-model="item.nombre_itemgasto"
                  />
              </label>
              <div
                class="form_check-error"
                v-if="!$v.item.nombre_itemgasto.required"
              >
                  Campo obligatorio.
              </div>
          </div>
          <div class="form_section">
              <label>
                  <div class="form_name">Categoría:</div>
                  <input
                    name="categoriaItem"
                    :class="
                      $v.item.categoria_especifica.$invalid
                      ? 'form_check-input-error'
                      : 'form_check-input'
                    "
                    list="categorias"
                    maxlength="50"
                    v-on:keydown="keyhandler($event)"
                    required
                    placeholder="Seleccione un categoría"
                    v-model="item.categoria_especifica"
                  />
              </label>
              <div
                class="form_check-error"
                v-if="!$v.item.categoria_especifica.required"
              >
                  Campo obligatorio.
              </div>
              <datalist id="categorias">
                  <option value="Dispositivos"></option>
                  <option value="Monitores"></option>
                  <option value="Teclados"></option>
              </datalist>
          </div>
          <div class="form_section">
              <label>
                  <div class="form_name">Descripción:</div>
                  <textarea
                    name="descripcionItem"
                    :class="
                      $v.item.descripcion_item.$invalid
                      ? 'form_check-input-error'
                      : 'form_check-input'
                    "
                    cols="50"
                    rows="10"
                    maxlength="1000"
                    required
                    placeholder="Ingrese una descripción del ítem"
                    v-model="item.descripcion_item"
                  />
              </label>
              <div
                class="form_check-error"
                v-if="!$v.item.descripcion_item.required"
              >
                  Campo obligatorio.
              </div>
          </div>
          <div class="form_section">
              <label>
                  <div class="form_name">Justificación:</div>
                  <textarea
                    name="justificacionItem"
                    :class="
                      $v.item.justificacion.$invalid
                      ? 'form_check-input-error'
                      : 'form_check-input'
                    "
                    cols="50"
                    rows="10"
                    maxlength="1000"
                    required
                    placeholder="Ingrese la justificación del ítem"
                    v-model="item.justificacion"
                  />
              </label>
              <div
                class="form_check-error"
                v-if="!$v.item.justificacion.required"
              >
                  Campo obligatorio.
              </div>
          </div>
          <button
            :disabled="$v.item.$invalid"
            :class="$v.item.$invalid ? 'button-disabled':''"
            class="form_button"
          >
              Crear
          </button>
      </form>
      <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import {
    required,
    maxLength,
} from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";

export default {
    name: "RegistroItem",
    components: { Alert },
    data(){
        return{
            disabled: false,
            item: {
                nombre_itemgasto: null,
                categoria_especifica: null,
                descripcion_item: "",
                justificacion: "",
            },
        };
    },
    validations: {
        item: {
            nombre_itemgasto: {
                required,
                maxLength: maxLength(50),
            },
            categoria_especifica: {
                required,
                maxLength: maxLength(50),
            },
            descripcion_item: {
                required,
                maxLength: maxLength(1000),
            },
            justificacion: {
                required,
                maxLength: maxLength(1000),
            },
        },
    },
    methods: {
        keyhandler(e){
          if (!e.key.match(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]*$/)){
            e.preventDefault();
          }
        },
        async submitForm(){
            try {
                if (!this.$v.item.$invalid){
                    await this.sendItemData();
                    await this.sendItemUnitData();
                    this.alert("success", "Item creado exitosamente");
                } else {
                    this.alert("warning", "Rellene todos los datos correctamente");
                }
            } catch (error) {
                this.alert("warning", error);
            }
        },
        async sendItemData(){
            try {
                await this.$http.post("expenseItem", {
                    nombre_itemgasto: this.item.nombre_itemgasto,
                    nombre_categoriaespecifica: this.item.categoria_especifica,
                    descripcion_item: this.item.descripcion_item,
                    justificacion: this.item.justificacion,
                });
            } catch (error) {
                throw new Error("Este ítem ya está registrado");
            }
        },
        async sendItemUnitData(){
            try {
                await this.$http.post("itemsPerUnit", {
                    nombre_unidadgasto: "laboritorio 1 de Sistemas",
                    nombre_itemgasto: this.item.nombre_itemgasto,
                    presupuesto: 5000,
                    activo_item: true,
                });
            } catch (error) {
                throw new Error("Este ítem ya está registrado");
            }
        },
        alert (alertType, alertMessage){
            this.$refs.alert.showAlert(alertType, alertMessage);
        },
    },
};
</script>

<style>
.reg_item{
    background-color: #F7F6F6;
    padding: 20px 40px 20px 40px;
}

.item_title{
    text-align:left;
    color: #3D8AF7;
    font-size:36px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form_desc{
    text-align: left;
    color: #0D58CF;
    font-size: 18px;
    font-weight: 400;
    padding-bottom: 5px;
    border-bottom: 2px solid #0D58CF;
    width: 600px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form_itemreg{
    padding:8px;
    text-align: left;
}

.reg_item textarea {
    resize: none;
    word-wrap:break-word;
    overflow-y:auto;
}

.reg_item input,
.reg_item textarea {
    background-color: #F7F6F6;
    border-style: none none solid none;
    border: 0px 0px 5px 0px;
    border-color: #3a3a3a;
    border-radius: 3px;
    padding: 8px;
    width: 550px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.reg_item input ::placeholder,
.reg_item textarea ::placeholder{
    color:#999999;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form_name{
    color:#3f4b5b;
    font-size:24px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form_section {
    padding:12px 0px 12px 0px;
}

.form_check-error {
    color: #ed1c24;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form_button {
  margin: auto;
  display: block;
  background-color: #0C59CF;
  padding: 12px 115px 12px 115px;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}

.form_check-input {
  width: 100%;
  padding: 3px;
  margin: 3px 3px;
  border: none;
  border-bottom: 1px solid #999999;
  background-color: transparent;
  color: #3a3a3a;
  font-size: 14px;
}

.form_check-input-error {
  width: 100%;
  padding: 3px;
  margin: 3px 3px;
  border: none;
  border-bottom: 1px solid #ed1c24;
  background-color: transparent;
  color: #3a3a3a;
  font-size: 14px;
}
.form_check-input:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #999999;
}
.form_check-input-error:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #ed1c24;
}

.button-disabled {
    background:#999999;
    border: 0px;
}

</style>