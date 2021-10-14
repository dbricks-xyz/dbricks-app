<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="poolMintPubkey" name="Pool Mint Pubkey">
        <input type="text" id="poolMintPubkey" v-model="payload.poolMintPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="amount" name="Amount">
        <input type="text" id="amount" v-model="payload.amount">
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
  ISaberFarmArgs,
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
    const payload = reactive<ISaberFarmArgs>(existingPayload
      ? existingPayload as ISaberFarmArgs
      : {
        poolMintPubkey: 'YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe',
        amount: '0',
      } as ISaberFarmArgs);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const poolMintPubkey = ref<string>('');
    watch(() => payload.poolMintPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        poolMintPubkey.value = await prettifyMint(payload.poolMintPubkey);
      }
    });
    prettifyMint(payload.poolMintPubkey)
      .then((m) => {
        poolMintPubkey.value = m;
      });
    const description = computed(() => `Deposit ${payload.amount} LP tokens from ${poolMintPubkey.value} to farming.`);

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
