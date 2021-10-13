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

    <!--<p class="text-center mb-2">*** Tips ***</p>-->
    <!--<p class="mb-1">* Start testing with a single brick, add gradually.</p>-->
    <!--<p class="mb-1">* For Serum, don't forget to add a Settle brick after a Trade brick.</p>-->
    <!--<p class="mb-1">* For Mango, you need to deposit before you can trade.</p>-->
    <!--<p class="mb-10">* For Solend, don't try to do Solend brick > other bricks > another Solend brick, it won't work.</p>-->

    <!--<p class="text-center mb-2">*** Where to find us ***</p>-->
    <!--<p class="mb-1">* Visit the-->
    <!--  <a class="text-db-pink" href="https://dbricks.xyz" target="_blank">homepage</a> for contact details.-->
    <!--</p>-->
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
  /*left: 50%;*/
  /*transform: translate(-650px);*/
  /*top: 290px;*/
  left: 0;
  top: 0;
}
</style>
