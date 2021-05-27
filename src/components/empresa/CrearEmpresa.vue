<template>
  <section class="crear_empresa">
    <h2 class="empresa_title">Registro de la empresa</h2>

    <div class="form_desc">
      Ingrese los datos correspondientes a la nueva empresa
    </div>

    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <div class="form_name">Nombre de la empresa:</div>
        <input
          name="nombreEmpresa"
          :class="
            $v.dato.nombre_empresa.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="text"
          maxlength="50"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese nombre aquí"
          v-model="dato.nombre_empresa"
        />

        <div class="form_check-error" v-if="!$v.dato.nombre_empresa.required">
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
        <div class="form_name">Nit de la empresa:</div>
        <input
          name="nitEmpresa"
          :class="
            $v.dato.nit_empresa.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="number"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese nit aquí"
          v-model="dato.nit_empresa"
        />

        <div class="form_check-error" v-if="!$v.dato.nit_empresa.required">
          Campo obligatorio.
        </div>
      </div>

      <div class="form_section">
        <div class="form_name">Representante legal:</div>
        <input
          name="representanteEmpresa"
          :class="
            $v.dato.representante_empresa.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="text"
          maxlength="50"
          v-on:keydown="keyhandler($event)"
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
      </div>

      <div class="form_section">
        <div class="form_name">Telefono de la empresa:</div>
        <input
          name="telfEmpresa"
          :class="
            $v.dato.telf_empresa.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="number"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese telefono aquí"
          v-model="dato.telf_empresa"
        />

        <div class="form_check-error" v-if="!$v.dato.telf_empresa.required">
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
        <div class="form_name">Dirección de la empresa:</div>
        <input
          name="direccionEmpresa"
          :class="
            $v.dato.direccion_empresa.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="text"
          maxlength="1000"
          v-on:keydown="keyhandler($event)"
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
      </div>

      <div class="form_section">
        <div class="form_name">Cuenta bancaria:</div>
        <input
          name="cuentaBancaria"
          :class="
            $v.dato.cuenta_bancaria.$invalid
              ? 'form_check-input-error'
              : 'form__input'
          "
          type="number"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese cuenta bancaria aquí"
          v-model="dato.cuenta_bancaria"
        />

        <div class="form_check-error" v-if="!$v.dato.cuenta_bancaria.required">
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
                        <div
                        class="form_check-error"
                        v-if="!$v.dato.rubro_empresa.required"
                        >
                        Campo obligatorio.
                        </div>
                        <datalist id="rubros">
                        <option
                            v-for="(rubro, index) in listRubros"
                            :key="index"
                            :value="rubro"
                            >{{ rubro }}</option
                        >
                        </datalist>

      </div>
      <button
        :disabled="$v.dato.$invalid"
        :class="$v.dato.$invalid ? 'button-disabled' : ''"
        class="form_button"
      >
        Registrar
      </button>
    </form>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";
import { mapState } from "vuex";

export default {
  name: "CrearEmpresa",
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
      componentKey: 0,
    };
  },
  mounted() {
    this.obtenerRubros();
  },
  validations: {
    dato: {
      nombre_empresa: {
        required,
        maxLength: maxLength(50),
      },
      nit_empresa: {
        required,
      },
      representante_empresa: {
        required,
        maxLength: maxLength(50),
      },
      telf_empresa: {
        required,
      },
      direccion_empresa: {
        required,
        maxLength: maxLength(1000),
      },
      correo_empresa: {
        required,
        maxLength: maxLength(50),
      },
      rubro_empresa: {
        required,
        maxLength: maxLength(50),
      },
      cuenta_bancaria: {
        required,
      },
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    async obtenerRubros() {
      const listaRubros = (
        await this.$http.get("market", {
          headers: {
            authorization: this.token,
          },
        })
      ).data.datos;
      for (let i of listaRubros){
        this.listRubros.push(i.nombre_rubro)
      }
    },
    async submitForm() {
      try {
        if (!this.$v.dato.$invalid) {
          await this.manageMark();
          await this.sendData();
          this.alert("success", "Empresa registrada exitosamente");

          this.dato.nombre_empresa = null;
          this.dato.nit_empresa = null;
          this.dato.representante_empresa = null;
          this.dato.telf_empresa = null;
          this.dato.direccion_empresa = null;
          this.dato.correo_empresa = null;
          this.dato.rubro_empresa = null;
          this.dato.cuenta_bancaria = null;
          this.forceRerender();
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async sendData() {
      try {
        await this.$http.post(
          "company",
          {
            nombre_empresa: this.dato.nombre_empresa,
            nit_empresa: this.dato.nit_empresa,
            representante_empresa: this.dato.representante_empresa,
            telf_empresa: this.dato.telf_empresa,
            direccion_empresa: this.dato.direccion_empresa,
            correo_empresa: this.dato.correo_empresa,
            // rubro_empresa: this.dato.rubro_empresa,
            cuenta_bancaria: this.dato.cuenta_bancaria,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
        await this.$http.post(
          "companiesPerMarket",
          {
            nombre_rubro: this.dato.rubro_empresa,
            nombre_empresa: this.dato.nombre_empresa,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        throw new Error("Esta empresa ya fue registrada");
      }
    },
    async manageMark(){
      try {
        const markets= (
        await this.$http.get("market", {
            headers: {
              authorization: this.token,
            },
          })
        ).data.datos;
        let existingMark=[]
        for (let i of markets){
          existingMark.push(i.nombre_rubro)
        }
        if (!existingMark.includes(this.dato.rubro_empresa)){
          await this.$http.post('market',{
            nombre_rubro: this.dato.rubro_empresa
          },
              {
                headers:{
                  authorization:this.token,
                },
              });
          await this.$http.post('generalCategory',{
            nombre_categoriageneral: this.dato.rubro_empresa
          },
              {
                headers:{
                  authorization:this.token,
                },
              });
        }
      } catch (error) {
        throw new Error("Rubro Inválido") 
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
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
  margin: auto;
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
</style>
