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
        <p>{{msgBuy}}</p>
      </div>
      <div v-else>
        <p>{{msgSell}}</p>
      </div>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, watch,
} from 'vue';
import { Method } from 'axios';
import {
  configuredRequest,
  ISerumDEXMarketSettleParams,
  ISerumDEXOrderPlaceParams,
} from 'dbricks-lib';
import BuySell from '@/common/components/BuySell.vue';
import {
  addOrModifyConfiguredBrick,
  getPayloadsByBrickId,
} from '@/common/common.state';
import { getAction } from '@/common/common.protocols';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import BrickConfigRadio
  from '@/common/components/brick-config/BrickConfigRadio.vue';
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';
import SerumClient from '@/serum/client/serum.client';
import { COMMITTMENT, CONNECTION_URL } from '@/config/config';

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
    // note there's also a 2nd element inside the array (settle order),
    // but we don't need it as it updates automatically
    const existingPayload = getPayloadsByBrickId(props.brick.id)[0];
    const payload = reactive<ISerumDEXOrderPlaceParams>(existingPayload
      ? existingPayload.payload as ISerumDEXOrderPlaceParams
      : {
        marketPk: 'Qj1oaPL5Yeq3goibk726PoL3mRK2dSvhmxaHWo4bxrZ',
        side: 'buy',
        price: '1',
        size: '10',
        orderType: 'limit',
        ownerPk: '', // filled in during signing
      });
    const base = ref<string>('');
    const quote = ref<string>('');

    const updateBaseQuote = async () => {
      [base.value, quote.value] = await (new SerumClient(CONNECTION_URL, COMMITTMENT)).getBaseQuote(payload.marketPk);
    };
    updateBaseQuote();
    watch(payload, updateBaseQuote);

    const trySettle = ref<boolean>(true);

    const handleChangeSide = (newSide) => {
      payload.side = newSide;
    };

    const msgBuy = computed(() => `${payload.orderType} ${parseFloat(payload.size) * parseFloat(payload.price)} ${quote.value} --> ${payload.size} ${base.value}`);
    const msgSell = computed(() => `${payload.orderType} ${payload.size} ${base.value} --> ${parseFloat(payload.size) * parseFloat(payload.price)} ${quote.value}`);

    const handleEndEdit = () => {
      console.log(payload);
      const req: configuredRequest[] = [{
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
          } as ISerumDEXMarketSettleParams,
        });
      }
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        desc: `Place ${trySettle.value ? 'and settle ' : ''}trade: ${payload.side === 'buy' ? msgBuy.value : msgSell.value} on market ${payload.marketPk}`,
        req,
      });
      context.emit('end-edit');
    };

    return {
      payload,
      base,
      quote,
      trySettle,
      msgBuy,
      msgSell,
      handleChangeSide,
      handleEndEdit,
    };
  },
});
</script>

<style scoped>
</style>
