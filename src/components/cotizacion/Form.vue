<template>
  <section class="crear_rol">
    <h2 class="rol_title">Formulario de cotizacion</h2>
    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <div id="tabla" class="form_label">Titulo:</div>
        <div class="form-name">Nombre Cotizacion</div>
      </div>
      <div class="items">
        <table class="items-list">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Detalle</th>
              <th>Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              id="tablita"
              v-for="(item, index) in request.itemList"
              :key="index"
            >
              <td>{{ item.cantidad_solicitud }}</td>
              <td>{{ item.unidad_solicitud }}</td>
              <td>{{ item.detalle_solicitud }}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-empresas">
        <empresas></empresas>
      </div>
      <button @click="ImprimirOrden">Imprimir</button> <br />
      <div id="DivIdToPrint">
        <link href="style.css" rel="stylesheet" type="text/css" />
        <table border="1">
          <thead style="border:1px solid;">
            <tr>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Detalle</th>
              <th>Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in request.itemList" :key="index">
              <td>{{ item.cantidad_solicitud }}</td>
              <td>{{ item.unidad_solicitud }}</td>
              <td>{{ item.detalle_solicitud }}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Do not print.</p>
      <input type="button" id="btn" value="Print" @click="printDiv()" />

      <div id="gabe">
        <link href="style.css" rel="stylesheet" type="text/css" />
        <table border="1">
          <thead style="border:1px solid;">
            <tr>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Detalle</th>
              <th>Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in request.itemList" :key="index">
              <td>{{ item.cantidad_solicitud }}</td>
              <td>{{ item.unidad_solicitud }}</td>
              <td>{{ item.detalle_solicitud }}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button @click="printWindow()">Print gabe</button>
      </div>
      <!--ESTEEE PARAECE-->
      <div id="muestra">
        <table id="muestra" class="tabla">
          <tr>
            <th>Columna 1</th>
            <th>Columna 2</th>
          </tr>
          <tr>
            <td>datos...</td>
            <td>datos....</td>
          </tr>
          <tr>
            <td>datos...</td>
            <td>datos...</td>
          </tr>
        </table>
      </div>
      <button type="button" @click="imprim2()">Imprimir</button>
    </form>
    <Alert ref="alert"></Alert>
  </section>
</template>

<script>
import JQuery from "jquery";
let $ = JQuery;
import Alert from "@/components/Alert.vue";
import Empresas from "./Empresas.vue";
export default {
  name: "Form",
  components: { Alert, Empresas },
  data() {
    return {
      disabled: false,
      rubro: "",
    };
  },
  props: {
    request: {
      name: String,
      date: String,
      author: String,
      description: String,
      budget: Number,
      itemList: Array,
    },
    //  listaPrint: ["1", "2", "2", "4"],
  },
  methods: {
    imprim2() {
      var mywindow = window.open("", "PRINT", "height=400,width=600");
      mywindow.document.write("<html><head>");
      mywindow.document.write(
        "<style>.tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}.tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}.tabla td{border:1px solid #ddd;text-align:left;padding:6px;}</style>"
      );
      mywindow.document.write("</head><body >");
      mywindow.document.write(document.getElementById("muestra").innerHTML);
      mywindow.document.write("</body></html>");
      mywindow.document.close(); // necesario para IE >= 10
      mywindow.focus(); // necesario para IE >= 10
      mywindow.print();
      mywindow.close();
      return true;
    },
    printWindow: function() {
      window.print();
    },
    printDiv() {
      var divToPrint = document.getElementById("DivIdToPrint");

      var newWin = window.open("", "Print-Window");

      newWin.document.open();

      newWin.document.write(
        '<html><body onload="window.print()">' +
          divToPrint.innerHTML +
          "</body></html> "
      );

      newWin.document.close();

      setTimeout(function() {
        newWin.close();
      }, 10);
    },
    ImprimirOrden() {
      $("<iframe>", { name: "myiframe", class: "printFrame" })
        .appendTo("body")
        .contents()
        .find("body").append(`

                  <style>
                  table, th, td {border: 1px solid black;border-collapse: collapse;}

                  th, td {padding: 5px;text-align: left;}


                  .centerText { text-align: center}
                  .rightText { text-align: right}
                  .boldText {font-weight: bold;}
                  .seccion-superior{
                    text-align:left;
                  }
                  </style>



        <h1 class="seccion-superior">UNIVERSIDAD MAYOR DE SAN SIMON</h1>
          <h4 class="centerText">Solicitud de Cotizacion</h4>
          <table style="width:100%" >
            <tr>
              <th class="centerText">Cantidad</th>

            </tr>
            <tbody>
            <tr v-for="(item, index) in listaPrint" :key="index">
              <td>
                {{ item }}
              </td>
            </tr>
          </tbody>
          </table>


        `);

      window.frames["myiframe"].focus();
      window.frames["myiframe"].print();

      setTimeout(() => {
        $(".printFrame").remove();
      }, 1000);
    },
    keyhandler(e) {
      if (!e.key.math(/^[a-zA-Z0-9ñÑ+áéíóúÁÉÍÓÚ'\s]*$/)) {
        e.preventDefault();
      }
    },
    async submitForm() {
      try {
        if (!this.$v.dato.$invalid) {
          await this.sendData();
          this.alert("success", "Rol creado exitosamente");
        } else {
          this.alert("warring", "Rellene todos los datos");
        }
      } catch (error) {
        this.alert("warring", error);
      }
    },
    async sendData() {
      try {
        await this.$http.post("rolePerFunctions", {
          nombre_rol: this.dato.nombre_rol,
        });
      } catch (error) {
        throw new Error("Este rol ya esta registrado");
      }
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
};
</script>

<style scoped>
.crear_rol {
  background-color: #f1f2f6;
  padding: 20px 40px 20px 40px;
}
.rol_title {
  text-align: left;
  color: #5c9aeb;
  font-size: 36px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_crear {
  padding: 8px;
  text-align: left;
}
.crear_rol textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}
.form_check {
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 100%;
}
.crear_rol input,
.crear_rol textarea {
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
.crear_rol input ::placeholder,
.crear_rol textarea ::placeholder {
  color: #999999;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_label {
  color: #3f4b5b;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.form_section {
  padding: 25px 0px 25px 0px;
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
  border-bottom: 1px;
  border-bottom-color: #999999;
}
.form_check-input-error {
  border: 1px solid #ed1c24 !important;
}
.button-disabled {
  background: #999999;
  border: 0px;
}
th,
td {
  padding: 20px;
}
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid rgb(109, 111, 112);
}
table {
  background-color: #dbdbdb;
}
tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
</style>
