<template>
  <div class="container">
    <form action="">
      <div class="flex-container">
        <div class="form__image">
          <img src="@/assets/edificioUMSS.jpg" alt="" />
        </div>

        <div class="form__datos">
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
}
.form__image {
  width: 50%;
}
.form__image img {
  width: 100%;
  height: 600px;
}

.form__datos {
  width: 50%;
}
</style>
