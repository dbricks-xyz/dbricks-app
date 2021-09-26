<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <!-- <BuySell :side="payload.side" @emit-change="handleChangeSide" /> -->
      <!-- <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk" />
      </BrickConfigInput> -->
      <BrickConfigInput id="buyAsset" name="Buy Asset">
        <input type="text" id="buyAsset" v-model="payload.buyAsset" />
      </BrickConfigInput>
      <BrickConfigInput id="sellAsset" name="Sell Asset">
        <input type="text" id="sellAsset" v-model="payload.sellAsset" />
      </BrickConfigInput>
      <BrickConfigInput id="price" name="Price (denom in sell asset)">
        <input type="text" id="price" v-model="payload.price" />
      </BrickConfigInput>
      <BrickConfigInput id="size" name="Size">
        <input type="text" id="size" v-model="payload.size" />
      </BrickConfigInput>
    </template>
    <template v-slot:short>
      <p>{{ desc }}</p>
    </template>
  </BrickConfigLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IMangoDEXOrderPlaceParams,
  ISerumDEXOrderPlaceParams,
} from "dbricks-lib";
import BuySell from "@/common/components/BuySell.vue";
import BrickConfigLayout from "@/common/components/brick-config/BrickConfigLayout.vue";
import BrickConfigInput from "@/common/components/brick-config/BrickConfigInput.vue";
import BrickConfigRadio from "@/common/components/brick-config/BrickConfigRadio.vue";
import BrickConfigCheckbox from "@/common/components/brick-config/BrickConfigCheckbox.vue";

type PlaceParams = ISerumDEXOrderPlaceParams | IMangoDEXOrderPlaceParams;

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
  emits: ["end-edit"],
  setup(props, context) {
    const payload = {
      marketPk: "3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc",
      side: "buy",
      price: "0.5",
      size: "1",
      orderType: "limit",
      ownerPk: "", // filled in during signing
      sellAsset: 'USDC',
      buyAsset: 'SOL',
    } as PlaceParams;

    // TODO:
    return {
      payload,
      desc: true,
      // trySettle: true,
      handleChangeSide: () => null,
      handleEndEdit: () => null,
    };
  },
});
</script>

<style scoped></style>
