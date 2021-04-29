<template>
  <el-page-header style="margin: 10px" @back="goBack" content="Profile">
  </el-page-header>
  <h1 style="text-align: center">Home</h1>
  <div v-for="doc in documents" :key="doc.userUid" class="postcard">
    <el-card v-if="doc.post" shadow="always">
      <router-link
        style="text-decoration: none; margin: 0px"
        :to="{ name: 'Profile', params: { id: doc.userUid } }"
      >
        <div class="name">
          <el-avatar :size="40" src="https://empty" @error="errorHandler">
            <img :src="doc.phofilePhoto" />
          </el-avatar>
          <h3>{{ doc.userName }}</h3>
        </div>
      </router-link>
      <p class="post">{{ doc.post }}</p>

      <!-- <i class="pi pi-thumbs-up"></i> -->
      <Button icon="pi pi-thumbs-up" class="p-button-rounded p-button-text" />
    </el-card>
  </div>
</template>

<script>
import getUser from "@/composable/getUser.js";
import getUsers from "@/composable/getUsers.js";
import { useRouter } from "vue-router";
import Button from "primevue/button";

export default {
  components: { Button },
  setup() {
    const { user } = getUser();
    const { error, documents } = getUsers();
    const router = useRouter();

    const goBack = () => {
      router.push({ name: "Profile", params: { id: user.value.uid } });
    };

    return { documents, goBack, user };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Roboto:wght@100&display=swap");
.postcard {
  max-width: 500px;
  margin: 10px auto;
}
.post {
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
}
.name {
  display: flex;
  align-items: center;
}
.name h3 {
  margin-left: 10px;
}

@media (max-width: 425px) {
  .postcard {
    max-width: 320px;
  }
}
</style>