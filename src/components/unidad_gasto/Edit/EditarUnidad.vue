<template>
  <div class="edit_unit">
    <div v-if="loading">
      <div class="loading-info">
          <div class="clock-loader"></div>
      </div>
    </div>
    <div v-else>
    <h2 class="unit_title">Editar Unidad de Gasto</h2>
    <label class="form_desc">
      <div >Puede cambiar los datos de la unidad de gasto</div>
    </label>
    <form class="form_unitreg" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <div class="form_name">Unidad:</div>
        <div class="form_input">
          <input
            name="nombreUnidad"
            id="nombreUnidad"
            :class="
              $v.unit.nombre_unidadgasto.$invalid
                ? 'form_check-input-error'
                : 'form_check-input'
            "
            type="text"
            maxlength="30"
            required
            placeholder="Ingrese el nombre aquí"
            v-model="unit.nombre_unidadgasto"
          />
        </div>
        <div
          class="form_check-error"
          v-if="!$v.unit.nombre_unidadgasto.required"
        >
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
        <div class="form_name">Encargado:</div>
            <lista-desplegable
              nombreLista="encargadoUnidad"
              :lista="listaUsuarios"
              :placeholder="unit.encargado_unidad"
              :class="
                $v.unit.encargado_unidad.$invalid
                  ? 'form_check-input-error'
                  : 'form_check-input'
              "
              required
              v-model="unit.encargado_unidad"
            ></lista-desplegable>
        <div class="form_check-error" v-if="!$v.unit.encargado_unidad.required">
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
        <div class="form_name">Descripción:</div>
        <textarea
          name="descripcionUnidad"
          :class="
            $v.unit.descripcion_unidadgasto.$invalid
              ? 'form_check-input-error'
              : 'form_check-input'
          "
          cols="50"
          rows="10"
          maxlength="1000"
          required
          placeholder="Ingrese una descripción de la unidad"
          v-model="unit.descripcion_unidadgasto"
        />
        <div
          class="form_check-error"
          v-if="!$v.unit.descripcion_unidadgasto.required"
        >
          Campo obligatorio.
        </div>
      </div>
      <div class="unit_form_button">
        <button
          :disabled="$v.unit.$invalid"
          :class="$v.unit.$invalid ? 'button-disabled' : ''"
          class="form_button"
        >
          <div class="button_tag">Editar</div>
        </button>
      </div>
    </form>
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";
import ListaDesplegable from "../ListaDesplegable.vue";
import { mapState } from "vuex";

export default {
  name: "EditarUnidad",
  computed: {
    ...mapState(["token"]),
  },
  components: { Alert, ListaDesplegable },
  data() {
    return {
      loading: false,
      disabled: false,
      unit: {
        nombre_unidadgasto: null,
        encargado_unidad: null,
        descripcion_unidadgasto: "",
      },
      listaUsuarios: [],
    };
  },
  validations: {
    unit: {
      nombre_unidadgasto: {
        required,
        maxLength: maxLength(50),
      },
      encargado_unidad: {
        required,
        maxLength: maxLength(50),
      },
      descripcion_unidadgasto: {
        required,
        maxLength: maxLength(1000),
      },
    },
  },
  methods: {
    async getUsers() {
      this.loading=!this.loading
      const deptUsers = (
        await this.$http.get(
          `users?criterio=departamento&nombre=${localStorage.getItem('depto')}`, {
          headers: {
            authorization: this.token,
          },
        })).data;
        for(let i of deptUsers){
          this.listaUsuarios.push(i.nombres + ' ' + i.apellidos)
        }
      const usersInCharge = (
        await this.$http.get(
          `spendingUnit?type=name&departamento=${localStorage.getItem('depto')}`, {
          headers: {
            authorization: this.token,
          },
        })).data.datos;
        for(let j of usersInCharge){
          if (this.listaUsuarios.includes(j.jefe_unidad)){
            const index=this.listaUsuarios.indexOf(j.jefe_unidad)
            if(index > -1){
              this.listaUsuarios.splice(index, 1)
            }
          }
        }
        this.loading=!this.loading
    },
    async submitForm() {
      this.loading=!this.loading
      try {
        if (!this.$v.unit.$invalid) {
          await this.sendData();
          this.alert("success", "Unidad editada exitosamente");
          this.$router.push(`/unidades`)
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
      this.loading=!this.loading
    },
    async sendData() {
      try {
        await this.$http.put(
          `spendingUnit/${this.$route.params.id}`,
          {
            nombre_departamento: localStorage.getItem("depto"),
            nombre_unidadgasto: this.unit.nombre_unidadgasto,
            Jefe_unidad: this.unit.encargado_unidad,
            descripcion_unidadgasto: this.unit.descripcion_unidadgasto,
          },
          {
            headers: {
              authorization: this.token,
            },
          }
        );
      } catch (error) {
        throw new Error("Esta unidad de gasto ya fué registrada");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted: async function() {
    this.loading=!this.loading
      const unitData = (await this.$http.get(`spendingUnit/${this.$route.params.id}`,{
                headers:{
                  authorization:this.token,
                },
              })).data.datos[0]
      this.unit.nombre_unidadgasto=unitData.nombre_unidadgasto
      this.unit.encargado_unidad=unitData.jefe_unidad
      this.unit.descripcion_unidadgasto=unitData.descripcion_unidadgasto
      
    await this.getUsers();
    await this.listaUsuarios.push(unitData.jefe_unidad)
    this.loading=!this.loading
    var validCodesUnit = [32, 
                          48,49,50,51,52,53,54,55,56,57,
                          65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
                          97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,
                          193,201,205,209,211,218,225,233,237,241,243,250
                          ];
    var myTextbox1 = document.getElementById("nombreUnidad");
    myTextbox1.addEventListener(
      "keypress",
      (evt) => {
        var charCode = evt.charCode;
        if (charCode != 0) {
          var isValid = validCodesUnit.includes(charCode);
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

<style lang="scss" scoped>
.edit_unit {
  background-color: #f7f6f6;
  padding: 20px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.unit_title {
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

.form_unitreg {
  padding: 8px;
  text-align: left;
  width: 100%;
}
.loading-info{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}
.clock-loader {
  --clock-color: #000000;
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;
  
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: calc(var(--clock-radius) * 0.25);
    width: var(--clock-thickness);
    background: var(--clock-color);
    border-radius: 10px;
    transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: var(--clock-minute-length);
    animation-duration: 2s;
  }

  &::after {
    top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
    height: var(--clock-hour-length);
    animation-duration: 15s;
  }
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
.edit_unit textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}

.edit_unit input,
.edit_unit textarea {
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.edit_unit input ::placeholder,
.edit_unit textarea ::placeholder {
  color: #999999;
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
.form_input {
  width: 100%;
}
.unit_form_button{
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
}
</style>
