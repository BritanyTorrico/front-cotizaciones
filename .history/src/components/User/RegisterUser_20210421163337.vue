<template>
  <div class="container">
    <form>
      <div class="flex-container">
        <div class="form__imagen">
          <p>Aqui va la imagen</p>
        </div>
        <div class="form__datos"><input type="text" /></div>
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
.form {
  display: flex;
}
&__image {
  width: 50%;
}
</style>
