<template>
  <div class="cover">
    <p>(✖﹏✖)</p>
    <p>Ouch, looks like you're on mobile.</p>
    <p>Currently desktop only.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {

    };
  },
});
</script>

<style scoped>
.cover {
  @apply bg-black h-screen w-full flex flex-col justify-center align-middle text-center;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
