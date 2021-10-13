<template>
  <a>
    <svg v-if="icon==='github'" :width="size" :height="size" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <path :fill="color ? color : 'white'" stroke-width="0" fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)"/>
    </svg>
    <svg v-else :class="{disabled:disabled}" xmlns="http://www.w3.org/2000/svg" :height="size ? size: 24" :width="size ? size : 24" fill="none" viewBox="0 0 24 24">
      <path v-if="icon==='edit'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
      <path v-if="icon==='trash'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      <path v-if="icon==='check'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M5 13l4 4L19 7"/>
      <path v-if="icon==='redo'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      <path v-if="icon==='new'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
      <path v-if="icon==='left'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
      <path v-if="icon==='right'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
      <path v-if="icon==='mail'" :stroke="color ? color : 'white'" stroke-linecap="butt" :stroke-width="stroke" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
      <path :fill="color ? color : 'white'" fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)"/>
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
    stroke: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
svg {
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
