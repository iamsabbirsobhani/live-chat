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
    </Card>
    <Textarea
      @keypress.enter.prevent="handleSumbit"
      class="textarea"
      v-model.trim="message"
      :autoResize="true"
      rows="5"
      cols="30"
      placeholder="Type a message and hit enter to send..."
    />
    <div>{{ error }}</div>
  </form>
</template>

<script>
import Card from "primevue/card";
import ChatWindow from "../components/ChatWindow.vue";
import Textarea from "primevue/textarea";
import { ref } from "vue";
import getUser from "../composable/getUser";
import { timestamp } from "../firebase/config";
import useCollection from "../composable/useCollection";
import Button from "primevue/button";

export default {
  components: { Textarea, Card, Button, ChatWindow },
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");

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

    return { message, handleSumbit, error };
  },
};
</script>


<style scoped>
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