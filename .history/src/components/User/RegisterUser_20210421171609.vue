<template>
  <div class="container">
    <form action="">
      <div class="flex-container">
        <div class="form__image">
          <img src="@/assets/edificioUMSS.jpg" alt="" />
        </div>

        <div class="form__datos">
          <div class="form_title">
            <hr />
            <h1>Registrar Usuario</h1>
          </div>

          <input class="form__input" type="text" placeholder="inserta nombre" />
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
</style>
