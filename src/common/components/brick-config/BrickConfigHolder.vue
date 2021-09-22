<template>
  <div class="holder">
    <div class="flex justify-center align-middle pb-5">
      <ProtocolLogo :size="24" :protocol-id="brick.protocolId" class="mr-2"/>
      <p class="mr-2">{{ protocol.name }} - {{ action.name }}</p>
      <GeneralIcon icon="edit" color="white" @click="emitStartEdit" class="mr-2" :disabled="showFull"/>
      <GeneralIcon icon="trash" color="white" @click="emitRemoveBrick"/>
    </div>

    <!--serum-->
    <div v-if="brick.protocolId===0 && brick.actionId===0">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===0 && brick.actionId===1">
      <SerumCancelOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===0 && brick.actionId===2">
      <SerumInitMarket :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===0 && brick.actionId===3">
      <SerumSettleMarket :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>

    <!--mango-->
    <div v-else-if="brick.protocolId===1 && brick.actionId===0">
      <MangoDeposit :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===1 && brick.actionId===1">
      <MangoWithdraw :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===1 && brick.actionId===2">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===1 && brick.actionId===5">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProtocolLogo from '@/common/components/ProtocolLogo.vue';
import SerumPlaceSettleOrder
  from '@/serum/components/SerumPlaceSettleOrder.vue';
import GeneralIcon from '@/common/components/icons/GeneralIcon.vue';
import { getAction, getProtocol } from '@/common/common.protocols';
import { removeConfiguredBrick } from '@/common/common.state';
import SerumCancelOrder from '@/serum/components/SerumCancelOrder.vue';
import SerumInitMarket from '@/serum/components/SerumInitMarket.vue';
import SerumSettleMarket from '@/serum/components/SerumSettleMarket.vue';
import MangoDeposit from '@/mango/components/MangoDeposit.vue';
import MangoWithdraw from '@/mango/components/MangoWithdraw.vue';

export default defineComponent({
  components: {
    MangoWithdraw,
    MangoDeposit,
    SerumSettleMarket,
    SerumInitMarket,
    SerumCancelOrder,
    GeneralIcon,
    SerumPlaceSettleOrder,
    ProtocolLogo,
  },
  props: {
    brick: {
      type: Object,
      required: true,
    },
    fresh: Boolean,
  },
  created() {
    // this ensures that on re-do blocks don't appear open
    if (this.fresh) {
      this.showFull = true;
    }
  },
  emits: ['start-edit', 'end-edit', 'remove-brick'],
  setup(props, context) {
    const showFull = ref(false);

    const protocol = getProtocol(props.brick.protocolId);
    const action = getAction(protocol.id, props.brick.actionId);

    const emitStartEdit = () => {
      showFull.value = true;
      context.emit('start-edit', {
        brickId: props.brick.id,
      });
    };

    const emitEndEdit = () => {
      showFull.value = false;
      context.emit('end-edit', {
        brickId: props.brick.id,
      });
    };

    const emitRemoveBrick = () => {
      removeConfiguredBrick(props.brick.id);
      context.emit('remove-brick', {
        brickId: props.brick.id,
      });
    };

    return {
      showFull,
      protocol,
      action,
      emitStartEdit,
      emitEndEdit,
      emitRemoveBrick,
    };
  },
});
</script>

<style scoped>
.holder {
  @apply bg-black p-5 text-center;
}
</style>
