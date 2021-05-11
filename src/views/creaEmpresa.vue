<template>
    <div class="register">
        <div class ="register_container">
            <CrearEmpresa class="register_empresa"/>
        </div>
    </div>
</template>

<script>
import CrearEmpresa from "@/components/empresa/CrearEmpresa.vue";
export default {
    name: "CrearEmpresas",
    components:{
        CrearEmpresa,
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