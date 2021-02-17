<template>
  <form>
    <Card
      class="card"
      style="
        position: relative;
        width: 25rem;
        height: 400px;
        margin: 20px auto;
        margin-bottom: 2em;
      "
    >
      <template #content>
        <ChatWindow class="cwindow" />
      </template>
          <template #footer>
            <div class="typeStatus">
        <Typing/>
        </div>
    </template>
    </Card>
    <Textarea
      v-model.trim="message"
      v-debounce:610ms.cancelonempty="stopTyping"
      v-model="typeStatus"
      @keypress.enter.prevent="handleSumbit"
      class="textarea"
      :autoResize="true"
      rows="5"
      cols="30"
      placeholder="Type a message and hit enter to send..."
    />
    <div>{{ error }}</div>
  </form>
</template>

<script>
import Typing from '../components/Typing.vue'
import Card from "primevue/card";
import ChatWindow from "../components/ChatWindow.vue";
import Textarea from "primevue/textarea";
import { onMounted, onUpdated, ref, watch } from "vue";
import getUser from "../composable/getUser";
import { timestamp } from "../firebase/config";
import useCollection from "../composable/useCollection";
import userTypingSetFlag from "../composable/userTypingSetFlagValue";
import Button from "primevue/button";

export default {
  components: { Textarea, Card, Button, ChatWindow, Typing },
  setup() {
    const message = ref("");
    const typeStatus = ref(null);
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");
    const { addDocType } = userTypingSetFlag();

    const handleSumbit = async () => {
      if (message.value) {
        const chat = {
          name: user.value.displayName,
          message: message.value,
          createdAt: timestamp(),
        };
        await addDoc(chat);

        if (!error.value) {
          message.value = "";
        }
      }
    };

    // Type Status Check
    watch(typeStatus, () => {
      // console.log(typeStatus.value);
      keypressF();
    });


    const keypressF = async () => {
      if (typeStatus.value) {
        // console.log(typeStatus.value);
        var keypresss = {
          isType: true,
        };
        // console.log("Typing Start");
        await addDocType(keypresss);
      } else {
        var keypresss = {
          isType: false,
        };
        await addDocType(keypresss);
      }
    };

    const stopTyping = () => {
      const key = {
        isType: false,
      };
      addDocType(key);
      // console.log("Typing Stopped");
    };
        // End of Type Status Check

    return { message, handleSumbit, error, typeStatus, stopTyping };
  },
};
</script>


<style scoped>

.typeStatus {
    z-index: 2;
    z-index: 2;
    /* margin: 111px !important; */
    /* top: 35px; */
    position: absolute;
    top: 314px;
    margin-left: 20px;
}
#app > form > textarea {
  width: 400px;
  position: relative;
  bottom: 0;
  height: 66px !important;
  margin-bottom: 10px;
  display: block;
  margin: 10px auto !important;
  margin-top: 0px;
  overflow-y: auto !important;
}

.p-button-danger {
  display: block;
  margin: 20px auto;
}
.card {
  position: relative;
  height: 300px;
}
#app > form > div.p-card.p-component.card {
  height: 350px !important;
  margin: 0px auto !important;
}
@media (max-width: 425px) {
  .card {
    width: 300px !important;
  }
  #app > form > textarea {
    width: 300px;
  }
}
</style>