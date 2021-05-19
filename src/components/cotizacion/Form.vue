<template>
    <div class="cot-form">
    <h2 class="form-title">Formulario de cotizacion</h2>
    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
          <div class="form_label">Titulo:</div>
          <div class="form-name">{{ this.nombreCotizacion }}</div>
     </div>
     <div class="form_section">
          <div class="form_label">Fecha:</div>
          <div class="form-name">{{ this.today }}</div>
     </div>
     <div class="items">
       <div class="form_label">Items:</div>
         <table class ="items-list">
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
     <div class="form-empresas">
         <empresas></empresas>
     </div>
    </form> 
    <Alert ref="alert"></Alert>    
    </div>    

</template>

<script>
import Alert from "@/components/Alert.vue";
import Empresas from './Empresas.vue';
export default {
  name:"Form",
  components:{ Alert, Empresas },
   data(){
     return{
       disabled: false,
       rubro: '',
       nombreCotizacion: '',
       today: ''
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
        }
    },
   methods: {
     async submitForm(){
       try{
         if(!this.$v.dato.$invalid){
           await this.sendData();
           this.alert("success","Rol creado exitosamente")
         }else{
           this.alert("warring","Rellene todos los datos")
         }
       }catch(error){
         this.alert("warring",error);
       }
     },
     async sendData(){
       try{
         await this.$http.post("rolePerFunctions",{
           nombre_rol: this.dato.nombre_rol,
         });
       }catch (error){
         throw new Error ("Este rol ya esta registrado");
       }
     },
     alert(alertType,alertMessage){
       this.$refs.alert.showAlert(alertType, alertMessage);
     },
     async curentDate(){
       const current = new Date();
       const date =`${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
       this.today=date;
     }
   },
   mounted()  {
       this.nombreCotizacion=this.request.name.replace('Solicitud', 'Cotización')
       this.curentDate();
   }
};
</script>

<style>
.cot-form{
  background-color: #f1f2f6;
    margin: 40px;
    padding: 10px 10px 20px 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
    width: 100%;
    border: 1px solid #808C8F;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
}
.form-title{
   text-align:left;
    color: #3d8af7;
    font-size:36px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    border-bottom: 3px solid #0d58cf;
    width: 90%;
    padding: 0 0 1.5% 0;
}
.form_crear{
    padding:0 0 0 3%;
    text-align: left;
}
.form_label{
    color:#3f4b5b;
    font-size:24px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
    padding: 0 1% 0 0;
}
.form_section{
      padding:1.5% 0px 1.5% 0px;
      display: flex;
      align-items: baseline;
}
.form-name{
  
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
    border-bottom: 1px;
    border-bottom-color: #999999;
}
.form_check-input-error {
  border: 1px solid #ed1c24 !important;
}
.button-disabled {
    background:#999999;
    border: 0px;
}
.items{
    align-self: center;
    width: 90%;
    padding: 0 0 5% 0;
    font-size: 17px;
}
.items thead{
    background-color: #f1f2f6;
    padding: 0 2% 0 2%;
    text-align: center;
}
.items th {
    border: 1px solid #c0c0c0;
}
.items td {
    border: 1px solid #c0c0c0;
}
</style>