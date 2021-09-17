<template>
  <div class="radio-holder">
    <div class="inline flex-shrink" v-for="o in options.split(',')" :key="shorten(o)">
      <slot :name="shorten(o)"></slot>
      <label class="mr-2" :for="shorten(o)">{{o}}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    options: String,
  },
  setup() {
    const shorten = (str:string):string => str.replace(/\s/g, '');
    return {
      shorten,
    };
  },
});
</script>

<style scoped>
.radio-holder {
  @apply flex flex-row justify-center align-middle mt-1;
}
</style>
