<template>
  <div class="flex">
    <a class="switch flex-grow" :class="{'buy-active': buyActive}" @click="emitBuy">BUY</a>
    <a class="switch flex-grow" :class="{'sell-active': !buyActive}" @click="emitSell">SELL</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    side: String,
  },
  emits: ['emit-change'],
  setup(props, context) {
    const buyActive = ref<boolean>(true);
    if (props.side === 'sell') {
      buyActive.value = false;
    }

    const emitBuy = () => {
      buyActive.value = true;
      context.emit('emit-change', 'buy');
    };

    const emitSell = () => {
      buyActive.value = false;
      context.emit('emit-change', 'sell');
    };

    return {
      buyActive,
      emitBuy,
      emitSell,
    };
  },
});
</script>

<style scoped>
.switch {
  @apply border border-gray-500 border-solid text-white text-center p-1;
}
.buy-active {
  @apply bg-db-cyan text-black;
}
.sell-active {
  @apply bg-db-purple text-white;
}

</style>
