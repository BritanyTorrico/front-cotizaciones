<template>
  <div class="container">
      <div class="card-head">
          <h3>{{ name }}</h3>
          <div class="card-date">{{ date }}</div>
      </div>
      <div class="card-author">{{ author }}</div>
      <div class="card-description">{{ description }}</div>
  </div>
</template>

<script>
export default {
    name:"Card",
    data(){
        return{};
    },
    props: {
        name: String,
        date: Date,
        author: String,
        description: String,
    }
}
</script>

<style>
.container{
    margin-left: 22px;
    color:#8492b4!important;
}
.card-head{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
h3{
    font-size: 18px;
}
.card-date{
    font-size:16px;
    text-transform: uppercase;
}
.card-author{
    font-size: 18px;
    font-weight: 600;
}
.card-description{
    font-size: 16px;
    color: #8492b4!important;
    margin: 23px 0 0;
    line-height: 1.5em;
    height: 4.5em;
    word-wrap: break-word;
    overflow: hidden;
}
.container:hover{
    background: #fff!important;
    box-shadow: 0px 0px 40px rgba(0, 143, 216, 0.15);
}
.container:hover ::before{
    visibility: visible;
    opacity: 1;
}
</style>