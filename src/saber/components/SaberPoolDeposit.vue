<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="swapPubkey" name="Swap Pubkey">
        <input type="text" id="swapPubkey" v-model="payload.swapPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="tokenAmountA" name="Token A Amount">
        <input type="text" id="tokenAmountA" v-model="payload.tokenAmountA">
      </BrickConfigInput>
      <BrickConfigInput id="tokenAmountB" name="Token B Amount">
        <input type="text" id="tokenAmountB" v-model="payload.tokenAmountB">
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
  ISaberPoolDepositArgs,
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
    const payload = reactive<ISaberPoolDepositArgs>(existingPayload
      ? existingPayload as ISaberPoolDepositArgs
      : {
        swapPubkey: 'YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe',
        tokenAmountA: '0',
        tokenAmountB: '0',
      } as ISaberPoolDepositArgs);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const swapPubkey = ref<string>('');
    watch(() => payload.swapPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        swapPubkey.value = await prettifyMint(payload.swapPubkey);
      }
    });
    prettifyMint(payload.swapPubkey)
      .then((m) => {
        swapPubkey.value = m;
      });

    const description = computed(() => `Deposit ${payload.tokenAmountA} Token A, ${payload.tokenAmountB} Token B`);

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
