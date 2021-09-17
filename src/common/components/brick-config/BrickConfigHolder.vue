<template>
  <div class="holder">
    <div class="flex justify-center align-middle pb-5">
      <ProtocolLogo :size="24" :protocol-id="brick.protocolId" class="mr-2"/>
      <p class="mr-2">{{ protocol.name }} - {{ action.name }}</p>
      <GeneralIcon icon="edit" color="white" @click="emitStartEdit" class="mr-2" :disabled="showFull"/>
      <GeneralIcon icon="trash" color="white" @click="emitRemoveBrick"/>
    </div>

    <div v-if="brick.protocolId===0 && brick.actionId===0">
      <SerumPlaceSettleOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>
    <div v-else-if="brick.protocolId===0 && brick.actionId===1">
      <SerumCancelOrder :brick="brick" :show-full="showFull" @end-edit="emitEndEdit"/>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProtocolLogo from '@/common/components/ProtocolLogo.vue';
import SerumPlaceSettleOrder from '@/serum/components/SerumPlaceSettleOrder.vue';
import GeneralIcon from '@/common/components/icons/GeneralIcon.vue';
import { getAction, getProtocol } from '@/common/protocols';
import { removeConfiguredBrick } from '@/common/state';
import SerumCancelOrder from '@/serum/components/SerumCancelOrder.vue';

export default defineComponent({
  components: {
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
  },
  emits: ['start-edit', 'end-edit', 'remove-brick'],
  setup(props, context) {
    const showFull = ref(true);
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
