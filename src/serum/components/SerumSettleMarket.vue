<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk">
      </BrickConfigInput>
      <BrickConfigInput v-if="brick.protocolId === 1" id="mangoAccNr" name="Mango account">
        <input type="number" id="mangoAccNr" v-model="payload.mangoAccNr">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>{{ desc }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { Method } from 'axios';
import {
  addOrModifyConfiguredBrick,
  getPayloadsByBrickId,
} from '@/common/common.state';
import { getAction } from '@/common/common.protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import {
  IMangoDEXMarketSettleParams,
  ISerumDEXMarketSettleParams,
} from '../../../../dbricks-lib';

export type SettleParams = ISerumDEXMarketSettleParams | IMangoDEXMarketSettleParams;

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
    const payload = reactive<SettleParams>(existingPayload
      ? existingPayload.payload as SettleParams
      : {
        marketPk: '3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc',
        ownerPk: '', // filled in during signing
        mangoAccNr: 0,
      } as SettleParams);

    const desc = computed(() => `Settle market ${payload.marketPk.substring(0, 5)}..`);

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
