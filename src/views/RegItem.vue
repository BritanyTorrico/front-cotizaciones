<template>
    <div class="register">
        <div class ="register_container">
            <RegistroItem class="register_form"/>
        </div>
    </div>
</template>

<script>
import RegistroItem from "@/components/RegistroItem.vue";

export default {
    name: "RegistroItemGasto",
    components:{
        RegistroItem,
    },
}

</script>

<style scoped>

</style>
