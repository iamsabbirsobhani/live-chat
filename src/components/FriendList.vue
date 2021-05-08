<template>
  <!-- unfriend confirmation dialog -->
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <ConfirmDialog group="positionDialog"></ConfirmDialog>
  <!-- end of unfriend confirmation dialog -->

  <el-page-header
    style="margin: 10px"
    class="pghd"
    @back="goBack"
    content="Profile"
  >
  </el-page-header>
  <h3 style="text-align: center; font-family: Roboto, sans-serif">
    Friend List
  </h3>

  <div v-for="doc in documents" :key="doc.userUid">
    <div v-for="fr in info.friendList" :key="fr.id">
      <div v-if="doc.id === fr">
        <div class="users">
          <router-link
            style="text-decoration: none"
            :to="{ name: 'Profile', params: { id: doc.userUid } }"
          >
            <div class="name">
              <el-avatar :size="60">
                <img :src="doc.phofilePhoto" />
              </el-avatar>
              <h4>{{ doc.userName }}</h4>
            </div>
          </router-link>
          <div class="friend">

            <!-- unfriend process -->
            <Button
              style="margin-left: 10px"
              v-if="!(doc.userUid === user.uid)"
              @click="confirmPosition('top', user.uid, doc.userUid)"
              icon="pi pi-user-minus"
              class="p-button-rounded p-button-danger p-button-outlined"
            />
            <!-- end unfriend process -->

            <Button
              style="margin-left: 10px"
              v-if="!(doc.userUid === user.uid)"
              @click="
                privateChat(
                  doc.userUid,
                  doc.userName,
                  doc.phofilePhoto,
                  user.uid
                )
              "
              icon="pi pi-comments"
              class="p-button-rounded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getProfile from "@/composable/getProfile.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import getUsers from "@/composable/getUsers.js";
import getUser from "@/composable/getUser.js";
import unfriendSelf from "@/composable/PrivateChat/unfriendSelf.js";
import unfriendOther from "@/composable/PrivateChat/unfriendOther.js";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default {
  props: ["id"],
  components: { ConfirmDialog },
  setup(props) {
    const confirm = useConfirm();
    const toast = useToast();

    const centerDialogVisible = ref(false);
    const { info } = getProfile("profiles", props.id);
    const router = useRouter();
    const { error, documents } = getUsers();
    const { user } = getUser();
    // unfriend
    const { doUnfriendSelf } = unfriendSelf("profiles");
    const { doUnfriendOther } = unfriendOther("profiles");

    const confirmPosition = (position, useruid, docuserUid) => {
      confirm.require({
        key: "positionDialog",
        message: "Do you really want to unfriend?",
        header: "Unfriend Confirmation!",
        icon: "pi pi-info-circle",
        position: position,
        accept: () => {
          unfriend(useruid, docuserUid);
          toast.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Successfully Unfriend",
            life: 3000,
          });
        },
        reject: () => {
          toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };

    const unfriend = (userId, reqId) => {
      centerDialogVisible.value = false;
      doUnfriendSelf(userId, reqId);
      doUnfriendOther(userId, reqId);
    };

    // end unfriend

    const goBack = () => {
      router.push({ name: "Profile" });
    };
    const privateChat = (frId, userName, dp) => {
      router.push({
        name: "PrivateChat",
        params: { id: frId, name: userName, picture: dp },
      });
    };

    const unfriendPopup = () => {
      centerDialogVisible.value = true;
    };

    return {
      info,
      goBack,
      documents,
      user,
      privateChat,
      unfriendPopup,
      centerDialogVisible,
      confirmPosition,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
.users {
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  background-color: rgb(230, 230, 230);
  margin: 10px auto;
  border-radius: 10px;
  padding: 10px;
}
.users:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.title {
  font-size: 12px;
}

.name {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.name h4 {
  margin-left: 10px;
}
p {
  margin: 0px;
  padding: 0px;
}

.pghd {
  font-family: "Roboto", sans-serif;
}

@media (max-width: 425px) {
  .users {
    max-width: 350px;
  }
  .p-button-rounded {
    margin-left: 5px;
  }
}
</style>