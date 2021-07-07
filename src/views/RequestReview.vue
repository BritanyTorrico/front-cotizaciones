<template>
<div v-if="permisoRevisionSolicitudes">
  <div class="review">
      <div class="review-container">
          <Inbox class="review-inbox"/>
      </div>
  </div>
</div>
</template>

<script defer>
import { mapState } from 'vuex';
import Inbox from '../components/view_requests/Inbox.vue'
export default {
  components: { Inbox },
  data(){
      return{};
  },
  computed: {
    ...mapState(["permisoRevisionSolicitudes"])
  },
  mounted(){
    if(!this.permisoRevisionSolicitudes){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.review{
    margin: 2rem;
    margin-top: 0;
}
</style>