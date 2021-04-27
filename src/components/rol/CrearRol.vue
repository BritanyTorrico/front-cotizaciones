<template>
  <section class="crear_rol">
    <h2 class="rol_title">Crear rol</h2>
    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <label>
          <div class="form_name">Nombre de rol:</div>
          <input name="nombreRol"
           :class="
           $v.dato.nombre_rol.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          maxlength="25"
          v-on:keywdown=keyhandler($event)
          required
          placeholder="Ingrese nombre aquí"
          v-model="dato.nombre_rol"
          
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.nombre_rol.required">
        Campo obligatorio.
        </div>
     </div>
     <div class="form_section">
        <label>
          <div class="form_name">Seleccione las funciones:</div>
           
           
        </label>
     </div>  
     
     <button 
     :disabled="$v.dato.$invalid"
     :class="$v.dato.$invalid ? 'button-disabled':''"
      class="form_button">
       Crear
     </button>  
    </form> 
    {{dato}}
    <Alert ref="alert"></Alert>        
  </section>

</template>

<script>
import {
    required,
    maxLength,
} from "vuelidate/lib/validators";
import Alert from "@/components/Alert.vue";

export default {
  name:"CrearRol",
  components:{ Alert },
   data(){
     return{
       disabled: false,
       dato: {
         nombre_rol: null,
       },
     };
   },
   validations:{
     dato:{
       nombre_rol:{
         required,
         maxLength: maxLength(25),
       },
     },
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
         await this.$http.post("roles",{
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
.form_section{
      padding:25px 0px 25px 0px;
}
.form_crear{
    padding:8px;
    text-align: left;
}
.form_name{
    color:#3f4b5b;
    font-size:24px;
    font-weight: 500;
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
.form_check{
  display: flex;
  flex-direction: column;
  align-items: left;
  
  width: 100%;
}
.form_check-error {
    color: #ed1c24;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>