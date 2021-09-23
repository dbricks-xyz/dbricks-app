<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="mint" name="Mint">
        <input type="text" id="mint" v-model="payload.mintPk">
      </BrickConfigInput>
      <BrickConfigInput id="amount" name="Amount">
        <input type="text" id="amount" v-model="payload.quantity">
      </BrickConfigInput>
      <BrickConfigCheckbox id="box" name="Borrow?">
        <input class="flex-initial m-1" type="checkbox" id="box" v-model="payload.isBorrow">
      </BrickConfigCheckbox>
      <BrickConfigInput id="mangoAccNr" name="Mango account">
        <input type="number" id="mangoAccNr" v-model="payload.mangoAccNr">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>{{ desc }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, watch,
} from 'vue';
import { Method } from 'axios';
import { IMangoLenderWithdrawParams } from 'dbricks-lib';
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
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';

export default defineComponent({
  components: {
    BrickConfigInput,
    BrickConfigLayout,
    BrickConfigCheckbox,
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
    const payload = reactive<IMangoLenderWithdrawParams>(existingPayload
      ? existingPayload.payload as IMangoLenderWithdrawParams
      : {
        mintPk: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        quantity: '0.1',
        isBorrow: false,
        ownerPk: '', // filled in during signing
        mangoAccNr: 0,
      } as IMangoLenderWithdrawParams);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const mint = ref<string>('');
    watch(() => payload.mintPk, async (newVal) => {
      if (newVal.length >= 32) {
        mint.value = await prettifyMint(payload.mintPk);
      }
    });
    prettifyMint(payload.mintPk)
      .then((m) => {
        mint.value = m;
      });

    const desc = computed(() => `Withdraw ${payload.quantity} ${mint.value} from Mango`);

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
