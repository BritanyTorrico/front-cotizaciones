<template>
  <div class="single-request-details">
      <div class="head-part">
          <div class="head-top">
              <h2>{{ request.name }}</h2>
              <div class="time">{{ request.date }}</div>
          </div>
          <div class="head-subject">{{ request.author }}</div>
      </div>
      <div class="body-part">
          <h5>Justificación:</h5>
          <p>{{ request.description }}</p>
          <div class="money">
              <h5>Presupuesto: </h5>{{ request.budget}}
          </div>
      </div>
      <div class="response">
          <button class="accept-button">Aceptar</button>
          <button class="reject-button">Rechazar</button>
      </div>
  </div>
</template>

<script>
export default {
    name:"Details",
    data(){
        return{};
    },
    props: {
        request: {
            name: String,
            date: String,
            author: String,
            description: String,
            budget: Number
        }
    }
}
</script>
<style>
.single-request-details::before{
    color: #fff;
}
.single-request-details{
    background: #fff;
    margin: 40px;
    padding: 10px 10px 20px 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 143, 216, 0.15);
    width: 100%;
    border: 2px solid #808C8F;
}
.head-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
h2{
    color: #667080!important;
    font-size: 30px;
    font-weight: 600;
}
.time{
    font-size: 16px;
    color: #8492b4!important;
    text-transform: capitalize;
}
.head-subject{
    font-size: 22px;
    font-weight: 600;
    color: #7b8591!important;
    margin-top: 12px;
    text-align: left;
}
.body-part{
    text-align: left;
    margin: 25px 0 0;
}
h5{
    font-size: 18px;
    color: #8492b4!important;
    line-height: 1.8;
}
p{
    font-size: 18px;
    color: #8492b4!important;
    line-height: 1.8;
    margin-bottom: 30px;
}
.money h5{
    word-break: keep-all;
}
.response{
    display: flex;
}
.accept-button {
  margin: auto;
  display: block;
  background-color: #003570;
  padding: 12px 115px 12px 115px;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}
.reject-button {
  margin: auto;
  display: block;
  background-color: #B70D0D;
  padding: 12px 115px 12px 115px;
  border-radius: 22px;
  color: #fafafa;
  font-size: 22px;
  font-weight: bold;
  border: 0px;
}

</style>