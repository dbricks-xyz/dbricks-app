<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="swapPubkey" name="Swap Account">
        <input type="text" id="swapPubkey" v-model="payload.swapPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="payingMintPubkey" name="Pay Mint">
        <input type="text" id="payingMintPubkey" v-model="payload.payingMintPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="swapAmount" name="Amount">
        <input type="text" id="swapAmount" v-model="payload.swapAmount">
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
  ISaberSwapArgs,
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
    const payload = reactive<ISaberSwapArgs>(existingPayload
      ? existingPayload as ISaberSwapArgs
      : {
        swapPubkey: 'YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe',
        payingMintPubkey: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        swapAmount: '0.1',
      } as ISaberSwapArgs);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const payingMintPubkey = ref<string>('');
    const swapPubkey = ref<string>('');
    watch(() => payload.swapPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        swapPubkey.value = await prettifyMint(payload.swapPubkey);
      }
    });
    watch(() => payload.payingMintPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        payingMintPubkey.value = await prettifyMint(payload.payingMintPubkey);
      }
    });
    prettifyMint(payload.swapPubkey)
      .then((m) => {
        swapPubkey.value = m;
      });
    prettifyMint(payload.payingMintPubkey)
      .then((m) => {
        payingMintPubkey.value = m;
      });

    const description = computed(() => `Swap ${payingMintPubkey.value} in ${swapPubkey.value} pool`);

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
