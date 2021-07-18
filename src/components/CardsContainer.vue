<template>
  <div class="container flex flex-wrap justify-items-center items-center S-100">
    <div v-for="(cardSlug, i) in cardSlugs" :key="i">
      <component :is="`Card${cardSlug}`" :class="{ '-mr-16': isStacked }" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import * as cards from '/@/ui/cards/index';

export default defineComponent({
  name: 'CardsDeck',
  components: {
    ...cards,
  },
  props: {
    cards: {
      type: String,
      default: 'AD AC AH AS',
    },
    isStacked: { type: Boolean, default: false },
  },
  setup: props => {
    const cardSlugs = computed(() => props.cards.split(' '));

    watch(
      () => props.cards,
      () => {
        console.log('Watch props.selected function called with args:');
      },
    );

    return { cardSlugs };
  },
});
</script>
