<template>
  <Modal>
    <SelectableBox
      v-for="w in coloredWallets" :key="w.name"
      :color="w.color"
      :selected="selectedWallet.name === w.name"
      @click="selectedWallet = w"
    >
      <div class="flex flex-row justify-center align-middle p-2">
        <WalletLogo class="mr-2" :size="24" :name="w.name"/>
        <p>{{ w.name }}</p>
      </div>
    </SelectableBox>
    <div class="flex flex-col items-center w-full">
      <Button class="mt-5" size="med" @click="connectWallet">CONNECT</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet, Wallet,
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import Modal from '../components/primitive/Modal.vue';
import SelectableBox from '../components/primitive/SelectableBox.vue';
import { NETWORK } from '@/config/config';
import WalletLogo from '@/common/components/primitive/WalletLogo.vue';
import Button from '@/common/components/primitive/Button.vue';
import { setWallet } from '@/common/common.state';

export default defineComponent({
  components: {
    WalletLogo,
    SelectableBox,
    Modal,
    Button,
  },
  setup(props, context) {
    let network;
    if (NETWORK === 'mainnet') {
      network = WalletAdapterNetwork.Mainnet;
    } else if (NETWORK === 'devnet') {
      network = WalletAdapterNetwork.Devnet;
    } else if (NETWORK === 'testnet') {
      network = WalletAdapterNetwork.Testnet;
    }

    const wallets = [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      // todo getTorusWallet({
      //   options: { clientId: 'Get a client ID @ https://developer.tor.us' },
      // }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ];

    const colors = {
      Phantom: '#533BC8',
      Slope: '#6E66FA',
      Solflare: 'orangered',
      Ledger: 'white',
      Sollet: '#2899F3',
      'Sollet (Extension)': '#2899F3',
    };

    const coloredWallets = wallets.map((w) => ({
      ...w,
      color: colors[w.name],
    }));

    const selectedWallet = ref<Wallet>(getPhantomWallet());

    const emitNewWallet = () => {
      context.emit('newWallet', selectedWallet.value.name);
    };

    const connectWallet = async () => {
      const connectedAdapter = (selectedWallet.value).adapter();
      await connectedAdapter.connect();
      setWallet({
        name: selectedWallet.value.name,
        connectedAdapter,
      });
      emitNewWallet();
    };

    return {
      coloredWallets,
      selectedWallet,
      connectWallet,
    };
  },
});
</script>

<style scoped>
</style>
