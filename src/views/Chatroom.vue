<template>
  <Navbar />
  <h3 style="text-align: center">Chatroom</h3>
  <NewChatForm/>
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <Button
      @click="deletes"
      icon="pi pi-trash"
      label="Delete"
      class="p-button-danger p-button-outlined"
    ></Button>
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
    const toast = useToast();
    const confirm = useConfirm();
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

    const deletes = (event) => {
      confirm.require({
        target: event.currentTarget, //this "target" is important
        //primevue forget to mention this line in their documentation on confirm dialog component's composition api section
        message: "Do you want to delete your account?",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        accept: () => {
          if (!error.value) {
            setTimeout(() => {
              deleteUser();
            }, 1000);
            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: "You have accepted",
              life: 2000,
            });
          } else {
            toast.add({
              severity: "info",
              summary: "Rejected",
              detail: error.value,
              life: 3000,
            });
          }
        },
        reject: () => {
          toast.add({
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };
    return { deletes };
  },
};
</script>

<style scoped>
.card{
  padding: 20px;
  border-top: 1px solid rgb(255, 208, 208);
  text-align: center;
}
</style>