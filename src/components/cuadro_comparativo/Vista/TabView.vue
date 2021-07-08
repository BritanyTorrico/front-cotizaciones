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
        </tbody>
      </table>
    </div>
    <button v-if="images.length>0" class="show-button" @click="preview=!preview" id="show-button">
            <span for="show-button" v-if="preview">Ocultar Capturas</span>
            <span for="show-button" v-if="!preview">Mostrar Capturas</span>
    </button>
    <div class="image-container" v-for="(image, index) in images" :key="index">
      <img v-if="preview" :src="image" class="image-show" height="360px">
    </div>
    <div class="body-part">
      <h5>Observaciones:</h5>
      <p>{{ request.obs }}</p>
    </div>
    <div class="head-subject"><h3>Unidad de gasto:</h3>{{ request.unit }}</div>
    <div class="head-subject"><h3>Encargado de unidad:</h3>{{ request.incharge }}</div>
    <div class="head-subject"><h3>Jefe de departamento:</h3>{{ request.boss }}</div>
  </div>
</template>

<script defer>
import { mapState } from "vuex";
export default {
  name: "ReportForm",
  computed: {
    ...mapState(["token"]),
  },
  data() {
    return {
      preview: false,
      images: [],
      valid: null,
      response: "",
      resState: null,
      status: "",
      selectedCompany:""
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
        quotizer: String,
        companyList: Array,
        itemList: Array,
        obs: String
    },
  },
  watch:{
    response: function(){
      if (this.response!=''){
        this.resState=null;
      }
    }
  },
  mounted: async function(){
    const table=(
                          await this.$http.get(`tableData?nombre=${this.request.name}`,{
                              headers: {
                                              authorization: this.token,
                                          }})
                      ).data.cotizaciones
    for (let i of table){
      if (i.imagen_cotizacion!=null){
        let file=i.imagen_cotizacion
        file= await fetch(file)
        file=await file.blob()
        this.images.push(URL.createObjectURL(file))
      }
    }
  }
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
h5 {
  font-size: 2.5vh;
  color: #030303 !important;
  font-weight: 600;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
p {
  font-size: 2vh;
  color: #626262 !important;
  line-height: 1.8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.items {
  align-self: center;
  width: 100%;
  font-size: 2vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding-bottom: 1%;
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
.report-just{
  background-color: #f7f6f6;
  border-radius: 3px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    resize: none;
  word-wrap: break-word;
  overflow-y: auto;
}
.head-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.image-container{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  max-width: 100%;
}
.image-show{
  border: 1px;
  border-radius: 5px;
  max-width: 100%;
  max-height: auto;
  align-items: center;
  padding: 0.2% 0% 1% 1.5%;
  align-self: center;
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
.form_check-error {
  color: #ed1c24;
  font-size: 14px;
  padding: 0 0 0 2%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
