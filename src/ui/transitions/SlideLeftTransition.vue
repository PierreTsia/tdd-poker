<template>
  <transition
    enter-active-class="transition ease-out duration-1000 transform"
    enter-from-class="-translate-x-100 opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition ease-in duration-300 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot />
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SlideLeftTransition',
});
</script>
