<template>
  <Navbar @delete="deletes" />
  <h3 style="text-align: center">Chatroom</h3>
  <NewChatForm />
  <ConfirmPopup></ConfirmPopup>

  <div class="card">
    <Toast />
  </div>
</template>

<script>
import userDelete from "../composable/userDelete";
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import NewChatForm from "../components/NewChatForm.vue";
import Navbar from "../components/Navbar.vue";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
  components: { Navbar, NewChatForm, Button },
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const { delUser, error } = userDelete();

    const deleteUser = async () => {
      await delUser();
    };

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
        console.log("watching");
      }
    });

    const deletes = () => {
      if (!error.value) {
        deleteUser();
      }
    };
    return { deletes };
  },
};
</script>

<style scoped>
/* .card{
  padding: 20px;
  border-top: 1px solid rgb(255, 208, 208);
  text-align: center;
} */
</style>