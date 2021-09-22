<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>{{desc}}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { Method } from 'axios';
import {
  IMangoDEXMarketSettleParams,
  ISerumDEXMarketSettleParams,
} from 'dbricks-lib';
import {
  addOrModifyConfiguredBrick,
  getPayloadsByBrickId,
} from '@/common/common.state';
import { getAction } from '@/common/common.protocols';
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
    const existingPayload = getPayloadsByBrickId(props.brick.id)[0];
    const payload = reactive<ISerumDEXMarketSettleParams>(existingPayload
      ? existingPayload.payload as IMangoDEXMarketSettleParams
      : {
        marketPk: 'Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K',
        ownerPk: '', // filled in during signing
      });

    const desc = computed(() => `Settle market ${payload.marketPk}`);

    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        desc: desc.value,
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
      desc,
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
