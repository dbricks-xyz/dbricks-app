<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPubkey">
      </BrickConfigInput>
      <BrickConfigCheckbox id="box" name="Cancell all orders">
        <input id="box" type="checkbox" class="flex-initial m-1" v-model="cancelAll">
      </BrickConfigCheckbox>
      <BrickConfigInput v-if="!cancelAll" id="orderId" name="Order ID">
        <input type="text" id="orderId" v-model="payload.orderId">
      </BrickConfigInput>
      <BrickConfigInput v-if="brick.protocolId === 1 && !cancelAll" id="mangoAccountNumber" name="Mango account">
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
import { Method } from 'axios';
import {
  IMangoDEXOrderCancelParams,
  ISerumDEXOrderCancelParams,
} from 'dbricks-lib';
import {
  addOrModifyConfiguredBrick,
  getPayloadsByBrickId,
} from '@/common/common.state';
import { getAction } from '@/common/common.protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';

type CancelParams = ISerumDEXOrderCancelParams | IMangoDEXOrderCancelParams;

export default defineComponent({
  components: {
    BrickConfigCheckbox,
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
    const payload = reactive<CancelParams>(existingPayload
      ? existingPayload.payload as CancelParams
      : {
        marketPubkey: '3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc',
        orderId: 'affffffffffffffff',
        ownerPubkey: '', // filled in during signing
        mangoAccountNumber: '0',
      } as CancelParams);

    const cancelAll = ref(false);
    watch(cancelAll, (newValue) => {
      if (newValue) {
        console.log(newValue);
        payload.orderId = '';
      }
    });

    const description = computed(() => (payload.orderId ? `Cancel order ${payload.orderId}` : 'Cancel all orders'));

    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        description: description.value,
        request: [{
          method: getAction(props.brick.protocolId, props.brick.actionId).method as Method,
          path: getAction(props.brick.protocolId, props.brick.actionId).path,
          payload,
        }],
      });
      context.emit('end-edit');
    };

    return {
      payload,
      cancelAll,
      description,
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
