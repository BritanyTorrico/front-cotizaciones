<template>
  <section class="crear_rol">
    <h2 class="rol_title">Crear rol</h2>
    <form>
      <div class="form_section">
        <label>
          <div class="form_name">Nombre de rol:</div>
          <input name="nombreRol"
                           
          type="text"
          maxlength="30"
          placeholder="Ingrese nombre aquí"
          />
        </label>
     </div>
     <div class="form_section">
        <label>
          <div class="form_name">Seleccionar funcion:</div>
          <input type="checkbox"  id="funcion" value="funcion">
          <label for="funcion">Funcion 1</label>
        </label>
     </div>  
     <button class="form_button">
       Crear
     </button>  
    </form>         
  </section>

</template>

<script>
export default {
  name:"CrearRol",
   
}


</script>

<style>
.crear_rol{
  background-color: #f1f2f6;
    padding: 20px 40px 20px 40px;
}
.rol_title{
   text-align:left;
    color: #3f4b5b;
    font-size:36px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.form_section{
  padding:40px 0px 40px 0px;
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
  background-color: #003670;
  padding: 12px 115px 12px 115px;
  border-radius: 2px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}
</style>