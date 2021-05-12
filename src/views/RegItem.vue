<template>
    <div class="register">
        <div class ="register_container">
            <RegistroItem class="register_item"/>
        </div>
    </div>
</template>

<script>
import RegistroItem from "@/components/item_gasto/RegistroItem.vue";

export default {
    name: "RegistroItemGasto",
    components:{
        RegistroItem,
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
