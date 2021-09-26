<template>
  <BrickConfigLayout :show-full="showFull" @end-edit="handleEndEdit">
    <template v-slot:full>
      <BuySell :side="payload.side" @emit-change="handleChangeSide" />
      <BrickConfigInput id="market" name="Market">
        <input type="text" id="market" v-model="payload.marketPk" />
      </BrickConfigInput>
      <BrickConfigInput id="price" name="Price">
        <input type="text" id="price" v-model="payload.price" />
      </BrickConfigInput>
      <BrickConfigInput id="size" name="Size">
        <input type="text" id="size" v-model="payload.size" />
      </BrickConfigInput>
      <BrickConfigInput
        v-if="brick.protocolId === 1"
        id="mangoAccNr"
        name="Mango account"
      >
        <input type="text" id="mangoAccNr" v-model="payload.mangoAccNr" />
      </BrickConfigInput>
      <BrickConfigRadio options="IOC,Limit,Post only">
        <template v-slot:IOC>
          <input
            type="radio"
            id="IOC"
            value="ioc"
            v-model="payload.orderType"
          />
        </template>
        <template v-slot:Limit>
          <input
            type="radio"
            id="Limit"
            value="limit"
            v-model="payload.orderType"
          />
        </template>
        <template v-slot:Postonly>
          <input
            type="radio"
            id="Postonly"
            value="postOnly"
            v-model="payload.orderType"
          />
        </template>
      </BrickConfigRadio>
      <BrickConfigCheckbox id="box" name="Attempt to settle">
        <input
          class="flex-initial m-1"
          type="checkbox"
          id="box"
          v-model="trySettle"
        />
      </BrickConfigCheckbox>
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
      mangoAccNr: "0", // optional
    } as PlaceParams;

    // TODO:
    return {
      payload,
      desc: true,
      trySettle: true,
      handleChangeSide: () => null,
      handleEndEdit: () => null,
    };
  },
});
</script>

<style scoped></style>
