<template>
  <section class ="reg_item">
      <h2 class="titulo_reg">Registro de Item de Gasto</h2>
      <form class="form_itemreg" autocomplete="off">
          <div class="form_section">
              <label>
                  <div class="form_name">Nombre</div>
                  <input
                    name="nombreItem"
                    type="text"
                    maxlength="30"
                    required
                  />
              </label>
          </div>
          <div class="form_section">
              <label>
                  <div class="form_name">Categoría</div>
                  <input
                    name="categoriaItem"
                    list="categorias"
                    maxlength="30"
                  />
              </label>
              <datalist id="categorias">
                  <option value="Electronicos"></option>
                  <option value="Material de escritorio"></option>
                  <option value="Muebles y enseres"></option>
              </datalist>
          </div>
          <div class="form_section">
              <label>
                  <div class="form_name">Descripción</div>
                  <textarea
                    name="descripcionItem"
                    cols="50"
                    rows="10"
                    maxlength="1000"
                  />
              </label>
          </div>
          <div class="form_section">
              <label>
                  <div class="form_name">Justificación</div>
                  <textarea
                    name="justificacionItem"
                    cols="50"
                    rows="10"
                    maxlength="1000"
                  />
              </label>
          </div>
          <button class="form_button">
              Confirmar
          </button>
      </form>
  </section>
</template>

<script>

export default {
    name: "RegistroItem",
    data(){
        return{
            disabled: false,
            item: {
                nombre_item: null,
                categoria: null,
                descripcion: "",
                justificacion:"",
            },
        };
    },

    

}
</script>

<style>

</style>