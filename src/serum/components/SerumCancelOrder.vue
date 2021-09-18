<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk">
      </BrickConfigInput>
      <BrickConfigInput id="orderId" name="Order ID">
        <input type="text" id="orderId" v-model="payload.orderId">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>Cancel order {{ payload.orderId }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Method } from 'axios';
import { IDEXOrderCancel } from 'dbricks-lib';
import { addOrModifyConfiguredBrick } from '@/common/state';
import { getAction } from '@/common/protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';

export default defineComponent({
  components: {
    BrickConfigInput,
    BrickConfigLayout,
  },
  props: {
    brick: {
      type: Object,
      required: true,
    },
    showFull: Boolean,
  },
  emits: ['end-edit'],
  setup(props, context) {
    const payload = reactive<IDEXOrderCancel>({
      marketPk: 'Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K',
      orderId: 'affffffffffffffff',
      ownerPk: '', // filled in during signing
    });

    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        req: [{
          method: getAction(props.brick.protocolId, props.brick.actionId).method as Method,
          path: getAction(props.brick.protocolId, props.brick.actionId).path,
          payload,
        }],
      });
      context.emit('end-edit');
    };

    return {
      payload,
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
