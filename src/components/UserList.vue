<template>
  <Toast />
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif"
    class="pghd"
    @back="goABack"
    content="Authentication"
    v-if="masterPass != userMasterPass"
  >
  </el-page-header>
  <div v-if="masterPass == userMasterPass">
    <el-page-header
      class="pghd"
      style="margin: 10px"
      @back="goBack"
      content="Profile"
    >
    </el-page-header>
    <h2 style="text-align: center; font-family: Roboto, sans-serif">
      All the users
    </h2>
    <div v-if="documents">
      <div v-for="doc in documents" :key="doc.userUid">
        <div class="users">
          <router-link
            style="text-decoration: none"
            :to="{ name: 'Profile', params: { id: doc.userUid } }"
          >
            <div class="name">
              <el-avatar :size="60" src="https://empty" @error="errorHandler">
                <img :src="doc.phofilePhoto" />
              </el-avatar>
              <h4 style="color: #f9fafb;">{{ doc.userName }}</h4>
            </div>
          </router-link>
          <div class="title">
            <p>{{ doc.profession }}</p>
            <p>{{ doc.location }}</p>
          </div>
          <div class="addFriend">
            <!-- && !doc.friendRequest.includes(user.uid) -->
            <Button
              v-if="
                !(doc.userUid === user.uid) &&
                  !doc.friendList.includes(user.uid) &&
                  !doc.friendRequest.includes(user.uid)
              "
              @click="addFriends(doc.userUid, user.uid)"
              icon="pi pi-user-plus"
              class="p-button-rounded p-button-success"
            />
            <Button
              disabled
              v-if="doc.friendList.includes(user.uid)"
              icon="pi pi-check"
              class="p-button-rounded"
              label="Friend"
            />
            <Button
              v-if="doc.friendRequest.includes(user.uid)"
              icon="pi pi-times"
              class="p-button-rounded p-button-danger"
              label="Unsent"
              @click="unsent(user.uid, doc.userUid)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <p>No Users</p>
    </div>
  </div>
  <div v-else>
    <UnauthorizedPage />
  </div>
</template>

<script>
import getUsers from "@/composable/getUsers.js";
import getProfile from "@/composable/getProfile.js";
import getUser from "../composable/getUser";
import friendRequest from "../composable/friendRequest";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { computed } from "vue";
import { useToast } from "primevue/usetoast";
import unsentFreq from "@/composable/unsentFreq.js";
import { useStore } from "vuex";
import UnauthorizedPage from "../subComponent/UnauthorizedPage.vue";
import { ref } from "vue";

export default {
  props: ["id"],
  components: { Button, UnauthorizedPage },
  setup(props) {
    const store = useStore();
    const { error, documents } = getUsers();
    const { user } = getUser();
    const { info } = getProfile("profiles", user.value.uid);
    const router = useRouter();
    const { addFriend } = friendRequest();

    const { doUnsent } = unsentFreq("profiles");

    const toast = useToast();

    const goBack = () => {
      router.push({ name: "Profile", params: { id: user.value.uid } });
    };

    // addfriend
    const addFriends = (fid, uid) => {
      addFriend(fid, uid);
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Friend Request Sent",
        life: 3000,
      });
    };
    // addfriend

    // unsent

    const unsent = (cruId, reqId) => {
      doUnsent(cruId, reqId);
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Request unsent successfully",
        life: 3000,
      });
    };

    // unsent

    const masterPass = ref(null);
    const userMasterPass = ref(null);
    userMasterPass.value = store.state.userMasterPass;
    masterPass.value = store.state.masterPass;

    const goABack = () => {
      router.push({ name: "Authentication" });
    };

    return {
      documents,
      goBack,
      addFriends,
      user,
      unsent,

      masterPass,
      userMasterPass,
      goABack,
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
  background-color: #1e293b;
  margin: 10px auto;
  border-radius: 6px;
  padding: 10px;
}
.users:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.title {
  font-size: 12px;
  /* margin: 10px; */
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
    max-width: 330px;
  }
}
</style>
