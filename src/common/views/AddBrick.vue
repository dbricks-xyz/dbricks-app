<template>
  <Modal>
    <p>Pick a protocol:</p>
    <div class="flex flex-row justify-between">
      <SelectableBox
        v-for="p in listProtocols().slice(0, 6)" :key="p.name"
        class="flex-1"
        :color="p.color"
        :selected="selectedProtocol === p.name"
        :disabled="currentlyDisabled.indexOf(p.name) !== -1"
        @click="currentlyDisabled.indexOf(p.name) === -1 ? changeProtocol(p.name) : undefined"
      >
        <div class="flex flex-col items-center align-middle p-2">
          <ProtocolLogo :size="50" :protocol="p.name"/>
          <p class="mt-3">{{ p.name }}</p>
        </div>
      </SelectableBox>
    </div>
    <div class="flex flex-row justify-between">
      <SelectableBox
        v-for="p in listProtocols().slice(6)" :key="p.name"
        class="flex-1"
        :color="p.color"
        :selected="selectedProtocol === p.name"
        :disabled="currentlyDisabled.indexOf(p.name) !== -1"
        @click="currentlyDisabled.indexOf(p.name) === -1 ? changeProtocol(p.name) : undefined"
      >
        <div class="flex flex-col items-center align-middle p-2">
          <ProtocolLogo :size="50" :protocol="p.name"/>
          <p class="mt-3">{{ p.name }}</p>
        </div>
      </SelectableBox>
    </div>

    <p class="mt-10">Pick an action:</p>
    <SelectableBox
      v-for="a in getProtocol(selectedProtocol).actions" :key="a"
      class="flex-1"
      :color="getProtocol(selectedProtocol).color"
      :selected="selectedAction === a"
      @click="selectedAction = a"
    >
      <p>{{ a }}</p>
    </SelectableBox>

    <div class="flex flex-col items-center w-full">
      <Button class="mt-5" size="med" @click="emitNewBrick">ADD</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Protocol } from '@dbricks/dbricks-ts';
import Modal from '@/common/components/primitive/Modal.vue';
import Button from '@/common/components/primitive/Button.vue';
import SelectableBox from '@/common/components/primitive/SelectableBox.vue';
import ProtocolLogo from '@/common/components/ProtocolLogo.vue';
import { getProtocol, listProtocols } from '@/common/common.protocols';

export default defineComponent({
  components: {
    ProtocolLogo,
    SelectableBox,
    Button,
    Modal,
  },
  emits: ['new-brick'],
  setup(props, context) {
    const selectedProtocol = ref<string>('Serum');
    const selectedAction = ref<string>('PlaceOrder');

    const currentlyDisabled = [
      Protocol.Raydium,
      Protocol.Wormhole,
      Protocol.Sunny,
      Protocol.Orca,
      Protocol.Solfarm,
      Protocol.Parrot,
      Protocol.Marinade,
      Protocol.Mercurial,
    ];

    const emitNewBrick = () => {
      context.emit('new-brick', {
        protocol: selectedProtocol.value,
        action: selectedAction.value,
      });
    };

    const changeProtocol = (newProtocol) => {
      selectedProtocol.value = newProtocol;
      // eslint-disable-next-line prefer-destructuring
      selectedAction.value = getProtocol(newProtocol).actions[0];
    };

    return {
      selectedProtocol,
      selectedAction,
      currentlyDisabled,
      getProtocol,
      listProtocols,
      emitNewBrick,
      changeProtocol,
    };
  },
});
</script>
