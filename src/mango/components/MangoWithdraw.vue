<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="mint" name="Mint">
        <input type="text" id="mint" v-model="payload.mintPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="amount" name="Amount">
        <input type="text" id="amount" v-model="payload.quantity">
      </BrickConfigInput>
      <BrickConfigCheckbox id="box" name="Borrow?">
        <input class="flex-initial m-1" type="checkbox" id="box" v-model="payload.isBorrow">
      </BrickConfigCheckbox>
      <BrickConfigInput v-if="brick.protocol === Protocol.Mango" id="mangoAccountNumber" name="Mango account">
        <input type="text" id="mangoAccountNumber" v-model="payload.mangoAccountNumber">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>{{ description }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, watch,
} from 'vue';
import { IMangoLenderWithdrawArgs, Protocol } from '@dbricks/dbricks-ts';
import {
  addOrModifyConfiguredBrick,
  getArgsByBrickId,
} from '@/common/common.state';
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
    const existingPayload = getArgsByBrickId(props.brick.id);
    const payload = reactive<IMangoLenderWithdrawArgs>(existingPayload
      ? existingPayload as IMangoLenderWithdrawArgs
      : {
        mintPubkey: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        quantity: '0.1',
        isBorrow: false,
        mangoAccountNumber: '0',
      } as IMangoLenderWithdrawArgs);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const mint = ref<string>('');
    watch(() => payload.mintPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        mint.value = await prettifyMint(payload.mintPubkey);
      }
    });
    prettifyMint(payload.mintPubkey)
      .then((m) => {
        mint.value = m;
      });

    const description = computed(() => `Withdraw ${payload.quantity} ${mint.value}`);

    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        description: description.value,
        protocol: props.brick.protocol,
        action: props.brick.action,
        args: payload,
      });
      context.emit('end-edit');
    };

    return {
      payload,
      description,
      handleEndEdit,
      Protocol,
    };
  },
});
</script>

<style scoped>
</style>
