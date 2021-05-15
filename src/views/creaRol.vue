<template>
    <div class="register">
        <div class ="register_container">
            <CrearRol class="register_item"/>
        </div>
    </div>
</template>

<script>
import CrearRol from "@/components/rol/CrearRol.vue";
export default {
    name: "CrearRoles",
    components:{
        CrearRol,
    },
}
</script>

<style scoped>
.register{
    background-color: #46b1c95b;
    margin-top:0;
}
.register_container{
    display: block;
    padding: 50px 300px 50px 300px;
}
</style>