<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="mint" name="Mint">
        <input type="text" id="mint" v-model="payload.mintPk">
      </BrickConfigInput>
      <BrickConfigInput id="amount" name="Amount">
        <input type="text" id="amount" v-model="payload.quantity">
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
import { IMangoLenderDepositParams } from 'dbricks-lib';
import {
  addOrModifyConfiguredBrick,
  getPayloadsByBrickId,
} from '@/common/common.state';
import { getAction } from '@/common/common.protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import { shortenPk } from '@/common/common.util';

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
    const payload = reactive<IMangoLenderDepositParams>(existingPayload
      ? existingPayload.payload as IMangoLenderDepositParams
      : {
        mintPk: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        quantity: '0.1',
        ownerPk: '', // filled in during signing
      });

    const desc = computed(() => `Deposit ${payload.quantity} ${shortenPk(payload.mintPk)} into Mango`);

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
