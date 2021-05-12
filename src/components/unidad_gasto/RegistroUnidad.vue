<template>
  <section class="reg_unit">
    <h2 class="unit_title">Registrar Unidad de Gasto</h2>
    <label>
      <div class="form_desc">Ingrese los datos de la nueva unidad de gasto</div>
    </label>
    <form class="form_unitreg" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <label>
          <div class="form_name">Unidad:</div>
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
        </label>
        <div
          class="form_check-error"
          v-if="!$v.unit.nombre_unidadgasto.required"
        >
          Campo obligatorio.
        </div>
      </div>
      <div class="form_section">
        <label>
          <div class="form_name">Encargado:</div>
          <lista-desplegable
            nombreLista="encargadoUnidad"
            :lista="listaUsuarios"
            required
            v-model="unit.encargado_unidad"
          ></lista-desplegable>
        </label>
      </div>
      <div class="form_section">
        <label>
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
        </label>
        <div
          class="form_check-error"
          v-if="!$v.unit.descripcion_unidadgasto.required"
        >
          Campo obligatorio.
        </div>
      </div>
      <button
        :disabled="$v.unit.$invalid"
        :class="$v.unit.$invalid ? 'button-disabled' : ''"
        class="form_button"
      >
        Crear
      </button>
    </form>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";
import ListaDesplegable from "./ListaDesplegable.vue";

export default {
  name: "RegistroUnidad",
  components: { Alert, ListaDesplegable },
  data() {
    return {
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
      const inCharge = (
        await this.$http.get(
          "users?criterio=facultad&nombre=FACULTAD%20DE%20CIENCIAS%20Y%20TECNOLOGIA"
        )
      ).data;
      for (let i = 0; i < inCharge.length; i++) {
        this.listaUsuarios.push(
          inCharge[i].nombres + " " + inCharge[i].apellidos
        );
      }
    },
    async submitForm() {
      try {
        if (!this.$v.unit.$invalid) {
          await this.sendData();
          this.alert("success", "Unidad creada exitosamente");
        } else {
          this.alert("warning", "Rellene todos los datos correctamente");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async sendData() {
      try {
        await this.$http.post("spendingUnit", {
          nombre_departamento: "Ingeniería de Sistemas",
          nombre_unidadgasto: this.unit.nombre_unidadgasto,
          encargado_unidad: this.unit.encargado_unidad,
          descripcion_unidadgasto: this.unit.descripcion_unidadgasto,
        });
      } catch (error) {
        throw new Error("Esta unidad de gasto ya fué registrada");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
  mounted() {
    this.getUsers();
    var validCodesUnit = [
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

<style>
.reg_unit {
  background-color: #f7f6f6;
  padding: 20px 40px 20px 40px;
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
  width: 600px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.form_unitreg {
  padding: 8px;
  text-align: left;
}

.reg_unit textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}

.reg_unit input,
.reg_unit textarea {
  background-color: #f7f6f6;
  border-style: none none solid none;
  border: 0px 0px 5px 0px;
  border-color: #3a3a3a;
  border-radius: 3px;
  padding: 8px;
  width: 550px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.reg_unit input ::placeholder,
.reg_unit textarea ::placeholder {
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  background: #999999;
  border: 0px;
}
</style>
