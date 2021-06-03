<template>
  <div class="single-item-details">
      <div class="head-part">
      <div class="head-top">
        <h2>{{ company.name }}</h2>
      </div>
      <div class="head-info">
          <div class="head-subject"><h3>Representante legal:</h3>{{ company.deputy }}</div>
        <div class="head-subject"><h3>NIT:</h3>{{ company.nit }}</div>
      </div>
    </div>
    <div class="body-part">
        <div class="money">
        <h5>Teléfono:</h5>
        {{ company.phone }}
      </div>
      <div class="money">
        <h5>Correo:</h5>
        {{ company.mail }}
      </div>
      <div class="money">
        <h5>Cuenta bancaria:</h5>
        {{ company.bank }}
      </div>
      <h5>Dirección:</h5>
      <p>{{ company.address }}</p>
    </div>
    <div class="options">
        <button class="accept-button">Editar</button>
        <button class="reject-button">Eliminar</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "CompView",
  data(){
      return{};
  },
  props: {
      company: {
        cod: Number,
        name: String,
        nit: Number,
        deputy: String,
        phone: Number,
        address: String,
        mail: String,
        bank: Number,
      }
  }
}
</script>

<style scoped>
.single-item-details {
  background: #fff;
  margin: 40px;
  padding: 10px 10px 20px 10px;
  box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
  width: 100%;
  border: 1px solid #808c8f;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.head-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: #030303 !important;
  font-size: 35px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-subject {
  font-size: 20px;
  font-weight: 500;
  color: #3a3939 !important;
  margin-top: 12px;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: baseline;
  width: 50%;
}
h3 {
  color: #030303 !important;
  font-size: 25px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  padding-right: 0.7%;
}
.body-part {
  text-align: left;
  margin: 25px 0 0;
}
h5 {
  font-size: 18px;
  color: #030303 !important;
  font-weight: 600;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.money {
  word-break: keep-all;
  color: #626262;
  font-size: 18px;
  display: flex;
  width: 100%;
  align-items: baseline;
  padding-right: 0.5%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
p {
  font-size: 18px;
  color: #626262 !important;
  line-height: 1.8;
  margin-bottom: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #b70d0d;
  padding: 1.2% 11.5% 1.2% 11.5%;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.head-info{
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.options{
    display: flex;
}
</style>