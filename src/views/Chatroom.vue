<template>
  <!-- <h1>Chatroom</h1> -->
  <Navbar />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
  components: { Navbar },
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