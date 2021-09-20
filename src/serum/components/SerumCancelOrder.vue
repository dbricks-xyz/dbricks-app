<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk">
      </BrickConfigInput>
      <BrickConfigCheckbox id="box" name="Cancell all orders" >
        <input id="box" type="checkbox" class="flex-initial m-1" v-model="cancelAll">
      </BrickConfigCheckbox>
      <BrickConfigInput v-if="!cancelAll" id="orderId" name="Order ID">
        <input type="text" id="orderId" v-model="payload.orderId">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p v-if="cancelAll">Cancel all orders</p>
      <p v-else>Cancel order {{ payload.orderId }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, watch,
} from 'vue';
import { Method } from 'axios';
import { ISerumDEXOrderCancelParams } from 'dbricks-lib';
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
    const payload = reactive<ISerumDEXOrderCancelParams>(existingPayload
      ? existingPayload.payload as ISerumDEXOrderCancelParams
      : {
        marketPk: 'Qj1oaPL5Yeq3goibk726PoL3mRK2dSvhmxaHWo4bxrZ',
        orderId: 'affffffffffffffff',
        ownerPk: '', // filled in during signing
      });

    const cancelAll = ref(false);
    watch(cancelAll, (newValue) => {
      if (newValue) {
        console.log(newValue);
        payload.orderId = '';
      }
    });

    const handleEndEdit = () => {
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        desc: payload.orderId ? `Cancel order ${payload.orderId}` : 'Cancel all outstanding orders',
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
      cancelAll,
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
