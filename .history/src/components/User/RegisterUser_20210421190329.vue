<template>
  <div class="container">
    <form action="">
      <div class="flex-container">
        <div class="form__image">
          <img src="@/assets/edificioUMSS.jpg" alt="" />
        </div>

        <div class="form__datos">
          <div class="form_title">
            <h1>Registrar Usuario</h1>
            <hr class="form__linea" />
          </div>
          <div class="form__section">
            <div class="form__name">
              <label
                ><div class="formulario_label">Nombre:</div>
                <input
                  class="form__input"
                  type="text"
                  placeholder="Ingrese su nombre"
                  required
                />
              </label>
            </div>
            <div class="form__name">
              <label
                ><div class="formulario_label">Apellidos:</div>
                <input
                  class="form__input"
                  type="text"
                  placeholder="Ingrese su apellido"
                  required
                />
              </label>
            </div>
          </div>
          <div class="form__section">
            <div class="form__name">
              <label
                ><div class="formulario_label">Nombre de usuario:</div>
                <input
                  class="form__input"
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  required
                />
              </label>
            </div>
            <div class="form__name">
              <label
                ><div class="formulario_label">Celular:</div>
                <input
                  class="form__input"
                  type="text"
                  placeholder="Ingrese su celular"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
};
</script>

<style lang="css" scoped>
.flex-container {
  display: flex;
  background-color: #ecf0f1;
}
.form__image {
  width: 40%;
}
.form__image img {
  width: 100%;
  height: 600px;
}

.form__datos {
  width: 60%;
  margin-left: 40px;
  margin-right: 40px;
}
.form_title {
  color: var(--color-title);
  text-align: left;
  font-size: 14px;
}
.form_title h1 {
  padding-bottom: 12px;
}
.form__linea {
  color: var(--color-title);
}
.form__input {
  width: 100%;
  padding: 6px;
  margin: 6px 6px;
  border: none;
  border-bottom: 2px solid var(--color-line);
  background-color: transparent;
}
.form__input:focus {
  background: linear-gradient(to bottom, transparent, #ced6e0);
  outline: none;
  border-bottom: 2px solid #747d8c;
}
.form__section {
  margin-top: 50px;
  display: flex;
  color: red;
}
.formulario_label {
  padding-left: 6px;
  color: var(--color-name);
  text-align: left;
  font-weight: bold;
}
.form__name {
  width: 100%;
  padding-right: 50px;
}
</style>
