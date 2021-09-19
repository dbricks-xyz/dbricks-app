<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>Settle market {{ payload.marketPk }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Method } from 'axios';
import { IDEXMarketSettleParams } from 'dbricks-lib';
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
    const payload = reactive<IDEXMarketSettleParams>({
      marketPk: 'Qj1oaPL5Yeq3goibk726PoL3mRK2dSvhmxaHWo4bxrZ',
      ownerPk: '', // filled in during signing
    });
    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        desc: `Settle market ${payload.marketPk}`,
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
