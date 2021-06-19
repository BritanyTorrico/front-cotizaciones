<template>
  <section class="crear_empresa">
    <h2 class="empresa_title">Editar empresa</h2>

    <div class="form_desc">
      Puede cambiar los datos correspondientes a la empresa
    </div>

    <form @submit.prevent="submitForm" autocomplete="off">
      <div class="form_crear">
        <div class="form_section">
          <div class="form_name">Nombre de la empresa:</div>
          <input
            name="nombreEmpresa"
            id="nombreEmpresa"
            :class="
              $v.dato.nombre_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            maxlength="50"
            required
            placeholder="Ingrese nombre aquí"
            v-model="dato.nombre_empresa"
          />

          <div class="form_check-error" v-if="!$v.dato.nombre_empresa.required">
            Campo obligatorio.
          </div>
          <div class="form_check-error" v-if="!$v.dato.nombre_empresa.alpha3">
            No se aceptan caracteres especiales.
          </div>
        </div>
        <div class="form_section">
          <div class="form_name">Nit de la empresa:</div>
          <input
            name="nitEmpresa"
            id="nitEmpresa"
            :class="
              $v.dato.nit_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            required
            placeholder="Ingrese nit aquí"
            v-model="dato.nit_empresa"
          />

          <div class="form_check-error" v-if="!$v.dato.nit_empresa.required">
            Campo obligatorio.
          </div>
          <div class="form_check-error" v-if="!$v.dato.nit_empresa.integer">
            Solo se aceptan valores numericos.
          </div>
        </div>

        <div class="form_section">
          <div class="form_name">Representante legal:</div>
          <input
            name="representanteEmpresa"
            id="representanteEmpresa"
            :class="
              $v.dato.representante_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            maxlength="50"
            required
            placeholder="Ingrese nombre aquí"
            v-model="dato.representante_empresa"
          />

          <div
            class="form_check-error"
            v-if="!$v.dato.representante_empresa.required"
          >
            Campo obligatorio.
          </div>
          <div
            class="form_check-error"
            v-if="!$v.dato.representante_empresa.alpha1"
          >
            No se aceptan caracteres especiales.
          </div>
        </div>

        <div class="form_section">
          <div class="form_name">Telefono de la empresa:</div>
          <input
            name="telfEmpresa"
            id="telfEmpresa"
            :class="
              $v.dato.telf_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            required
            placeholder="Ingrese telefono aquí"
            v-model="dato.telf_empresa"
          />

          <div class="form_check-error" v-if="!$v.dato.telf_empresa.required">
            Campo obligatorio.
          </div>
          <div class="form_check-error" v-if="!$v.dato.telf_empresa.maxLength">
            Máximo 8 digitos.
          </div>
          <div class="form_check-error" v-if="!$v.dato.telf_empresa.integer">
            Solo se aceptan valores numericos.
          </div>
        </div>
        <div class="form_section">
          <div class="form_name">Dirección de la empresa:</div>
          <input
            name="direccionEmpresa"
            id="direccionEmpresa"
            :class="
              $v.dato.direccion_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            maxlength="1000"
            required
            placeholder="Ingrese dirección aquí"
            v-model="dato.direccion_empresa"
          />

          <div
            class="form_check-error"
            v-if="!$v.dato.direccion_empresa.required"
          >
            Campo obligatorio.
          </div>
        </div>

        <div class="form_section">
          <div class="form_name">Correo de la empresa:</div>
          <input
            name="correoEmpresa"
            id="correoEmpresa"
            :class="
              $v.dato.correo_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="email"
            maxlength="50"
            required
            placeholder="Ingrese correo aquí"
            v-model="dato.correo_empresa"
          />

          <div class="form_check-error" v-if="!$v.dato.correo_empresa.required">
            Campo obligatorio.
          </div>
          <div class="form_check-error" v-if="!$v.dato.correo_empresa.alpha2">
            No se aceptan esos caracteres.
          </div>
        </div>

        <div class="form_section">
          <div class="form_name">Cuenta bancaria:</div>
          <input
            name="cuentaBancaria"
            id="cuentaBancaria"
            :class="
              $v.dato.cuenta_bancaria.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            type="text"
            required
            placeholder="Ingrese cuenta bancaria aquí"
            v-model="dato.cuenta_bancaria"
          />

          <div
            class="form_check-error"
            v-if="!$v.dato.cuenta_bancaria.required"
          >
            Campo obligatorio.
          </div>
          <div class="form_check-error" v-if="!$v.dato.cuenta_bancaria.integer">
            Solo se aceptan valores numericos.
          </div>
        </div>
        <div class="form_section">
          <div class="form_name">Tipo de Item:</div>
          <div class="form-radios">
            <div class="item-set">
                  <input type="radio" class="item-type" value="Products" v-model="items" @change="obtenerRubros">
                  <div class="item-label">Productos</div>
              </div>
              <div class="item-set">
                  <input type="radio" class="item-type" value="Services" v-model="items" @change="obtenerRubros">
                  <div class="item-label">Servicios</div>
              </div>
          </div>
          <div class="form_check-error" v-if="!$v.items.required">
            Campo obligatorio.
          </div>
        </div>
        <div class="form_section">
          <div class="form_name">Rubro:</div>
          <input
            name="rubroEmpresa"
            id="rubroEmpresa"
            :class="
              $v.dato.rubro_empresa.$invalid
                ? 'form_check-input-error'
                : 'form__input'
            "
            list="rubros"
            maxlength="50"
            required
            placeholder="Seleccione o ingrese una rubro"
            v-model="dato.rubro_empresa"
          />
          <div class="form_check-error" v-if="!$v.dato.rubro_empresa.required">
            Campo obligatorio.
          </div>
          <div class="form_check-error" v-if="!$v.dato.rubro_empresa.alpha3">
            No se aceptan caracteres especiales.
          </div>
          <datalist id="rubros" :key="componentKey">
            <option
              v-for="(rubro, index) in listRubros"
              :key="index"
              :value="rubro"
              >{{ rubro }}</option
            >
          </datalist>
        </div>
      </div>
      <div class="botoncito">
        <button
          :disabled="$v.dato.$invalid"
          :class="$v.dato.$invalid ? 'button-disabled' : ''"
          class="form_button"
        >
          Editar
        </button>
      </div>
    </form>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import {
  required,
  maxLength,
  helpers,
  integer,
} from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";
const alpha1 = helpers.regex("alpha1", /^[a-zA-ZÑñ+áéíóúÁÉÍÓÚ\s]*$/);
const alpha2 = helpers.regex("alpha2", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ.-_@\s]*$/);
const alpha3 = helpers.regex("alpha3", /^[a-zA-Z0-9ñ+áéíóúÁÉÍÓÚ\s]*$/);
export default {
  name: "EditarEmpresa",
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert },
  data() {
    return {
      disable: false,
      dato: {
        nombre_empresa: null,
        nit_empresa: null,
        representante_empresa: null,
        telf_empresa: null,
        direccion_empresa: null,
        correo_empresa: null,
        rubro_empresa: null,
        cuenta_bancaria: null,
      },
      listRubros: [],
      rubro_empresa_original: null,
      componentKey: 0,
      items: null,
    };
  },
  validations: {
    items: {
      required
    },
    dato: {
      nombre_empresa: {
        required,
        maxLength: maxLength(50),
        alpha3,
      },
      nit_empresa: {
        required,
        integer,
      },
      representante_empresa: {
        required,
        maxLength: maxLength(50),
        alpha1,
      },
      telf_empresa: {
        required,
        maxLength: maxLength(8),
        integer,
      },
      direccion_empresa: {
        required,
        maxLength: maxLength(1000),
      },
      correo_empresa: {
        required,
        maxLength: maxLength(50),
        alpha2,
      },
      rubro_empresa: {
        required,
        maxLength: maxLength(50),
        alpha3,
      },
      cuenta_bancaria: {
        required,
        integer,
      },
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    async obtenerRubros() {
      this.listRubros=[]
      if(this.items=="Products"){
        const listaRubros = (
        await this.$http.get("generalCategory", {
          headers: {
            authorization: this.token,
          },
        })
      ).data;
      for (let i of listaRubros) {
        if (i.nombre_categoriageneral!="Servicios"){
          this.listRubros.push(i.nombre_categoriageneral);
        }
      }
      }
      if(this.items=="Services"){
        const listaRubros = (
        await this.$http.get("specificCategory", {
          headers: {
            authorization: this.token,
          },
        })
      ).data;
      for (let j of listaRubros) {
        if(j.cod_categoriageneral==4){
          this.listRubros.push(j.nombre_categoriaespecifica);
        }
      }
      }
      
    },
    async submitForm() {
      try {
        if (!this.$v.dato.$invalid) {
          await this.manageMark();
          await this.sendData();
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async sendData() {
      try {
        await this.sendEmpData();
        // si sale bien recien puede registrar compania por rubro
        if (this.dato.rubro_empresa!=this.rubro_empresa_original){
            await this.sendCompMark();
        }
        this.$router.push(`/empresas`)
      } catch (error) {
        this.alert("warning", "Algo salio mal");
      }
    },
    async sendEmpData() {
      try {
        await this.$http.put(
          `company/${this.$route.params.id}`,
          {
            nombre_empresa: this.dato.nombre_empresa,
            nit_empresa: this.dato.nit_empresa,
            representante_empresa: this.dato.representante_empresa,
            telf_empresa: this.dato.telf_empresa,
            direccion_empresa: this.dato.direccion_empresa,
            correo_empresa: this.dato.correo_empresa,
            cuenta_bancaria: this.dato.cuenta_bancaria,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
        this.alert("success", "Empresa registrada exitosamente");
      } catch (error) {
        // throw new Error("Esta empresa ya fue registrada");
        this.alert("warning", "El nombre de esta empresa ya fue registrada");
      }
    },
    async sendCompMark() {
      try {
          const markets = (
          await this.$http.get("market", {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        let oldMarket=null
        let newMarket=null
        for (let i of markets) {
          if (i.nombre_rubro == this.rubro_empresa_original){
              oldMarket = i.cod_rubro
          }
          if (i.nombre_rubro == this.dato.rubro_empresa){
              newMarket = i.cod_rubro
          }
        }
        if (oldMarket!=null && newMarket!=null){
        await this.$http.put(
          `companiesPerMarket/${this.$route.params.id}`,
          {
            cod_rubroOriginal: oldMarket,
            cod_rubroNuevo: newMarket,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
        }
      } catch (error) {
        throw new Error("El rubro es inválido");
      }
    },
    async manageMark() {
      try {
        const markets = (
          await this.$http.get("market", {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        let existingMark = [];
        for (let i of markets) {
          existingMark.push(i.nombre_rubro);
        }
        if (!existingMark.includes(this.dato.rubro_empresa)) {
          await this.$http.post(
            "market",
            {
              nombre_rubro: this.dato.rubro_empresa,
            },
            {
              headers: {
                authorization: this.token,
              },
            }
          );
          if (this.items=="Products"){
            await this.$http.post(
            "generalCategory",
            {
              nombre_categoriageneral: this.dato.rubro_empresa,
            },
            {
              headers: {
                authorization: this.token,
              },
            }
          );
          }
          if (this.items=="Services"){
            await this.$http.post(
            "specificCategory",
            {
              cod_categoriageneral: 4,
              nombre_categoriaespecifica: this.dato.rubro_empresa,
            },
            {
              headers: {
                authorization: this.token,
              },
            }
          );
          }
        }
      } catch (error) {
        throw new Error("Rubro Inválido");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted: async function(){
    const response = (await this.$http.get(`company/${this.$route.params.id}`,{
                headers:{
                  authorization:this.token,
                },
              })).data.datos[0]        
    this.dato.nombre_empresa=response.nombre_empresa
    this.dato.nit_empresa=response.nit_empresa
    this.dato.representante_empresa=response.representante_empresa
    this.dato.telf_empresa=response.telf_empresa
    this.dato.direccion_empresa=response.direccion_empresa
    this.dato.correo_empresa=response.correo_empresa
    this.dato.cuenta_bancaria=response.cuenta_bancaria
    const rubro = (await this.$http.get(`companiesPerMarket?empresa=${response.nombre_empresa}`,{
                headers:{
                  authorization:this.token,
                },
              })).data.datos[0]  
    const cat = (await this.$http.get(`specificCategory`,{
                headers:{
                  authorization:this.token,
                },
              })).data
    for (let i of cat){
        if ((i.nombre_categoriaespecifica==rubro.nombre_rubro) && (i.cod_categoriageneral==4)){
            this.items="Services"
        }
    }
    if (this.items==null){
        this.items="Products"
    }
    this.dato.rubro_empresa=rubro.nombre_rubro
    this.rubro_empresa_original=rubro.nombre_rubro

    var validCodesName = [
      32,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      90,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
      106,
      107,
      108,
      109,
      110,
      111,
      112,
      113,
      114,
      115,
      116,
      117,
      118,
      119,
      120,
      121,
      122,
      193,
      201,
      205,
      209,
      211,
      218,
      225,
      233,
      237,
      241,
      243,
      250,
    ];
    var validCodesRep = [
      32,
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      90,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
      106,
      107,
      108,
      109,
      110,
      111,
      112,
      113,
      114,
      115,
      116,
      117,
      118,
      119,
      120,
      121,
      122,
      193,
      201,
      205,
      209,
      211,
      218,
      225,
      233,
      237,
      241,
      243,
      250,
    ];
    var validCodesNum = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    var validCodesMail = [
      32,
      45,
      46,
      64,
      95,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      90,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
      106,
      107,
      108,
      109,
      110,
      111,
      112,
      113,
      114,
      115,
      116,
      117,
      118,
      119,
      120,
      121,
      122,
    ];
    var myTextBox1 = document.getElementById("nombreEmpresa");
    var myTextBox2 = document.getElementById("nitEmpresa");
    var myTextBox3 = document.getElementById("representanteEmpresa");
    var myTextBox4 = document.getElementById("telfEmpresa");
    var myTextBox5 = document.getElementById("correoEmpresa");
    var myTextBox6 = document.getElementById("cuentaBancaria");
    var myTextBox7 = document.getElementById("rubroEmpresa");
    myTextBox1.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesName.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
    myTextBox2.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesNum.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
    myTextBox3.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesRep.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
    myTextBox4.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesNum.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
    myTextBox5.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesMail.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
    myTextBox6.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesNum.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
    myTextBox7.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesRep.includes(charCode);
          if (!isValid) {
            evt.preventDefault();
          }
        }
      },
      false
    );
  },
};
</script>

<style scoped>
.crear_empresa {
  background-color: #f1f6f6;
  padding: 20px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.empresa_title {
  width: 100%;
  text-align: left;
  color: #5c9aeb;
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
.form_crear {
  padding: 8px;
  text-align: left;
  margin-left: 60px;
  width: 100%;
}
.form_section {
  padding: 25px 0px 25px 0px;
  width: 100%;
  justify-content: center;
  align-content: center;
}
.form_name {
  color: #3f4b5b;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form__input {
  width: 80%;
  padding: 3px;
  margin: 3px 3px;
  border: none;
  border-bottom: 1px solid #999999;
  background-color: transparent;
  color: #3a3a3a;
  font-size: 14px;
  border-radius: 3px;
}

.form__input:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #747d8c;
}
.form_check-error {
  color: #ed1c24;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.crear_empresa textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}
.crear_empresa input,
.crear_empresa textarea {
  background-color: #f7f6f6;
  border-style: none none solid none;
  border: 0px 0px 5px 0px;
  border-color: #3a3a3a;
  border-radius: 3px;
  padding: 8px;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.crear_empresa input ::placeholder,
.crear_empresa textarea ::placeholder {
  color: #999999;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.button-disabled {
  background: #999999;
  border: 0px;
}
.form_button {
  display: block;
  background-color: #0c59cf;
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
  width: 80%;
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
.listaDesplegable {
  width: 30%;

  margin-bottom: 30px;
}
.button-disabled {
  background: #999999;
  border: 0px;
}
.botoncito {
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
.item-set{
    display: flex;
    align-items: baseline;
    padding-left: 2.5%;
    padding-top: 7%;
}
.item-label{
    color: #030303;
    padding: 2% 0 0 7px;
    font-size: 14px;
}
.form-radios{
  display: flex;
  justify-content: space-between;
  width: 30%
}
</style>
