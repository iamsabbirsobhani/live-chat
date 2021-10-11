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
        <TabPanel header="Images">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
            velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Story">
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabView>
    </div>
  </div>
  <div v-else>
    <p>Unauthorise Access</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Videos from "../subComponent/Videos.vue";
import { useRouter } from "vue-router";

export default {
  components: { TabPanel, TabView, Videos },
  setup() {
    const router = useRouter();
    const store = useStore();
    const password = ref(null);
    const userPassword = ref(null);

    const goBack = () => {
      router.push({
        name: "Home",
      });
    };
    password.value = store.state.explorePass;
    userPassword.value = store.state.userExplorePass;

    return { password, userPassword, goBack };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap");
.explore-home {
  font-family: "Rajdhani", sans-serif;
}
</style>
