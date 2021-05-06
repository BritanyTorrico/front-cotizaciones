<template>
    <section class="crear_empresa">
    <h2 class="rol_title">Registro de empresa</h2>
     <label>
          <div class="form_desc">Ingrese los datos correspondientes a la nueva empresa</div>
     </label>
    <form class="form_crear" @submit.prevent="submitForm" autocomplete="off">
      <div class="form_section">
        <label>
          <div class="form_name">Nombre de la empresa:</div>
          <input name="nombreEmpresa"
           :class="
           $v.dato.nombre_empresa.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese nombre aquí"
          v-model="dato.nombre_empresa"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.nombre_empresa.required">
        Campo obligatorio.
        </div>
     </div>
     <div class="form_section">
       <label>
          <div class="form_name">Nit de la empresa:</div>
          <input name="nitEmpresa"
           :class="
           $v.dato.nit_empresa.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese nit aquí"
          v-model="dato.nit_empresa"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.nit_empresa.required">
        Campo obligatorio.
        </div>
     </div>  
     <div class="form_section">
       <label>
          <div class="form_name">Teléfono de la empresa:</div>
          <input name="telfEmpresa"
           :class="
           $v.dato.telefono_empresa.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese teléfono aquí"
          v-model="dato.telf_empresa"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.telefono_empresa.required">
        Campo obligatorio.
        </div>
     </div>  
     <div class="form_section">
       <label>
          <div class="form_name">Dirección de la empresa:</div>
          <input name="direccionEmpresa"
           :class="
           $v.dato.direccion_empresa.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese direccion aquí"
          v-model="dato.direccion_empresa"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.direccion_empresa.required">
        Campo obligatorio.
        </div>
     </div>  
     <div class="form_section">
       <label>
          <div class="form_name">Correo de la empresa:</div>
          <input name="correoEmpresa"
           :class="
           $v.dato.correo_empresa.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese correo aquí"
          v-model="dato.correo_empresa"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.correo_empresa.required">
        Campo obligatorio.
        </div>
     </div>  
     <div class="form_section">
       <label>
          <div class="form_name">Rubro:</div>
          <input name="rubro"
           :class="
           $v.dato.rubro.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese nombre aquí"
          v-model="dato.rubro"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.rubro.required">
        Campo obligatorio.
        </div>
     </div>  
     <div class="form_section">
       <label>
          <div class="form_name">Cuenta bancaria:</div>
          <input name="cuentaBancaria"
           :class="
           $v.dato.cuenta_bancaria.$invalid
           ? 'form_check-input-error'
           : 'form_check-input'
           "                
          type="text"
          minlength="5"
          maxlength="25"
          v-on:keydown="keyhandler($event)"
          required
          placeholder="Ingrese nombre aquí"
          v-model="dato.cuenta_bancaria"
          />
        </label>
        <div class="form_check-error"
        v-if="!$v.dato.cuenta_bancaria.required">
        Campo obligatorio.
        </div>
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
export default {

}
</script>

<style>

</style>