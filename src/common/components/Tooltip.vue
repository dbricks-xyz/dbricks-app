<template>
  <div class="tooltip">
    <div class="flex mb-10" @click="emitHide">
      <div class="flex-grow">
        <p>Useful stuff for testing (mainnet)</p>
      </div>
      <GeneralIcon icon="left"/>
    </div>
    <p class="text-center mb-2">*** Mints ***</p>
    <p>USDC:</p>
    <p class="text-db-cyan mb-1">EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</p>
    <p>USDT:</p>
    <p class="text-db-cyan mb-1">Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB</p>
    <p>FTT:</p>
    <p class="text-db-cyan mb-1">AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3</p>
    <p>SRM:</p>
    <p class="text-db-cyan mb-1">SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt</p>
    <p>MNGO:</p>
    <p class="text-db-cyan mb-10">MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac</p>

    <p class="text-center mb-2">*** Serum/Mango Markets ***</p>
    <p>USDT/USDC:</p>
    <p class="text-db-cyan mb-1">77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS</p>
    <p>FTT/USDC:</p>
    <p class="text-db-cyan mb-1">2Pbh1CvRVku1TgewMfycemghf6sU9EyuFDcNXqvRmSxc</p>
    <p>SRM/USDC:</p>
    <p class="text-db-cyan mb-1">ByRys5tuUWDgL73G8JBAEfkdFf8JWBzPBDHsBVQ5vbQA</p>
    <p>MNGO/USDC:</p>
    <p class="text-db-cyan mb-10">3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc</p>

    <p class="text-center mb-2">*** Saber Pools ***</p>
    <p>USDT/USDC:</p>
    <p>- Swap Account:</p>
    <p class="text-db-cyan mb-1">YAkoNb6HKmSxQN9L8hiBE5tPJRsniSSMzND1boHmZxe</p>
    <p>- Pool (LP) Token Mint:</p>
    <p class="text-db-cyan mb-1">2poo1w1DL6yd2WNTCnNTzDqkC6MBXq7axo77P16yrBuf</p>
    <p>FTT/wFTT:</p>
    <p>- Swap Account:</p>
    <p class="text-db-cyan mb-1">TSMUBiuZXEpnqd6X21JRskACqA6oad7MsYddvLbxwDH</p>
    <p>- Pool (LP) Token Mint:</p>
    <p class="text-db-cyan mb-1">FTXjwjwWqituSXEHnL5VF1mjDhZoAyJqvHiRPsRq3KWK</p>
    <p>SRM/wSRM:</p>
    <p>- Swap Account:</p>
    <p class="text-db-cyan mb-1">TSMFNX73aQNb3yqszDKgyR8AVoigfbaD4cfLjjCYXZf</p>
    <p>- Pool (LP) Token Mint:</p>
    <p class="text-db-cyan mb-1">SRMKjSJpBHJ5gSVTrimci49SnXc1LVkBi9TGF9RNYdp</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GeneralIcon from '@/common/components/icons/GeneralIcon.vue';

export default defineComponent({
  components: { GeneralIcon },
  setup(props, context) {
    const emitHide = () => {
      context.emit('hideTooltip', true);
    };

    return {
      emitHide,
    };
  },
});
</script>

<style scoped>

.tooltip {
  @apply bg-black p-5;
  width: 460px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
