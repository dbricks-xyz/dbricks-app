<template>
  <div v-if="showFull">
    <form @submit.prevent="emitEndEdit" class="flex flex-col justify-center">
      <slot name="full"></slot>
      <div class="pt-2">
        <Button size="small">DONE</Button>
      </div>
    </form>
  </div>
  <div v-else>
    <slot name="short"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/common/components/primitive/Button.vue';

export default defineComponent({
  components: {
    Button,
  },
  props: {
    showFull: Boolean,
  },
  emits: ['end-edit'],
  setup(props, context) {
    const emitEndEdit = () => {
      context.emit('end-edit');
    };
    return {
      emitEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
