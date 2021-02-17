<template>
  <p class="typing" v-if="type">Typing...</p>
</template>

<script>
import { onUpdated, watch } from "vue";
import { ref } from "vue";
import getTypeStatus from "../composable/getTypeStatus";
export default {
  setup() {
    const { type } = getTypeStatus();

    return { type };
  },
};
</script>

<style scoped>
.typing {
  font-size: 15px;
  text-align: center;
}
</style>