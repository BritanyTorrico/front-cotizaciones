<template>
  <div class="container">
    <div class="flex-container">
      <form class="form">
        <div class="form__image">
          <p>Aqui va la imagen</p>
        </div>

        <div class="form__datos">
          <input class="form__input" type="text" placeholder="inserta nombre" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",
};
</script>

<style lang="css" scoped>
.form {
  display: flex;
}
&__image {
  width: 50%;
}
</style>
