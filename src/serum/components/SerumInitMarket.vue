<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="base" name="Base mint">
        <input type="text" id="base" v-model="payload.baseMintPk">
      </BrickConfigInput>
      <BrickConfigInput id="quote" name="Quote mint">
        <input type="text" id="quote" v-model="payload.quoteMintPk">
      </BrickConfigInput>
      <BrickConfigInput id="lotSize" name="Lot size">
        <input type="text" id="lotSize" v-model="payload.lotSize">
      </BrickConfigInput>
      <BrickConfigInput id="tickSize" name="Tick size">
        <input type="text" id="tickSize" v-model="payload.tickSize">
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
  addOrModifyConfiguredBrick,
  getPayloadsByBrickId,
} from '@/common/common.state';
import { getAction } from '@/common/common.protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import { prettifyMint } from '@/common/common.util';
import {
  IMangoDEXMarketInitParams,
  ISerumDEXMarketInitParams,
} from '../../../../dbricks-lib';

type InitParams = ISerumDEXMarketInitParams | IMangoDEXMarketInitParams;

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
    const payload = reactive<InitParams>(existingPayload
      ? existingPayload.payload as InitParams
      : {
        baseMintPk: 'G7gDxt4kgYi4gqjEZueWQXGviD1mJnED2oGk2tLKsjv7',
        quoteMintPk: '72fQHRenCAmYarsqzpXRgoBrJMAtX8YRtRaRU3sBHbUy',
        lotSize: '1',
        tickSize: '1',
        ownerPk: '', // filled in during signing
      } as InitParams);

    const desc = computed(() => `Init market for ${prettifyMint(payload.baseMintPk)} / ${prettifyMint(payload.quoteMintPk)}`);

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
