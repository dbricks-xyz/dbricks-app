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
      <p>Init market for {{payload.baseMintPk.substring(0,5)}}.. / {{payload.quoteMintPk.substring(0,5)}}..</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Method } from 'axios';
import { addOrModifyConfiguredBrick } from '@/common/state';
import { getAction } from '@/common/protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import { IDEXMarketInit } from '@/common/interfaces/dex/common.interfaces.dex.market';

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
    const payload = reactive<IDEXMarketInit>({
      baseMintPk: 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3',
      quoteMintPk: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
      lotSize: '1',
      tickSize: '1',
    });

    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
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
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
