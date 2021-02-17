<template>
  <div class="typingContainer">
    <p class="typing" v-if="type">Buddy is typing...</p>
  </div>
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
.typingContainer{
    margin: 5px auto;
}
/* Animated Typing Style */
.typing {
  animation: typing 0.7s infinite steps(9);
  overflow: hidden;
  animation-iteration-count: infinite;
  letter-spacing: 1px;
  white-space: nowrap;
  font-family: consolas;
  border-right: 4px solid #ff0000;
  width: 9ch;
  color: #000000;
  /* margin-top: 20%;
  margin-left: 1%; */
  margin: 5px auto;
}

@keyframes typing {
  0% {
    width: 13ch;
  }
  50% {
    width: 18ch;
  }
  100% {
    width: 13ch;
  }
}
/* End of Animated Typing Style */
</style>