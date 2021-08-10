<template>
  <div id="start" v-if="user" style="color: black;" :style="getStyle">
    <div
      style="font-family: Roboto, sans-serif; display: flex; align-items: center; justify-content: space-between;"
    >
      <el-page-header
        style="margin: 10px; "
        class="pghd"
        @back="goBack"
        :style="getStyle"
      >
      </el-page-header>
      {{ getBack }}
      <ToggleButton
        style="margin-left: 15px;"
        v-model="checked1"
        @click="darkM"
        onIcon="pi pi-sun"
        offIcon="pi pi-moon"
      />
    </div>
    <div>
      <p style="margin: 10px">
        <router-link
          style="text-decoration: none"
          :to="{ name: 'Profile', params: { id: info.userUid } }"
        >
          <!-- <Chip :label="name" icon="pi pi-user" :image="picture" /> -->
          <Chip
            :label="info.userName"
            icon="pi pi-user"
            :image="info.phofilePhoto"
            @click="profileDark"
          />
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import ToggleButton from "primevue/togglebutton";
import { onMounted, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import useLogout from "@/composable/useLogout";
import getUser from "@/composable/getUser";
import userEditProfileInfo from "@/composable/userEditProfileInfo";
import getProfile from "@/composable/getProfile.js";
import Chip from "primevue/chip";
import { useRouter } from "vue-router";
import { mapGetters, useStore } from "vuex";

export default {
  props: ["userTo", "documents", "name", "picture"],
  components: { Menubar, Button, Menu, Dialog, Chip, ToggleButton },
  setup(props) {
    const { user } = getUser();
    const { addDoc } = userEditProfileInfo();
    const store = useStore();

    const { info } = getProfile("profiles", props.userTo);
    const { info: userDarkMode } = getProfile("profiles", user.value.uid);

    const router = useRouter();
    const checked1 = ref(false);

    onMounted(() => {
      let currentPathObject = router.currentRoute.value;

      if (currentPathObject.fullPath.includes("/home/messages/")) {
        let payload = { name: "Messages", back: "Messages" };
        store.commit("clickOn", payload);
      }
      if (currentPathObject.fullPath.includes("/profile/friendlist/")) {
        let payload = { name: "FriendList", back: "Friends" };
        store.commit("clickOn", payload);
      }

      if (store.getters.isDark) {
        checked1.value = store.getters.isDark;
        document.body.style.backgroundColor = "black";
      }
      if (!store.getters.isDark) {
        checked1.value = store.getters.isDark;
      }
    });

    const goBack = () => {
      router.push({
        name: store.getters.getRoute,
        params: { id: user.value.uid },
      });
      console.log(store.getters.isDark);
      document.body.style.backgroundColor = "white";
    };

    // dark mode

    // for remember dark mode choice
    watch(userDarkMode, (newUserDarkMode) => {
      console.log(newUserDarkMode.isDark);
      if (newUserDarkMode.isDark) {
        checked1.value = true;
        darkM();
        // for address theme
        // let meta = document.createElement("meta");
        // meta.name = "theme-color";
        // meta.content = "black";
        // document.getElementsByTagName("head")[0].appendChild(meta);
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  'black');
      }
    });
    // for remember dark mode choice

    const darkM = () => {
      // checked1.value = true
      if (checked1.value) {
        let payload = { background: "black", border: "black", color: "white" };
        addDoc(user.value.uid, { isDark: true });
        store.commit("darkMode", payload);
        store.commit("isDark", true);
        document.body.style.backgroundColor = "black";
      } else {
        addDoc(user.value.uid, { isDark: false });
        store.commit("isDark", false);
        let payload = { background: "none", color: "black" };
        store.commit("darkMode", payload);
        document.body.style.backgroundColor = "white";
        document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#DFE4E0');
        // checked1.value = false
      }
    };

    const profileDark = () => {
      document.body.style.backgroundColor = "white";

      // for address theme
      // let meta2 = document.createElement("meta");
      // meta2.name = "theme-color";
      // meta2.content = "white";
      // document.getElementsByTagName("head")[0].append(meta2);
      document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#DFE4E0');
    };
    // dark mode

    return {
      user,
      goBack,
      info,
      darkM,
      checked1,
      profileDark,
    };
  },
  computed: {
    ...mapGetters(["getStyle", "getBack"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
#start {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: auto;
  margin-top: 0;
  /* margin-bottom: 5px; */
  border-bottom: 1px solid #eee;
  color: white;
}
.p-button-secondary {
  margin: 10px;
}
.dname {
  font-size: 25px;
  color: rgb(88, 240, 0);
}
.email {
  font-weight: 700;
  color: white;
}

.pghd {
  font-family: "Roboto", sans-serif;
}
</style>
