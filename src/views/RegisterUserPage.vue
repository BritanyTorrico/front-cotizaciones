<template>
  <div class="contenedor">
    <register-user />
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
</style>
