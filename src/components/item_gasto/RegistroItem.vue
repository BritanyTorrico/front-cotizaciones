<template>
  <section class="reg_item">
    <h2 class="item_title">Registrar Item de Gasto</h2>
    <label>
      <div class="form_desc">Ingrese los datos de un nuevo item de gasto</div>
    </label>
    <form class="form_itemreg" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <div class="form_name">Item:</div>
        <input
          id="nombreItem"
          :class="
            $v.item.nombre_itemgasto.$invalid
              ? 'form_check-input-error'
              : 'form_check-input'
          "
          type="text"
          maxlength="50"
          required
          placeholder="Ingrese el nombre aquí"
          v-model="item.nombre_itemgasto"
        />
        <div class="form_check-error" v-if="!$v.item.nombre_itemgasto.required">
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
            <div class="form_name">Categoría:</div>
                <div class="form-categ">
                    <div class="form-categ-gen" v-on:click="getSpeCategories">
                        <lista-desplegable
                            nombreLista="categoriaGeneral"
                            :lista="listaCatGen"
                            :placeholder="'Seleccione una categoría general'"
                            :class="
                                $v.item.categoria_general.$invalid
                                ? 'form_check-input-error'
                                : 'form_check-input'
                            "
                            required
                            v-model="item.categoria_general"
                        ></lista-desplegable>
                        <div class="form_check-error" v-if="!$v.item.categoria_general.required">
                            Campo obligatorio.
                        </div>
                    </div>
                    <div class="form-categ-esp">
                        <input
                        name="categoriaItem"
                        id="categoriaItem"
                        :class="
                            $v.item.categoria_especifica.$invalid
                            ? 'form_check-input-error'
                            : 'form_check-input'
                        "
                        list="categorias"
                        maxlength="50"
                        required
                        placeholder="Seleccione o ingrese una categoría específica"
                        v-model="item.categoria_especifica"
                        
                        />
                        <div
                        class="form_check-error"
                        v-if="!$v.item.categoria_especifica.required"
                        >
                        Campo obligatorio.
                        </div>
                        <datalist id="categorias">
                        <option
                            v-for="(categoria, index) in listaCategorias"
                            :key="index"
                            :value="categoria"
                            >{{ categoria }}</option
                        >
                        </datalist>
                    </div>
                </div>
      </div>
      <div class="form_section">
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
        <div class="form_check-error" v-if="!$v.item.descripcion_item.required">
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
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
        <div class="form_check-error" v-if="!$v.item.justificacion.required">
          Campo obligatorio.
        </div>
      </div>
        <div class= "item-form-button">
            <button
                :disabled="$v.item.$invalid"
                :class="$v.item.$invalid ? 'button-disabled' : ''"
                class="form_button"
            >
                Crear
            </button>
        </div>
    </form>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
import ListaDesplegable from '../unidad_gasto/ListaDesplegable.vue';
export default {
  name: "RegistroItem",
  computed: {
    ...mapState(["token"]),
  },
    components: { Alert, ListaDesplegable },
    data(){
        return{
            disabled: false,
            item: {
                nombre_itemgasto: null,
                categoria_general: null,
                categoria_especifica: null,
                descripcion_item: "",
                justificacion: "",
            },
            listaCategorias: [],
            listaUnidades: [],
            listaCatGen: [],
            listaCodGen: [],
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
            categoria_general: {
                required,
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
    async getGenCategories() {
      const gen =(
        await this.$http.get('generalCategory', {
          headers: {
            authorization: this.token,
          },
        })
      ).data;
      for (let i of gen){
        this.listaCatGen.push(i.nombre_categoriageneral)
        this.listaCodGen.push(i.cod_categoriageneral)
      }
      this.getSpeCategories()
    },
    async getSpeCategories(){
      this.listaCategorias=[]
      const categ = (
        await this.$http.get("specificCategory", {
          headers: {
            authorization: this.token,
          },
        })).data;
        for (let j of categ){
            if (j.cod_categoriageneral==this.listaCodGen[this.listaCatGen.indexOf(this.item.categoria_general)]){
              this.listaCategorias.push(j.nombre_categoriaespecifica)
            }
        }
    },
        
        async submitForm(){
            try {
                if (!this.$v.item.$invalid){
                  await this.manageCat();
                    await this.sendItemData();
                    await this.sendItemUnitData();
                    this.alert("success", "Item creado exitosamente");
                    this.$router.push(`/items`)
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
                },
                {
                    headers: {
                        authorization: this.token,
                    },
                });
            } catch (error) {
                throw new Error("Este ítem ya está registrado");
            }
        },
        async getSpendingUnits(){
            const spun = (await this.$http.get(`spendingUnit?type=name&departamento=${localStorage.getItem('depto')}`, {
          headers: {
            authorization: this.token,
          },
        })).data.datos;
        for (let i of spun){
          this.listaUnidades.push(i.nombre_unidadgasto)
        }
        },
        async sendItemUnitData(){
            try {
              for(let i of this.listaUnidades){
                await this.$http.post('itemsPerUnit',{
                  nombre_unidadgasto: i,
                  nombre_itemgasto: this.item.nombre_itemgasto,
                  activo_item: true,
                },
                {
                  headers:{
                    authorization: this.token,
                  },
                });
              }
            } catch (error) {
                throw new Error("Unidad inválida");
            }
        },
        async manageCat(){
          try {
            const categ = (
              await this.$http.get("specificCategory", {
                headers: {
                  authorization: this.token,
                },
              })).data;
            let existingcat=[]
            for(let i of categ){
              existingcat.push(i.nombre_categoriaespecifica)
            }
            if(!existingcat.includes(this.item.categoria_especifica)){
              await this.$http.post('specificCategory',{
                cod_categoriageneral: this.listaCodGen[this.listaCatGen.indexOf(this.item.categoria_general)],
                nombre_categoriaespecifica: this.item.categoria_especifica,
              },
              {
                headers:{
                  authorization:this.token,
                },
              });
              if (this.item.categoria_general=="Servicios"){
                await this.$http.post('market',{
                nombre_rubro: this.item.categoria_especifica,
              },
              {
                headers:{
                  authorization:this.token,
                },
              });
              }
            }
          } catch (error) {
            throw new Error("Categoría Inválida") 
          }
        },
        alert (alertType, alertMessage){
            this.$refs.alert.showAlert(alertType, alertMessage);
        },
    },
    mounted(){
        this.getGenCategories();
        this.getSpendingUnits();
        var validCodesItem= [32, 
                            48,49,50,51,52,53,54,55,56,57,
                            65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
                            97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,
                            193,201,205,209,211,218,225,233,237,241,243,250
                            ];
        var myTextbox1=document.getElementById("nombreItem");
        myTextbox1.addEventListener('keypress', evt => {
            var charCode = evt.charCode;
            if (charCode!=0){
                var isValid = validCodesItem.includes(charCode);
                if (!isValid){
                    evt.preventDefault();
                }
            }
        }, false);
        var validCodesCat= [32, 
                         65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
                         97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,
                         193,201,205,209,211,218,225,233,237,241,243,250
                        ];
        var myTextbox2=document.getElementById("categoriaItem");
        myTextbox2.addEventListener('keypress', evt => {
            var charCode = evt.charCode;
            if (charCode!=0){
                var isValid = validCodesCat.includes(charCode);
                if (!isValid){
                    evt.preventDefault();
                }
            }
        }, false);
    }
};
</script>

<style scoped>
.reg_item {
  background-color: #f7f6f6;
  padding: 20px 40px 20px 40px;
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

.form_itemreg {
  padding: 8px;
  text-align: left;
  width: 100%;
}

.reg_item textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}

.reg_item input,
.reg_item textarea {
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.reg_item input ::placeholder,
.reg_item textarea ::placeholder {
  color: #999999;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_name {
  color: #3f4b5b;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_section {
  padding: 12px 0px 12px 0px;
}

.form_check-error {
  color: #ed1c24;
  font-size: 14px;
  padding: 0 0 0 2%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_button {
  margin: auto;
  display: block;
  background-color: #0c59cf;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  width: 40%;
  padding: 1.3% 0;
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
  border-radius: 3px;
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
  border-radius: 3px;
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
  background: #999999;
  border: 0px;
}
.form-categ{
    display: flex;
    justify-content: space-around;
}
.form-categ-gen{
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 0 2% 0 0;
}
.form-categ-esp{
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 0 0 0 0;
}
</style>
