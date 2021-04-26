<template>
  <div class="typingContainer">
    <!-- <p class="typing" v-if="type.user !== user.uid && type.isType">
      Buddy is typing...
    </p> -->
    <div v-if="type.user !== user.uid && type.isType" class="ticontainer">
  <!-- <div class="tiblock">
    <div class="tidot"></div>
    <div class="tidot"></div>
    <div class="tidot"></div>
  </div> -->
</div>
  </div>
</template>

<script>
import { onUpdated, watch } from "vue";
import { ref } from "vue";
import getTypeStatus from "../composable/getTypeStatus";
import getUser from "../composable/getUser";
export default {
  setup() {
    const { type } = getTypeStatus();
    const { user } = getUser();

    return { type, user };
  },
};
</script>

<style scoped>

/* facebook typing indicator */

.tiblock {
    align-items: center;
    display: flex;
    height: 17px;
}

.ticontainer .tidot {
    background-color: #90949c;
}

.tidot {
    -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
    border-radius: 2px;
    display: inline-block;
    height: 4px;
    margin-right: 2px;
    width: 4px;
}

@-webkit-keyframes mercuryTypingAnimation{
0%{
  -webkit-transform:translateY(0px)
}
28%{
  -webkit-transform:translateY(-5px)
}
44%{
  -webkit-transform:translateY(0px)
}
}

.tidot:nth-child(1){
-webkit-animation-delay:200ms;
}
.tidot:nth-child(2){
-webkit-animation-delay:300ms;
}
.tidot:nth-child(3){
-webkit-animation-delay:400ms;
}
/* end of facebook typing indicator */
.typing {
  font-size: 15px;
  text-align: center;
}
.typingContainer {
  margin: 5px auto;
}
/* Animated Typing Style */
.typing {
  animation: typing 1s infinite steps(9);
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
  70% {
    width: 10ch;
  }
  90% {
    width: 13ch;
  }
  100% {
    width: 13ch;
  }
}
/* End of Animated Typing Style */
</style>