<template>
  <section class="crear_rol">
    <h2 class="rol_title">Formulario de cotizacion</h2>
    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
          <div class="form_label">Titulo:</div>
          <div class="form-name">{{ this.nombreCotizacion }}</div>
     </div>
     <div class="items">
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
  </section>

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
     keyhandler(e){
       if (!e.key.math(/^[a-zA-Z0-9ñÑ+áéíóúÁÉÍÓÚ'\s]*$/)){
         e.preventDefault();
       }
     },
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
   },
   mounted()  {
       this.nombreCotizacion=this.request.name.replace('Solicitud', 'Cotización')
   }
};
</script>

<style>
.crear_rol{
  background-color: #f1f2f6;
    padding: 20px 40px 20px 40px;
}
.rol_title{
   text-align:left;
    color: #5c9aeb;
    font-size:36px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.form_crear{
    padding:8px;
    text-align: left;
}
.crear_rol textarea {
    resize: none;
    word-wrap:break-word;
    overflow-y:auto;
}
.form_check{
  display: flex;
  flex-direction: column;
  align-items: left;
  
  width: 100%;
}
.crear_rol input,
.crear_rol textarea {
    background-color: #F7F6F6;
    border-style: none none solid none;
    border: 0px 0px 5px 0px;
    border-color: #3a3a3a;
    border-radius: 3px;
    padding: 8px;
    width: 550px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.crear_rol input ::placeholder,
.crear_rol textarea ::placeholder{
    color:#999999;
    font-size: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.form_label{
    color:#3f4b5b;
    font-size:24px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
}
.form_section{
      padding:25px 0px 25px 0px;
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