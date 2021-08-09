<template>
  <div style="background: none;" :style="getStyle">
    <Navbar
      @delete="deletes"
      :userTo="id"
      :documents="documents"
      :name="name"
      :picture="picture"
    />
    <NewChatForm :userTo="id" />
    <ConfirmPopup></ConfirmPopup>
    <div class="card">
      <Toast />
    </div>
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
import { mapGetters } from "vuex";

export default {
  props: ["id", "name", "picture"],
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
  computed: {
    ...mapGetters(["getStyle"]),
  },
};
</script>

<style scoped></style>
