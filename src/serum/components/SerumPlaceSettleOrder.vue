<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BuySell :side="payload.side" @emit-change="handleChangeSide"/>
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPubkey">
      </BrickConfigInput>
      <BrickConfigInput id="price" name="Price">
        <input type="text" id="price" v-model="payload.price">
      </BrickConfigInput>
      <BrickConfigInput id="size" name="Size">
        <input type="text" id="size" v-model="payload.size">
      </BrickConfigInput>
      <BrickConfigInput v-if="brick.protocol === Protocol.Mango" id="mangoAccountNumber" name="Mango account">
        <input type="text" id="mangoAccountNumber" v-model="payload.mangoAccountNumber">
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
      <!--<BrickConfigCheckbox id="box" name="Attempt to settle">-->
      <!--  <input class="flex-initial m-1" type="checkbox" id="box" v-model="trySettle">-->
      <!--</BrickConfigCheckbox>-->
    </template>
    <template v-slot:short>
      <p>{{description}}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, watch,
} from 'vue';
import {
  IMangoDEXOrderPlaceArgs,
  ISerumDEXOrderPlaceArgs,
  Protocol,
} from '@dbricks/dbricks-ts';
import BuySell from '@/common/components/BuySell.vue';
import {
  addOrModifyConfiguredBrick,
  getArgsByBrickId,
} from '@/common/common.state';
import BrickConfigLayout
  from '@/common/components/brick-config/BrickConfigLayout.vue';
import BrickConfigInput
  from '@/common/components/brick-config/BrickConfigInput.vue';
import BrickConfigRadio
  from '@/common/components/brick-config/BrickConfigRadio.vue';
import BrickConfigCheckbox
  from '@/common/components/brick-config/BrickConfigCheckbox.vue';
import { getMarketMints } from '@/common/common.util';

type PlaceArgs = ISerumDEXOrderPlaceArgs | IMangoDEXOrderPlaceArgs;

export default defineComponent({
  components: {
    // BrickConfigCheckbox,
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
    const existingPlacePayload = getArgsByBrickId(props.brick.id);
    const payload = reactive<PlaceArgs>(existingPlacePayload
      ? existingPlacePayload as PlaceArgs
      : {
        marketPubkey: '3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc',
        side: 'buy',
        price: '0.5',
        size: '1',
        orderType: 'limit',
        mangoAccountNumber: '0', // optional
      } as PlaceArgs);

    const base = ref<string>('');
    const quote = ref<string>('');
    watch(() => payload.marketPubkey, async (newVal) => {
      // solana Pubkeys have min length of 32 - https://docs.solana.com/cli/transfer-tokens#receive-tokens
      if (newVal.length >= 32) {
        [base.value, quote.value] = await getMarketMints(payload.marketPubkey);
      }
    });
    getMarketMints(payload.marketPubkey).then(([b, q]) => {
      [base.value, quote.value] = [b, q];
    });

    // const trySettle = ref<boolean>(true);
    // if (existingPlacePayload && !existingSettlePayload) {
    //   trySettle.value = false;
    // }

    const handleChangeSide = (newSide) => {
      payload.side = newSide;
    };

    const description = computed(() => {
      if (payload.side === 'buy') {
        return `${payload.orderType} ${parseFloat(payload.size) * parseFloat(payload.price)} ${quote.value} --> ${payload.size} ${base.value}`;
      }
      return `${payload.orderType} ${payload.size} ${base.value} --> ${parseFloat(payload.size) * parseFloat(payload.price)} ${quote.value}`;
    });

    // let settleActionId;
    // if (props.brick.protocolId === 0) { // serum
    //   settleActionId = 3;
    // } else if (props.brick.protocolId === 1 && props.brick.actionId === 2) { // mango spot
    //   settleActionId = 4;
    // } else if (props.brick.protocolId === 1 && props.brick.actionId === 5) { // mango perp
    //   settleActionId = 7;
    // } else {
    //   throw new Error('unknown protocol used for placing order');
    // }

    const handleEndEdit = () => {
      // const request: configuredRequest[] = [{
      //   method: getAction(props.brick.protocolId, props.brick.actionId).method as Method,
      //   path: getAction(props.brick.protocolId, props.brick.actionId).path,
      //   payload,
      // }];
      // if (trySettle.value) {
      //   request.push({
      //     method: getAction(props.brick.protocolId, settleActionId).method as Method,
      //     path: getAction(props.brick.protocolId, settleActionId).path,
      //     payload: {
      //       marketPubkey: payload.marketPubkey,
      //       ownerPubkey: '', // filled in during signing
      //     } as SettleArgs,
      //   });
      // }
      addOrModifyConfiguredBrick({
        id: props.brick.id,
        // description: `Place ${trySettle.value ? 'and settle ' : ''}trade: ${description.value} on market ${payload.marketPubkey}`,
        description: `Place trade: ${description.value} on market ${payload.marketPubkey}`,
        protocol: props.brick.protocol,
        action: props.brick.action,
        args: payload,
      });
      context.emit('end-edit');
    };

    return {
      payload,
      // trySettle,
      description,
      handleChangeSide,
      handleEndEdit,
      Protocol,
    };
  },
});
</script>

<style scoped>
</style>
