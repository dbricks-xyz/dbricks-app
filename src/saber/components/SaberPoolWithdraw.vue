<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="swapPubkey" name="Swap Pubkey">
        <input type="text" id="swapPubkey" v-model="payload.swapPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="poolTokenAmount" name="Pool Token Amount">
        <input type="text" id="poolTokenAmount" v-model="payload.poolTokenAmount">
      </BrickConfigInput>
      <BrickConfigInput id="withdrawMintPubkey" name="Withdraw Mint Pubkey">
        <input type="text" id="withdrawMintPubkey" v-model="payload.withdrawMintPubkey">
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
import {
  ISaberPoolWithdrawArgs,
} from '@dbricks/dbricks-ts';
import {
  addOrModifyConfiguredBrick,
  getArgsByBrickId,
} from '@/common/common.state';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import { prettifyMint } from '@/common/common.util';

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
    const existingPayload = getArgsByBrickId(props.brick.id);
    const payload = reactive<ISaberPoolWithdrawArgs>(existingPayload
      ? existingPayload as ISaberPoolWithdrawArgs
      : {
        swapPubkey: 'YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe',
        poolTokenAmount: '0',
        withdrawMintPubkey: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      } as ISaberPoolWithdrawArgs);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const swapPubkey = ref<string>('');
    const withdrawMintPubkey = ref<string>('');
    watch(() => payload.swapPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        swapPubkey.value = await prettifyMint(payload.swapPubkey);
      }
    });
    watch(() => payload.withdrawMintPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        withdrawMintPubkey.value = await prettifyMint(payload.withdrawMintPubkey);
      }
    });
    prettifyMint(payload.swapPubkey)
      .then((m) => {
        swapPubkey.value = m;
      });
    prettifyMint(payload.withdrawMintPubkey)
      .then((m) => {
        withdrawMintPubkey.value = m;
      });

    const description = computed(() => `Withdraw ${payload.withdrawMintPubkey} using ${payload.poolTokenAmount} LP tokens`);

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
    };
  },
});
</script>

<style scoped>
</style>;
