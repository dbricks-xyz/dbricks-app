<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BuySell @emit-change="handleChangeSide"/>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketName">
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
import { defineComponent, reactive, ref } from 'vue';
import { Method } from 'axios';
import BuySell from '@/common/components/BuySell.vue';
import {
  IDEXOrderPlace,
} from '@/common/interfaces/dex/common.interfaces.dex.order';
import { addOrModifyConfiguredBrick } from '@/common/state';
import { getAction } from '@/common/protocols';
import { IDEXMarketSettle } from '@/common/interfaces/dex/common.interfaces.dex.market';
import { IConfiguredRequest } from '@/common/interfaces/common.interfaces';
import BrickConfigLayout from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput from '@/common/components/brick-config/BrickConfigInput.vue';
import BrickConfigRadio
  from '@/common/components/brick-config/BrickConfigRadio.vue';
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';

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
      marketName: 'ATLAS/USDC',
      side: 'buy',
      price: '0.2',
      size: '1',
      orderType: 'ioc',
    });
    const base = ref<string>(payload.marketName.split('/')[0]);
    const quote = ref<string>(payload.marketName.split('/')[1]);
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
            marketName: payload.marketName,
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
