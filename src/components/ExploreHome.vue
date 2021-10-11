<template>
  <!-- v-if="password == userPassword" -->
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif"
    class="pghd"
    @back="goBack"
    content="Home"
  >
  </el-page-header>
  <div v-if="password == userPassword" class="explore-home">
    <h3 style="text-align: center;">
      Explore Home
    </h3>
    <div class="card">
      <TabView ref="tabview1">
        <TabPanel header="Videos">
          <Videos />
        </TabPanel>
        <TabPanel header="Adult">
          <AVideos/>
        </TabPanel>
        <TabPanel header="Story">
          <div class="story">
            <p class="story">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>

            <Tag class="p-mr-2" severity="info" value="Coming Soon..."></Tag>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
  <div v-else>
    <p>Unauthorised access</p>
  </div>
</template>

<script>
import Tag from "primevue/tag";

import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Videos from "../subComponent/Videos.vue";
import AVideos from "../subComponent/AVideos.vue";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import getUser from "@/composable/getUser.js";
import { profileUpdateField } from "@/composable/profileUpdateField";

export default {
  components: { TabPanel, TabView, Videos, AVideos, Tag },
  setup() {
    const router = useRouter();
    const store = useStore();
    const password = ref(null);
    const userPassword = ref(null);
    const { user } = getUser();

    const goBack = () => {
      router.push({
        name: "Home",
      });
    };
    password.value = store.state.explorePass;
    userPassword.value = store.state.userExplorePass;

    onMounted(async () => {
      await profileUpdateField({ key: "exploreHome" });
    });

    return { password, userPassword, goBack };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap");
.explore-home {
  font-family: "Rajdhani", sans-serif;
}
.story {
  font-family: "Rajdhani", sans-serif;
  p {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
