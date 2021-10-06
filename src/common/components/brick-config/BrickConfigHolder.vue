<template>
  <div class="holder">
    <div class="flex justify-center align-middle pb-5">
      <ProtocolLogo :size="24" :protocol="brick.protocol" class="mr-2"/>
      <p class="mr-2">{{ brick.protocol }} - {{ brick.action }}</p>
      <GeneralIcon icon="edit" color="white" @click="emitStartEdit" class="mr-2" :disabled="showFull"/>
      <GeneralIcon icon="trash" color="white" @click="emitRemoveBrick"/>
    </div>

    <!--serum-->
    <div v-if="brick.protocol===Protocol.Serum && brick.action===Action.Serum.PlaceOrder">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Serum && brick.action===Action.Serum.CancelOrder">
      <SerumCancelOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Serum && brick.action===Action.Serum.InitMarket">
      <SerumInitMarket :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Serum && brick.action===Action.Serum.SettleMarket">
      <SerumSettleMarket :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>

    <!--mango-->
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.Deposit">
      <MangoDeposit :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.Withdraw">
      <MangoWithdraw :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.PlaceSpotOrder">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.CancelSpotOrder">
      <SerumCancelOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.SettleSpotMarket">
      <SerumSettleMarket :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.PlacePerpOrder">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.CancelPerpOrder">
      <SerumCancelOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Mango && brick.action===Action.Mango.SettlePerpMarket">
      <SerumSettleMarket :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>

    <!-- solend -->
    <div v-else-if="brick.protocol===Protocol.Solend && brick.action===Action.Solend.Deposit">
      <MangoDeposit :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Solend && brick.action===Action.Solend.Withdraw">
      <MangoWithdraw :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Solend && brick.action===Action.Solend.Borrow">
      <MangoWithdraw :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocol===Protocol.Solend && brick.action===Action.Solend.Repay">
      <MangoWithdraw :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Protocol, Action } from '@dbricks/dbricks-ts';
import ProtocolLogo from '@/common/components/ProtocolLogo.vue';
import SerumPlaceSettleOrder
  from '@/serum/components/SerumPlaceSettleOrder.vue';
import GeneralIcon from '@/common/components/icons/GeneralIcon.vue';
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
      emitStartEdit,
      emitEndEdit,
      emitRemoveBrick,
      Protocol,
      Action,
    };
  },
});
</script>

<style scoped>
.holder {
  @apply bg-black p-5 text-center;
}
</style>
