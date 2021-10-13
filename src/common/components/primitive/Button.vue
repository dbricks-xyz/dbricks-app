<template>
  <button
    class="text-center btn"
    :class="size"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: String,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.btn {
  background-color: theme('colors.db.cyan');
  font-family: 'ubuntu', sans-serif;
  outline: none;
  color: black !important;
}

.btn:hover {
  transition: 0.5s;
  box-shadow: 0 0 20px theme('colors.db.pink');
}

.large {
  min-height: 60px;
  padding: 10px 45px;
  font-size: 26px;
}

.med {
  min-height: 45px;
  padding: 6px 30px;
  font-size: 22px;
}

.small {
  min-height: 35px;
  padding: 4px 20px;
  font-size: 18px;
}

.round {
  height: 50px;
  width: 50px;
  font-size: 26px;
  border-radius: 50%;
}

</style>
