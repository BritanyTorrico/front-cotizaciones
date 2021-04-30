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
            <input type="checkbox" id="gestionUsuario" name="funcion" value="Gestionar Usuarios"/>
            <label for="gestionUsuario">Regisro de Usuarios</label><br>
            <input type="checkbox" id="gestionRol" name="funcion" value="Gestionar Roles"/>
            <label for="gestionRol">Regisro de Roles</label><br>
            <input type="checkbox" id="gestionUnidades" name="funcion" value="Gestionar Unidades de Gasto"/>
            <label for="gestionUnidades">Regisro de Unidades de Gasto</label><br>
            <input type="checkbox" id="gestionItems" name="funcion" value="Gestionar Items de Gasto"/>
            <label for="gestionItems">Regisro de Items de Gasto</label><br>
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
       funciones: [],
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
     async getFunciones(){
       const checkboxes = document.querySelectorAll('input[name="funcion"]:checked');
       checkboxes.forEach((checkbox) => {
             this.funciones.push(checkbox.value);
           });
     },
     async submitForm(){
       this.getFunciones();
       try{
         console.log("comienza envio");
         if(!this.$v.dato.$invalid){
           console.log("es valido");
           console.log(this.funciones[0]);
           await this.sendRolData();
           for (let i=0;i<this.funciones.length;i++){
             await this.sendFuncData(i);
           }
           
           this.alert("success","Rol creado exitosamente")
         }else{
           console.log("es invalido");
           this.alert("warring","Rellene todos los datos")
         }
       }catch(error){
         this.alert("warring",error);
       }
     },
     async sendRolData(){
       try{
         console.log("comienza registro de rol");
         await this.$http.post("roles",{
           nombre_rol: this.dato.nombre_rol,
         });
         console.log("termina registro de rol");
       }catch (error){
         console.log("error en rol");
         throw new Error ("Este rol ya esta registrado");
       }
     },
     async sendFuncData(index){
       try{
         console.log("comienza a enviar funcion " + index);
         await this.$http.post("rolePerFunctions",{
           nombre_rol: this.dato.nombre_rol,
           nombre_funcion: this.funciones[index],
         });
         console.log("termina de enviar funcion " + index);
       }catch (error){
         console.log("error en funcion");
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

.form_name{
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
</style>