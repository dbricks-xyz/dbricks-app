<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BuySell @emit-change="handleChangeSide"/>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk">
      </BrickConfigInput>
      <BrickConfigInput id="price" name="Price">
        <input type="text" id="price" v-model="payload.price">
      </BrickConfigInput>
      <BrickConfigInput id="size" name="Size">
        <input type="text" id="size" v-model="payload.size">
      </BrickConfigInput>
      <BrickConfigRadio options="IOC,Limit,Post only">
        <template v-slot:IOC>
          <input type="radio" id="IOC" value="ioc" v-model="payload.orderType">
        </template>
        <template v-slot:Limit>
          <input type="radio" id="Limit" value="limit" v-model="payload.orderType">
        </template>
        <template v-slot:Postonly>
          <input type="radio" id="Postonly" value="postOnly" v-model="payload.orderType">
        </template>
      </BrickConfigRadio>
      <BrickConfigCheckbox id="box" name="Attempt to settle">
        <input class="flex-initial m-1" type="checkbox" id="box" v-model="trySettle">
      </BrickConfigCheckbox>
    </template>
    <template v-slot:short>
      <div v-if="payload.side === 'buy'">
        <p>{{ payload.orderType }} {{ payload.size * payload.price }} {{ quote }} --> {{ payload.size }} {{ base }}</p>
      </div>
      <div v-else>
        <p>{{ payload.orderType }} {{ payload.size }} {{ base }} --> {{ payload.size * payload.price }} {{ quote }}</p>
      </div>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, watch,
} from 'vue';
import { Method } from 'axios';
import { IDEXMarketSettle, IDEXOrderPlace } from 'dbricks-lib';
import BuySell from '@/common/components/BuySell.vue';
import { addOrModifyConfiguredBrick } from '@/common/state';
import { getAction } from '@/common/protocols';
import { IConfiguredRequest } from '@/common/interfaces/common.interfaces';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import BrickConfigRadio
  from '@/common/components/brick-config/BrickConfigRadio.vue';
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';
import SDK from '@/dbricks-sdk/sdk.index';

export default defineComponent({
  components: {
    BrickConfigCheckbox,
    BrickConfigRadio,
    BrickConfigInput,
    BrickConfigLayout,
    BuySell,
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
    const payload = reactive<IDEXOrderPlace>({
      marketPk: 'Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K',
      side: 'buy',
      price: '0.2',
      size: '1',
      orderType: 'ioc',
      ownerPk: '', // filled in during signing
    });
    const base = ref<string>('');
    const quote = ref<string>('');

    const updateBaseQuote = async () => {
      [base.value, quote.value] = await (new SDK()).getBaseQuote(payload.marketPk);
    };
    updateBaseQuote();
    watch(payload, updateBaseQuote);

    const trySettle = ref<boolean>(true);

    const handleChangeSide = (newSide) => {
      payload.side = newSide;
    };

    const handleEndEdit = () => {
      const req: IConfiguredRequest[] = [{
        method: getAction(props.brick.protocolId, props.brick.actionId).method as Method,
        path: getAction(props.brick.protocolId, props.brick.actionId).path,
        payload,
      }];
      if (trySettle.value) {
        req.push({
          method: getAction(props.brick.protocolId, 3).method as Method,
          path: getAction(props.brick.protocolId, 3).path,
          payload: {
            marketPk: payload.marketPk,
            ownerPk: '', // filled in during signing
          } as IDEXMarketSettle,
        });
      }
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        req,
      });
      context.emit('end-edit');
    };

    return {
      payload,
      base,
      quote,
      trySettle,
      handleChangeSide,
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
