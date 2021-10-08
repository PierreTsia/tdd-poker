<template>
  <div class="container max-w-200 p-2 h-auto sm:h-screen mx-auto flex flex-col w-full">
    <div class="container flex flex-col items-center justify-center">
      <div class="container flex flex-col items-center justify-center p-2 min-h-24">
        <SlideLeftTransition>
          <h1 v-if="winner" class="text-center w-full font-sans text-3xl font-bold leading-tight mb-2">
            {{ result }}
          </h1>
        </SlideLeftTransition>
        <FadeTransition>
          <p v-if="handDescription" class="leading-normal text-sm text-center w-full text-gray-800 dark:text-gray-200">
            With {{ handDescription }}
          </p>
        </FadeTransition>
      </div>
      <div class="card-hand" v-for="(player, i) in players" :key="i">
        <p class="leading-normal mb-2 text-left text-md font-bold w-full text-white">{{ player }}</p>
        <CardContainer isStacked class="w-full sm:w-2/3 mx-auto" :cards="hands[i]" />
      </div>
    </div>

    <div class="flex max-w-2/3 mx-auto items-center justify-item-center my-auto">
      <div class="inline-block mr-2 mt-2">
        <button type="button" class="btn bg-purple-500 hover:bg-purple-600" @click="dealCards">Deal cards</button>
      </div>
      <div class="inline-block mr-2 mt-2">
        <button type="button" class="btn bg-green-500 hover:bg-green-600" @click="getWinner">Get winner</button>
      </div>
    </div>

    <div class="container h-auto mt-auto">
      <Footer />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';

import Footer from '/@/components/Footer.vue';
import CardContainer from '/@/components/CardsContainer.vue';
import SlideLeftTransition from '/@/ui/transitions/SlideLeftTransition.vue';
import FadeTransition from '/@/ui/transitions/FadeTransition.vue';
import { useHandScore } from '/@/composables/useHandScore';

export default defineComponent({
  name: 'Home',
  components: { Footer, CardContainer, SlideLeftTransition, FadeTransition },
  setup() {
    const { compareHands, distribute, start } = useHandScore();
    const hands: Ref<string[]> = ref([]);
    const players: Ref<string[]> = ref(['Bob', 'Alice']);
    const winner: Ref<string | null> = ref(null);
    const handDescription: Ref<string | null> = ref(null);
    const HAND_CARD_COUNT = 5;

    const result = computed(() => (winner.value && winner.value === 'Tie' ? "It's a Tie !" : `${winner.value} wins!`));

    const dealCards = () => {
      winner.value = null;
      handDescription.value = null;
      start(players.value)
      hands.value = distribute(HAND_CARD_COUNT, 2);
    };

    const getWinner = () => {
      const msg = compareHands(hands.value, players.value);
      const [winnerName, handDesc] = msg.split('wins. - with');
      winner.value = winnerName as string;
      handDescription.value = handDesc as string;
    };

    return { dealCards, getWinner, hands, winner, players, handDescription, result };
  },
});
</script>
<style scoped>
.card-hand {
  @apply my-4 container min-h-30 sm:min-h-60 flex flex-col items-center p-2 sm:p-8 sm:pt-2 bg-green-900 border-2 border-yellow-900 dark:border-indigo-900 rounded-lg;
}
.btn {
  @apply focus:outline-none text-white text-sm py-2.5 px-5 rounded-md flex items-center hover:shadow-lg;
}
</style>
