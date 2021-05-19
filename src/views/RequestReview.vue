<template>
  <div class="review">
      <div class="review-container">
          <Inbox class="review-inbox"/>
      </div>
  </div>
</template>

<script>
import Inbox from '../components/view_requests/Inbox.vue'
export default {
  components: { Inbox },
  data(){
      return{};
  }

}
</script>

<style scoped>
.review{
    margin: 2rem;
    margin-top: 0;
}
</style>