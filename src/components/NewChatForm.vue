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
      <template #title>
      </template>
      <template #content>
        <Textarea
          @keypress.enter.prevent="handleSumbit"
          class="textarea"
          v-model="message"
          :autoResize="true"
          rows="5"
          cols="30"
          placeholder="Type a message and hit enter to send..."
        />
      </template>
    </Card>
    <div>{{ error }}</div>
  </form>
</template>

<script>
import Card from "primevue/card";

import Textarea from "primevue/textarea";
import { ref } from "vue";
import getUser from "../composable/getUser";
import { timestamp } from "../firebase/config";
import useCollection from "../composable/useCollection";
import Button from "primevue/button";

export default {
  components: { Textarea, Card, Button },
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");

    const handleSumbit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp(),
      };
      await addDoc(chat);
      if (!error.value) {
        message.value = "";
      }
    };

    return { message, handleSumbit, error };
  },
};
</script>


<style scoped>
#app > form > div > div > div.p-card-content > textarea {
  width: 100%;
  max-width: 90%;
  position: absolute;
  bottom: 0;
  height: 66px !important;
  margin-bottom: 10px;
  overflow-y: scroll !important;
}
.p-button-danger {
  display: block;
  margin: 20px auto;
}
@media (max-width: 425px) {
  .card {
    width: 300px !important;
  }
}
</style>