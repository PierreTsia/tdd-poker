<template>
  <Card>
    <symbol id="D9" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
      <path
        d="M250 -100A250 250 0 0 1 -250 -100L-250 -210A250 250 0 0 1 250 -210L250 210A250 250 0 0 1 0 460C-150 460 -180 400 -200 375"
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
    <use xlink:href="#D9" height="32" width="32" x="-114.4" y="-156" />
    <use xlink:href="#D" height="26.769" width="26.769" x="-111.784" y="-119" />
    <use xlink:href="#D" height="70" width="70" x="-87.501" y="-135.501" />
    <use xlink:href="#D" height="70" width="70" x="17.501" y="-135.501" />
    <use xlink:href="#D" height="70" width="70" x="-87.501" y="-68.5" />
    <use xlink:href="#D" height="70" width="70" x="17.501" y="-68.5" />
    <g transform="rotate(180)">
      <use xlink:href="#D9" height="32" width="32" x="-114.4" y="-156" />
      <use xlink:href="#D" height="26.769" width="26.769" x="-111.784" y="-119" />
      <use xlink:href="#D" height="70" width="70" x="-87.501" y="-135.501" />
      <use xlink:href="#D" height="70" width="70" x="17.501" y="-135.501" />
      <use xlink:href="#D" height="70" width="70" x="-87.501" y="-68.5" />
      <use xlink:href="#D" height="70" width="70" x="17.501" y="-68.5" />
    </g>
  </Card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Card from '/@/ui/cards/Card.vue';
export default defineComponent({ name: 'Card9D', components: { Card } });
</script>
