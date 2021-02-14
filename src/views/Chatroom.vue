<template>
  <!-- <h1>Chatroom</h1> -->
  <Navbar />
  <NewChatForm/>
</template>

<script>
import NewChatForm from '../components/NewChatForm.vue'
import Navbar from "../components/Navbar.vue";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
  components: { Navbar, NewChatForm },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
        console.log("watching");
      }
    });
  },
};
</script>

<style>
</style>