<template>
  <div class="rounded overflow-hidden shadow-lg w-20 sm:w-30 card">
    <svg v-if="!isHidden" xmlns="http://www.w3.org/2000/svg" viewBox="-120 -168 240 336" preserveAspectRatio="none">
      <slot />
    </svg>
    <BackFace v-else class="card" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BackFace from '/@/ui/cards/BackFace.vue';
export default defineComponent({
  name: 'Card',
  components: { BackFace },
  props: { isHidden: { type: Boolean, default: false } },
});
</script>
<style scoped>
.card {
  max-height: 168px !important;
}
</style>
