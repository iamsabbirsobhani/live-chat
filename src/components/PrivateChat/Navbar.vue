<template>
  <div id="start" v-if="user">
    <el-page-header
      style="margin: 10px; color: black"
      class="pghd"
      @back="goBack"
      :content=getBack
    >
    </el-page-header>
    <div>
      <p style="margin: 10px">
        <router-link
        style="text-decoration: none"
        :to="{ name: 'Profile', params: { id: info.userUid } }"
      >
        <!-- <Chip :label="name" icon="pi pi-user" :image="picture" /> -->
        <Chip :label="info.userName" icon="pi pi-user" :image="info.phofilePhoto" />
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import useLogout from "@/composable/useLogout";
import getUser from "@/composable/getUser";
import deleteCollection from "@/composable/delChat.js";
import getProfile from "@/composable/getProfile.js";
import Chip from "primevue/chip";
import { useRouter } from "vue-router";
import { mapGetters, useStore } from "vuex";

export default {
  props: ["userTo", "documents", "name", "picture"],
  components: { Menubar, Button, Menu, Dialog, Chip },
  setup(props) {
    const { user } = getUser();
    const store = useStore();

    const { info } = getProfile("profiles", props.userTo)

    const router = useRouter();

    const goBack = () => {
      router.push({ name: store.getters.getRoute, params: { id: user.value.uid } });
    };

    return {
      user,
      goBack,
      info
    };

  },
    computed: {
    ...mapGetters(["getBack"]),
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