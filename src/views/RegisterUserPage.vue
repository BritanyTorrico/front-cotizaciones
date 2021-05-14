<template>
  <div class="contenedor">
    <div class="register-containers12">
      <register-user />
    </div>
  </div>
</template>

<script>
import RegisterUser from "@/components/User/RegisterUser.vue";
export default {
  components: { RegisterUser },
  name: "RegisterUserPage",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.contenedor {
  background-color: #46b1c95b;
  text-align: center;
  display: block;
}
.register-containers12 {
  padding: 0px 90px 0px 90px;
}
</style>
