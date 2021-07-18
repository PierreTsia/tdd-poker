<template>
  <Card>
    <symbol id="DA" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
      <path
        d="M-270 460L-110 460M-200 450L0 -460L200 450M110 460L270 460M-120 130L120 130"
        stroke="red"
        stroke-width="80"
        stroke-linecap="square"
        stroke-miterlimit="1.5"
        fill="none"
      />
    </symbol>
    <symbol id="D" viewBox="-600 -600 1200 1200" preserveAspectRatio="xMinYMid">
      <path d="M-400 0C-350 0 0 -450 0 -500C0 -450 350 0 400 0C350 0 0 450 0 500C0 450 -350 0 -400 0Z" fill="red" />
    </symbol>
    <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black" />
    <use xlink:href="#D" height="70" width="70" x="-35" y="-35" />
    <use xlink:href="#DA" height="32" width="32" x="-114.4" y="-156" />
    <use xlink:href="#D" height="26.769" width="26.769" x="-111.784" y="-119" />
    <g transform="rotate(180)">
      <use xlink:href="#DA" height="32" width="32" x="-114.4" y="-156" />
      <use xlink:href="#D" height="26.769" width="26.769" x="-111.784" y="-119" />
    </g>
  </Card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Card from '/@/ui/cards/Card.vue';
export default defineComponent({ name: 'AD', components: { Card } });
</script>
