<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPubkey">
      </BrickConfigInput>
      <BrickConfigInput v-if="brick.protocol === Protocol.Mango" id="mangoAccountNumber" name="Mango account">
        <input type="text" id="mangoAccountNumber" v-model="payload.mangoAccountNumber">
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>{{ description }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import {
  IMangoDEXMarketSettleArgs,
  ISerumDEXMarketSettleArgs,
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

export type SettleArgs = ISerumDEXMarketSettleArgs | IMangoDEXMarketSettleArgs;

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
    const payload = reactive<SettleArgs>(existingPayload
      ? existingPayload as SettleArgs
      : {
        marketPubkey: '3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc',
        mangoAccountNumber: '0',
      } as SettleArgs);

    const description = computed(() => `Settle market ${payload.marketPubkey.substring(0, 5)}..`);

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
      Protocol,
    };
  },
});
</script>

<style scoped>
</style>
