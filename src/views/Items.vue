<template>
  <div class="item-container">
      <InboxItem/>
  </div>
</template>

<script>
import InboxItem from '../components/item_gasto/Vista/InboxItem.vue'

export default {
  components: { InboxItem },
  name: "Items"
}
</script>

<style scoped>
.item-container{
    margin: 2rem;
    margin-top: 0;
}
</style>