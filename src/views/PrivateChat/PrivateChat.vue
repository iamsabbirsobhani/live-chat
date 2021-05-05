<template>
  <Navbar  @delete="deletes" :userTo="id" :documents="documents" />
  <h3 style="text-align: center; margin: 0px; padding: 0px; position: relative;">Chatroom</h3>
  <NewChatForm :userTo="id"/>
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <Toast />
  </div>
</template>

<script>
import userDelete from "@/composable/userDelete";
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import NewChatForm from "@/components/PrivateChat/NewChatForm.vue";
import Navbar from "@/components/PrivateChat/Navbar.vue";
import getUser from "@/composable/getUser";
import getUsers from "@/composable/getUsers";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
    props: ['id'],
  components: { Navbar, NewChatForm, Button },
  setup() {
    const { user } = getUser();
    const { documents } = getUsers();
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
    return { deletes, documents };
  },
};
</script>

<style scoped>

</style>