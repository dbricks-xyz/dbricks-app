<template>
  <div class="checkbox-holder">
    <slot></slot>
    <label class="m-0" :for="id">{{ name }}</label>
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
.checkbox-holder {
  @apply flex flex-row justify-center align-middle mt-1;
}
</style>
