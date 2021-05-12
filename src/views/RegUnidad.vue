<template>
    <div class="register">
        <div class ="register_container">
            <RegistroUnidad class="register_unit"/>
        </div>
    </div>
</template>

<script>
import RegistroUnidad from "@/components/unidad_gasto/RegistroUnidad.vue";

export default {
    name: "RegistroUnidadGasto",
    components:{
        RegistroUnidad,
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
    padding: 50px 400px 50px 400px;
}
</style>
