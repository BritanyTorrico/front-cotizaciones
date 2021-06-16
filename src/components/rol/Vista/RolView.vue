<template>
    <div class="single-role-details">
        <div class="head-part">
            <div class="head-top">
                <h2>{{ rol.name }}</h2>
            </div>
        </div>
        <div class="body-part">
            <div class="body-functions">
                <h5>Funciones:</h5>
                <ul class="role-functions">
                    <li v-for="(func, i) in rol.functions" :key="i" class="list-rol">
                        {{ func }}
                    </li>
                </ul>
            </div>
            <div class="body-users">
                <h5>Usuarios:</h5>
                <ul class="role-users">
                    <li v-for="(usr, i) in rol.users" :key="i" class="list-rol">
                        {{ usr }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="options">
            <button class="accept-button">Editar</button>
            <button class="reject-button">Eliminar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RolView',
    data() {
        return {}
    },
    props: {
        rol: {
            cod: Number,
            name: String,
            functions: Array,
            users: Array,
        },
    },
}
</script>

<style scoped>
.single-role-details {
    background: #fff;
    margin: 40px;
    padding: 1% 1% 2% 1%;
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
h3 {
    color: #030303 !important;
    font-size: 20px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-right: 1%;
}
.body-part {
    text-align: left;
    display: flex;
}
h5 {
    font-size: 18px;
    color: #030303 !important;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding-right: 2%;
}
.body-functions {
    display: flex;
    flex-direction: column;
    color: #626262;
    font-size: 18px;
    display: flex;
    width: 50%;
    align-items: baseline;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.body-users {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    color: #626262;
    font-size: 18px;
    display: flex;
    width: 50%;
    align-items: baseline;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.options {
    display: flex;
}
.role-functions .role-users {
  color: #030303;
  list-style-position: inside;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.list-rol {
  padding: 0 0 3% 15%;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 420;
  width: 100%;
}
</style>
