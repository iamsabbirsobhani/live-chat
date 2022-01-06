<template>
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif; color: #f9fafb !important;"
    class="pghd"
    @back="goBack"
    content="Home"
    v-if="msgRoute"
  >
  </el-page-header>
  <h3
    style="text-align: center; font-family: Roboto, sans-serif"
    v-if="
      msgPassword == userMsgPassword ||
        user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2` ||
        user.uid == `MORuJJ0PWpb3inamywW5sSrHDGq2`
    "
  >
    Messages
  </h3>

  <div
    v-if="
      msgPassword == userMsgPassword ||
        user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2` ||
        user.uid == `MORuJJ0PWpb3inamywW5sSrHDGq2`
    "
  >
    <div v-if="documents">
      <div v-for="doc in formatedDoc" :key="doc.userUid">
        <div v-for="fr in info.friendList" :key="fr.id">
          <div v-if="doc.id === fr">
            <div class="users">
              <router-link
                style="text-decoration: none"
                :to="{ name: 'Profile', params: { id: doc.userUid } }"
              >
                <div class="name">
                  <el-avatar class="img" :size="60">
                    <img :src="doc.phofilePhoto" />
                  </el-avatar>
                  <div>
                    <h4 style="color: #f9fafb;">{{ doc.userName }}</h4>
                    <h4
                      class="last-seen"
                      v-if="
                        user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2` ||
                          user.uid == `MORuJJ0PWpb3inamywW5sSrHDGq2`
                      "
                    >
                      {{ doc.lastVisited }}
                    </h4>
                  </div>
                </div>
              </router-link>
              <div class="friend">
                <Button
                  style="margin-left: 10px"
                  v-if="
                    (!(doc.userUid === user.uid) &&
                      user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`) ||
                      user.uid == `MORuJJ0PWpb3inamywW5sSrHDGq2`
                  "
                  @click="openMaximizable(doc.userUid)"
                  icon="pi pi-map-marker"
                  class="p-button-rounded"
                />
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
    </div>
    <div
      v-else
      v-loading.fullscreen.lock="true"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      style="width: 100%"
    ></div>
  </div>
  <div v-else>
    <UnauthorizedPage />
  </div>
  <!-- <div v-else class="empty">
    <p>No Messages</p>
  </div> -->
  <!-- <p>{{ }}</p> -->

  <Dialog
    header="Geolocation"
    v-model:visible="displayMaximizable"
    :style="{ width: '100vw' }"
    :maximizable="true"
    :modal="true"
  >
    <div class="p-m-0">
      <GeoLocation :id="pId" :geo="geo" />
    </div>
    <template #footer>
      <Button
        label="Okay"
        icon="pi pi-check"
        @click="closeMaximizable"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import { mapGetters, useStore } from "vuex";
import getProfile from "@/composable/getProfile.js";
import { computed, onMounted, ref } from "vue";
import getUsers from "@/composable/getUsers.js";
import getUser from "@/composable/getUser.js";
import unfriendSelf from "@/composable/PrivateChat/unfriendSelf.js";
import unfriendOther from "@/composable/PrivateChat/unfriendOther.js";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import Dialog from "primevue/dialog";
import GeoLocation from "../subComponent/GeoLocation.vue";
import { projectFirestore } from "../firebase/config";
import UnauthorizedPage from "../subComponent/UnauthorizedPage.vue";
export default {
  props: ["id"],
  components: { Dialog, GeoLocation, UnauthorizedPage },
  setup(props) {
    const { info } = getProfile("profiles", props.id);
    const { error, documents } = getUsers();
    const { user } = getUser();
    const store = useStore();
    const pId = ref(null);
    const displayMaximizable = ref(false);

    const msgPassword = ref(null);
    const userMsgPassword = ref(null);

    msgPassword.value = store.state.messagesPass;
    userMsgPassword.value = store.state.userMessagesPass;

    const router = useRouter();

    const privateChat = (frId, userName, dp) => {
      router.push({
        name: "PrivateChat",
        params: {
          route: "home",
          routeTwo: "messages",
          id: frId,
          name: userName,
          picture: dp,
        },
      });
      if (store.getters.isDark) {
        document.body.style.backgroundColor = "#0f172a";
      }
    };

    const goBack = () => {
      router.push({ name: "Home" });
    };

    const formatedDoc = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = format(doc.lastVisited.toDate(), "PPp");
          return { ...doc, lastVisited: time };
        });
      }
    });

    const hasMsg = computed(() => {
      return Array.isArray(info.value.friendList) &&
        !info.value.friendList.length
        ? false
        : true;
    });
    const msgRoute = ref();
    onMounted(() => {
      msgRoute.value = router.currentRoute.value.fullPath.includes("messages");
      // for dark mode
      document.body.style.backgroundColor = "white";
      // for address theme
      // let meta3 = document.createElement("meta");
      // meta3.name = "theme-color";
      // meta3.content = "white";
      // document.getElementsByTagName("head")[0].append(meta3);

      // document.querySelector("[name=`theme`]").remove();

      // let meta2 = document.createElement("meta");
      // meta2.name = "theme-color";
      // meta2.content = "white";
      // document.getElementsByTagName("head")[0].append(meta2);
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#0f172a");
    });

    const geo = ref(null);
    const openMaximizable = (id) => {
      pId.value = id;
      // data
      var docRef = projectFirestore.collection("profiles").doc(id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            geo.value = doc.data();
            displayMaximizable.value = true;
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    const closeMaximizable = () => {
      displayMaximizable.value = false;
    };

    return {
      openMaximizable,
      closeMaximizable,
      displayMaximizable,
      goBack,
      documents,
      info,
      privateChat,
      user,
      hasMsg,
      formatedDoc,

      pId,
      geo,

      msgPassword,
      userMsgPassword,
      msgRoute,
    };
  },
  computed: {
    ...mapGetters(["getRoute"]),
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
.pghd {
  color: #f9fafb !important;
}

.users {
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  background-color: #1e293b;
  margin: auto;
  border-radius: 10px;
  transition: all 0.1s ease-in-out;
  margin-bottom: 15px;
  text-decoration: none;
  padding: 10px;
  h4 {
    margin: 5px;
  }
  .last-seen {
    color: gray;
    font-size: 14px;
    font-weight: 400;
  }
}
.users:hover {
  transform: scale(1.02);
}
.name {
  display: flex;
  align-items: center;
  .img {
    margin-right: 15px;
  }
}

@media (max-width: 475px) {
  .users {
    max-width: 350px;
  }
}
</style>
