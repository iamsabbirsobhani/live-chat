<template>
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif"
    class="pghd"
    @back="goBack"
    content="Home"
    v-if="msgPassword != userMsgPassword  && user.uid != `oJStHj6xShPbVyEFpwmK1B1rjAk2`"
  >
  </el-page-header>
  <div
    style="background: none;"
    :style="getStyle"
    v-if="msgPassword == userMsgPassword  || user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`"
  >
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
  <div v-else>
    <UnauthorizedPage />
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
import { watch, ref } from "vue";
import { mapGetters } from "vuex";
import { useStore } from "vuex";
import UnauthorizedPage from "../../subComponent/UnauthorizedPage.vue";

export default {
  props: ["id", "name", "picture"],
  components: { Navbar, NewChatForm, Button, UnauthorizedPage },
  setup() {
    const { user } = getUser();
    const { documents } = getUsers();
    const router = useRouter();
    const { delUser, error } = userDelete();
    const store = useStore();

    const msgPassword = ref(null);
    const userMsgPassword = ref(null);

    msgPassword.value = store.state.messagesPass;
    userMsgPassword.value = store.state.userMessagesPass;

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

    const goBack = () => {
      router.push({
        name: "Home",
      });
    };
    return { deletes, documents, msgPassword, userMsgPassword, goBack, user };
  },
  computed: {
    ...mapGetters(["getStyle"]),
  },
};
</script>

<style scoped></style>
