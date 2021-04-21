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
            <div class="form__nombre">
              <label>Nombre:</label>
              <input
                class="form__input"
                type="text"
                placeholder="inserta nombre"
              />
            </div>
            <div class="form__apellidos"></div>
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
  color: #0c59cf;
  text-align: left;
}
.form__linea {
  color: #0c59cf;
}
.form__input {
  width: 100%;
  padding: 6px;
  margin: 6px 0px;
  border: none;
  border-bottom: 3px solid aqua;
  background-color: transparent;
  color: red;
}
.form__section {
  display: flex;
}
</style>
