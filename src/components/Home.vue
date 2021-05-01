<template>
  <el-page-header style="margin: 10px" @back="goBack" content="Profile">
  </el-page-header>
  <h1 style="text-align: center">Home</h1>
  <div v-for="doc in formattedDocuments" :key="doc.userUid" class="postcard">
    <el-card v-if="doc.post" shadow="always">
      <router-link
        style="text-decoration: none; margin: 0px"
        :to="{ name: 'Profile', params: { id: doc.userId } }"
      >
        <div class="name">
          <el-avatar :size="40">
            <img :src="doc.dp" />
          </el-avatar>
          <div class="nameDate">
            <h3>{{ doc.userName }}</h3>
            <p class="date">{{ doc.createdAt }}</p>
          </div>
        </div>
      </router-link>
      <p class="post">{{ doc.post }}</p>
      <div class="feeling">
      <Button
        @click="like(doc.id, user.uid)"
        icon="pi pi-thumbs-up"
        class="p-button-rounded p-button-text"
      />
      <p>{{ doc.like }}</p>
      <!-- <Button
        @click="dislike(doc.id, user.uid)"
        style="color: red"
        icon="pi pi-thumbs-down"
        class="p-button-rounded p-button-text"
      />
      <p style="display: inline;">{{ doc.dislike }}</p> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import getUser from "@/composable/getUser.js";
import getPosts from "@/composable/getPosts.js";
import getUsers from "@/composable/getUsers.js";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { computed, watch } from "vue";
import { format } from "date-fns";
import likeSystem from '@/composable/likeSystem.js'
import dislikeSystem from '@/composable/dislikeSystem.js'

export default {
  components: { Button },
  setup() {
    const { user } = getUser();
    const { error, documents } = getUsers();
    // const { status } = getPostForHome('posts')
    const { statusHome } = getPosts("posts");
    const router = useRouter();

    const { likePost } = likeSystem()
    const { dislikePost } = dislikeSystem()

    const formattedDocuments = computed(() => {
      if (statusHome.value) {
        return statusHome.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PPPPp");
          return { ...doc, createdAt: time };
        });
      }
    });

    const goBack = () => {
      router.push({ name: "Profile", params: { id: user.value.uid } });
    };

    const like = (postId, reacter) => {
      likePost(postId, reacter)
      return false
    }

    const dislike = (postIdt, reactert) => {
      // console.log(postId)
      // console.log(reacter)
      dislikePost(postIdt, reactert)
      return false

    }

    return { goBack, user, formattedDocuments, like, dislike };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Roboto:wght@100&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
.postcard {
  max-width: 500px;
  margin: 10px auto;
}
.post {
    font-size: 16px;

  // font-family: "Montserrat", sans-serif;
  font-family: 'Roboto', sans-serif;

}
.name {
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;

}
.name h3 {
  margin-left: 10px;
}

.nameDate {
  line-height: 0.5;
}

.date {
  font-size: 10px;
  margin: 10px;
  color: rgba(0, 80, 137, 0.829);
}

.feeling {
  display: flex;
  align-items: center;
}

.feeling p{
  margin: 10px;
  color: gray;
  // font-family: 'Roboto', sans-serif;
}

@media (max-width: 425px) {
  .postcard {
    max-width: 320px;
  }
}
</style>