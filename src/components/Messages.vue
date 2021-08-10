<template>
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif"
    class="pghd"
    @back="goBack"
    content="Home"
  >
  </el-page-header>
  <h3 style="text-align: center; font-family: Roboto, sans-serif">Messages</h3>

  <div v-if="documents">
    <div v-for="doc in documents" :key="doc.userUid">
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
                <h4>{{ doc.userName }}</h4>
              </div>
            </router-link>
            <div class="friend">
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
  <div v-else v-loading.fullscreen.lock="true"></div>
  <!-- <div v-else class="empty">
    <p>No Messages</p>
  </div> -->
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

export default {
  props: ["id"],
  setup(props) {
    const { info } = getProfile("profiles", props.id);
    const { error, documents } = getUsers();
    const { user } = getUser();
    const store = useStore();

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
      console.log(store.getters.isDark);
      if (store.getters.isDark) {
        document.body.style.backgroundColor = "black";
      }
    };

    const goBack = () => {
      router.push({ name: "Home" });
    };

    const hasMsg = computed(() => {
      return Array.isArray(info.value.friendList) &&
        !info.value.friendList.length
        ? false
        : true;
    });

    onMounted(() => {
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
      document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#DFE4E0');
    });

    return { goBack, documents, info, privateChat, user, hasMsg };
  },
  computed: {
    ...mapGetters(["getRoute"]),
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");

.users {
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  background: #f5f5f5;
  margin: auto;
  border-radius: 10px;
  transition: all 0.1s ease-in-out;
  margin-bottom: 15px;
  text-decoration: none;
  padding: 10px;
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
    max-width: 320px;
  }
}
</style>
