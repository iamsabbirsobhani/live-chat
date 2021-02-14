<template>
  <form>
    <Card class="card" style="position: relative; width: 25rem; height: 400px; margin: 20px auto; margin-bottom: 2em">
    <template #title>
        <h3 style="text-align: center;">Chatroom</h3>
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
  </form>
</template>

<script>
import Card from 'primevue/card';

import Textarea from "primevue/textarea";
import { ref } from 'vue';
import getUser from '../composable/getUser';
import { timestamp } from '../firebase/config';

export default {
    components: { Textarea, Card },
    setup() {
        const message = ref('')
        const { user } = getUser()

        const handleSumbit = async () => {

            const chat = {
                name: user.value.displayName,
                message: message.value,
                createdAt: timestamp()
            }
        console.log(chat)
        message.value = ''
        }

        return { message, handleSumbit }
    }

};
</script>


<style scoped>
#app > form > div > div > div.p-card-content > textarea{
    width: 100%;
    max-width: 90%;
    position: absolute;
    bottom: 0;
    height: 66px !important;
    margin-bottom: 10px;
    overflow-y: scroll  !important;
}
@media (max-width: 425px) {
    .card{
        width: 300px !important;
    }
}
</style>