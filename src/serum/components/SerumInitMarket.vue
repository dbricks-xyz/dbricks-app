<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="base" name="Base mint">
        <input type="text" id="base" v-model="payload.baseMintPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="quote" name="Quote mint">
        <input type="text" id="quote" v-model="payload.quoteMintPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="lotSize" name="Lot size">
        <input type="text" id="lotSize" v-model="payload.lotSize">
      </BrickConfigInput>
      <BrickConfigInput id="tickSize" name="Tick size">
        <input type="text" id="tickSize" v-model="payload.tickSize">
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
  IMangoDEXMarketInitArgs,
  ISerumDEXMarketInitArgs,
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

type InitArgs = ISerumDEXMarketInitArgs | IMangoDEXMarketInitArgs;

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
    const payload = reactive<InitArgs>(existingPayload
      ? existingPayload as InitArgs
      : {
        baseMintPubkey: 'G7gDxt4kgYi4gqjEZueWQXGviD1mJnED2oGk2tLKsjv7',
        quoteMintPubkey: '72fQHRenCAmYarsqzpXRgoBrJMAtX8YRtRaRU3sBHbUy',
        lotSize: '1',
        tickSize: '1',
      } as InitArgs);

    // todo factor out https://stackoverflow.com/questions/69295518/vue3-how-to-factor-out-a-watch-statement-in-composition-api
    const base = ref<string>('');
    const quote = ref<string>('');
    watch(() => payload.baseMintPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        base.value = await prettifyMint(payload.baseMintPubkey);
      }
    });
    watch(() => payload.quoteMintPubkey, async (newVal) => {
      if (newVal.length >= 32) {
        quote.value = await prettifyMint(payload.quoteMintPubkey);
      }
    });
    prettifyMint(payload.baseMintPubkey)
      .then((m) => {
        base.value = m;
      });
    prettifyMint(payload.quoteMintPubkey)
      .then((m) => {
        quote.value = m;
      });

    const description = computed(() => `Init market for ${base.value} / ${quote.value}`);

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
</style>
