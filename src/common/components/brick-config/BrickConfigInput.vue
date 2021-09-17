<template>
  <div class="input-holder">
    <label class="mr-2" :for="id">{{ name }}</label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: String,
    name: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.input-holder {
  @apply flex justify-center align-middle mt-1;
}
</style>
