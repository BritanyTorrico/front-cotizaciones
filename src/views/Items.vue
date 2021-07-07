<template>
<div v-if="permisoItemDeGasto">
  <div class="item-container">
      <InboxItem/>
  </div>
</div>
</template>

<script defer>
import { mapState } from 'vuex'
import InboxItem from '../components/item_gasto/Vista/InboxItem.vue'

export default {
  components: { InboxItem },
  name: "Items",
  computed: {
    ...mapState(["permisoItemDeGasto"])
  },
  mounted(){
    if (!this.permisoItemDeGasto){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.item-container{
    margin: 2rem;
    margin-top: 0;
}
</style>