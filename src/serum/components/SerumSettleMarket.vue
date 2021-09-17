<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketName">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>Settle market {{ payload.marketName }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Method } from 'axios';
import { addOrModifyConfiguredBrick } from '@/common/state';
import { getAction } from '@/common/protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import { IDEXMarketSettle } from '../../common/interfaces/dex/common.interfaces.dex.market';

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
    const payload = reactive<IDEXMarketSettle>({
      marketName: 'ATLAS/USDC',
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
