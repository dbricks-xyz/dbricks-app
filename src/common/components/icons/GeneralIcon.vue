<template>
  <a>
    <svg :class="{disabled:disabled}" xmlns="http://www.w3.org/2000/svg" :height="size ? size: 24" :width="size ? seize : 24" fill="none" viewBox="0 0 24 24">
      <path v-if="icon==='edit'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
      <path v-if="icon==='trash'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      <path v-if="icon==='check'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M5 13l4 4L19 7" />
      <path v-if="icon==='redo'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      <path v-if="icon==='new'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: String,
    disabled: Boolean,
    icon: String,
    size: String,
    stroke: Number,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
svg {
  /*height: 24px;*/
  /*width: 24px;*/
  stroke-width: 1px;
  transition: all .2s ease-in-out;
}

svg:hover {
  filter: drop-shadow(0px 0px 5px ghostwhite);
}

.disabled {
  opacity: 0.2;
}

.disabled:hover {
  filter: drop-shadow(0px 0px 0px black);
  @apply cursor-default;
}

</style>
