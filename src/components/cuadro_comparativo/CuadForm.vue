<template>
  <div class="single-request-details">
    <div class="head-part">
      <div class="head-top">
        <h2>Cuadro comparativo para {{ request.name }}</h2>
        <div class="time">{{ request.date }}</div>
      </div>
      <div class="head-info">
        <div class="head-subject"><h3>Solicitante:</h3>{{ request.author }}</div>
      </div>
    </div>
    <h5>Items:</h5>
    <div id="DivIdToPrint" class="items">
      <table class="items-list">
        <thead>
          <tr>
            <th style="border:1px solid; width:50px;">Cant</th>
              <th style="border:1px solid; width:50px;">Unidad</th>
              <th style="border:1px solid; width:500px;">Descripción</th>
              <th style="border:1px solid; width:100px;" v-for="(comp, i) in request.companyList" :key="i">{{ comp }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, ind) in request.itemList" :key="ind">
            <td style="border:1px solid;" class="table-quantity">{{ item.cantidad }}</td>
              <td style="border:1px solid;" class="table-unity">{{ item.unidad }}</td>
              <td style="border:1px solid;" class="table-detail">{{ item.descripcion }}</td>
              <td v-for="(price, index) in item.precios" :key="index" style="border:1px solid;" class="table-itemname">{{ price }}</td>
          </tr>
          
          <tr v-for="m in 5" :key="m">
            <td class="empty-rows" v-for="n in (3 + request.companyList.length)" :key="n" style="border:1px solid; height:25px;"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="body-part">
      <h5>Observaciones:</h5>
      <textarea 
      placeholder="Ingrese observaciones correspondientes a la tabla"
      cols="50"
          rows="5"
          maxlength="240"
          required
      v-model="observations"></textarea>
    </div>
    <div class="head-subject"><h3>Unidad de gasto:</h3>{{ request.unit }}</div>
    <div class="head-subject"><h3>Encargado de unidad:</h3>{{ request.incharge }}</div>
    <div class="head-subject"><h3>Jefe de departamento:</h3>{{ request.boss }}</div>
    <div class="response">
      <button
        class="accept-button"
        v-on:click="send()"
        >Enviar</button
      >
      <button
        class="reject-button"
        v-on:click="print()"
        >Imprimir</button
      >
    </div>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
import Alert from '../Alert.vue';
export default {
  components: { Alert },
  name: "CuadForm",
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      preview: false,
      images: [],
      observations: ""
    };
  },
  props: {
    request: {
      cod: Number,
        name: String,
        date: String,
        author: String,
        unit: String,
        incharge: String,
        boss: String,
        companyList: Array,
        itemList: Array,
    },
    
  },
  methods: {
    async send() {
      try {
        if (this.observations!=""){
        const table=(
                          await this.$http.get(`tableData?nombre=${this.request.name}`,{
                              headers: {
                                              authorization: this.token,
                                          }})
                      ).data
        
          console.log(table.cotizaciones);
          console.log(this.request.name);
          console.log(this.observations);
          await this.$http.post(`table`,{
            nombre_solicitud: this.request.name,
            observaciones_tabla: this.observations,
            cotizaciones: table.cotizaciones
          },{
                              headers: {
                                              authorization: this.token,
                                          }})
          this.alert("success", "Cuadro enviado exitosamente");
            this.$router.push(`/cuadro_comparativo`)
        }else{
          this.alert("warning", "Ingrese observaciones");
        }
      } catch (error) {
        this.alert("warning", error);
      }
    },
    async print() {
      const myName = (
          await this.$http.get(
            `getFullName?usuario=${localStorage.getItem("nombreUsuario")}`
          )
        ).data[0];
      let nombres = this.request.unit;
      let nombres2 = this.request.incharge;
      let nombres3 = `${myName.nombres} ${myName.apellidos}`;
      let nombres4 = this.request.boss;
      let observaciones = this.observations
      let today=new Date;
      const day=today.getDate()
      const month=today.getMonth()+1
      const year=today.getFullYear().toString().substr(-2)
      console.log(nombres, nombres2, nombres3, nombres4);
      var divToPrint = document.getElementById("DivIdToPrint");
      var newWin = window.open("", "Print-Window");
      newWin.document.open();
      newWin.document.write(
        '<html><body onload="window.print()"><div class="contenedor-imp"><div class="seccion1"><h2 class="titulo">UNIVERSIDAD MAYOR DE SAN SIMON</h2><h2 >FACULTAD DE CIENCIAS Y TECNOLOGÍA</h2><h2>SECCIÓN ADQUISICIONES</h2><h3 class="depa">COCHABAMBA-BOLIVIA</h3></div><div class="seccion-medio"><p></p></div><div class="seccion-2"><table><tr><th colspan="3">  EMISION </th></tr><tr><td>'+day+'</td><td>'+month+'</td><td>'+year+'</td></tr></table></div></div><div class="conteedor-title"><h1>CUADRO COMPARATIVO DE COTIZACIONES</h1></div>' +
          "<p>TABLA</p>" +
          divToPrint.innerHTML +
          '<p class="mensaje">Observaciones:'+observaciones+'</p>' +
          '<div class="seccion_personal"><table><tr><th style="width:200px">SECCION ADQUISIONES</th><th style="width:200px">JEFE DE UNIDAD</th><th style="width:220px">TECNICO RESPONSABLE</th><th style="width:200px">JEFE ADMINISTRATIVO</th></tr><tr><td>' +
          nombres +
          "</td><td>" +
          nombres2 +
          "</td><td>" +
          nombres3 +
          "</td><td>" +
          nombres4 +
          "</td></tr></table></div>" +
          "</body></html> <style>.contenedor-imp{display:flex;width:100%} .seccion1{width:60%;font-size:14px} h2{margin:0;padding:0;text-align:center} .seccion-medio{width:30%;} .seccion-2{width:10%;text-align:right;} p{margin:0;padding:0;} h1{text-align:center;text-decoration:underline} .empresa-der{display:inline;margin-left:350px;} .mensaje{font-style:italic;font-size:13px;margin-top:10px;margin-bottom:20px;} .Subtitulo{font-weigth:bold} .conteedor-title{margin-top:40px;margin-bottom:10px}.depa{font-size:13px;margin:0;padding:0;text-align:center} table{table-layout:fixed;width:80px;height:80px}table, th, td {border:1px solid black;border-collapse: collapse;height:40px;text-align:center} .seccion_personal{width:100%,border:1px solid}</style> "
      );
      newWin.document.close();
      setTimeout(function() {
        newWin.close();
      }, 10);
    },
    alert(alertType, alertMessage) {
      this.$refs.alert.showAlert(alertType, alertMessage);
    },
  },
};
</script>
<style scoped>
.single-request-details {
  background: #fff;
  margin: 1%;
  padding: 1.2% 1% 1.2% 1%;
  width: 98%;
  border: 1px solid #808c8f;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.single-request-details textarea {
  resize: none;
  word-wrap: break-word;
  overflow-y: auto;
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 0.8%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  border:1px solid #808c8f;
}

.head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: #030303 !important;
  font-size: 3.9vh;
  font-weight: 600;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.time {
  font-size: 1.9vh;
  color: #3f4b5b !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-subject {
  font-size: 3vh;
  font-weight: 500;
  color: #3a3939 !important;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: baseline;
  width: 100%;
}
h3 {
  color: #030303 !important;
  font-size: 3.2vh;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 0.7%;
}
.body-part {
  text-align: left;
}
.empty-rows {
  height: 0px !important;
  border: none !important;
}
h5 {
  font-size: 2.5vh;
  color: #030303 !important;
  font-weight: 600;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items {
  align-self: center;
  width: 100%;
  font-size: 2vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items thead {
  background-color: #c5c4c4;
  text-align: center;
}
.items th {
  padding: 1% 1% 1% 1%;
  border: 1px solid #d1d0d0;
}
.items td {
  padding: 0.5% 0.5% 0.5% 0.5%;
  border: 1px solid #c0c0c0;
}
.table-quantity{
  width: 11.5%!important;
}
.table-unity{
  width: 12%!important;
}
.table-detail{
  width: 37%!important;
}
.table-itemname{
  width: 13%!important; 
}
.response {
  display: flex;
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  height: 6vh;
  width: 22vw;
  border-radius: 22px;
  color: #fafafa;
  font-size: 1.1em;
  border: 0px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.show-button {
  margin: auto;
  display: block;
  background-color: #777272;
  padding: 0.5% 2.5% 0.5% 2.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #444444;
  height: 6vh;
  width: 22vw;
  border-radius: 22px;
  color: #fafafa;
  font-size: 1.1em;
  border: 0px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
