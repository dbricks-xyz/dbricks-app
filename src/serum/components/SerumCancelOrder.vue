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
      <BrickConfigInput v-if="brick.protocol === Protocol.Mango && !cancelAll" id="mangoAccountNumber" name="Mango account">
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
import {
  IMangoDEXOrderCancelArgs,
  ISerumDEXOrderCancelArgs,
  Protocol,
} from '@dbricks/dbricks-ts';
import {
  addOrModifyConfiguredBrick,
  getArgsByBrickId,
} from '@/common/common.state';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';

type CancelArgs = ISerumDEXOrderCancelArgs | IMangoDEXOrderCancelArgs;

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
    const existingPayload = getArgsByBrickId(props.brick.id);
    const payload = reactive<CancelArgs>(existingPayload
      ? existingPayload as CancelArgs
      : {
        marketPubkey: '3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc',
        orderId: 'affffffffffffffff',
        mangoAccountNumber: '0',
      } as CancelArgs);

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
        protocol: props.brick.protocol,
        action: props.brick.action,
        args: payload,
      });
      context.emit('end-edit');
    };

    return {
      payload,
      cancelAll,
      description,
      handleEndEdit,
      Protocol,
    };
  },
});
</script>

<style scoped>
</style>
