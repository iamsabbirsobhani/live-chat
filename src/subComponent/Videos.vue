<template>
  <div class="videos">
    <el-card
      shadow="never"
      class="card-box"
      v-if="user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`"
    >
      <form @submit.prevent="submit">
        <el-input
          style="margin-top: 20px; margin-bottom: 20px;"
          v-model="title"
          placeholder="Please input title"
          required
        />
        <el-input
          style="margin-top: 20px; margin-bottom: 20px;"
          v-model="input"
          placeholder="Please input url"
          required
        />
        <!-- <el-button type="submit" >Submit</el-button> -->
        <Button
          style="width: 100%; margin-top: 20px;"
          label="Submit"
          class="p-button-success"
          type="submit"
        />
      </form>
    </el-card>
    <div class="ex-video" v-for="u in url" :key="u">
      <el-card shadow="never" class="card-box">
        <h3 v-if="u.title">{{ u.title }}</h3>
        <el-popconfirm
          v-if="user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`"
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure to delete this?"
          @confirm="confirmEvent(u.id)"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button class="btn" type="danger">Delete</el-button>
          </template>
        </el-popconfirm>
        <video :style="styleObject" controls muted>
          <source :src="u.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </el-card>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useVideos from "../composable/useVideos";
import getVideosUrl from "../composable/getVideosUrl";
import getUser from "@/composable/getUser.js";
import { projectFirestore } from "@/firebase/config.js";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const { user } = getUser();
    const input = ref(null);
    const title = ref(null);
    const { postVideoUrl } = useVideos("videos");
    const { url } = getVideosUrl();
    const submit = async () => {
      console.log(input.value);
      await postVideoUrl({
        url: input.value,
        title: title.value,
        createdAt: timestamp(),
        private: false,
      });
      input.value = null;
      title.value = null;
    };

    const windWidth = ref(null);
    const styleObject = ref(null);

    onMounted(() => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `556px`,
          // height: `240px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `285px`,
          // height: `240px`,
        };
      }
    });
    return { submit, input, styleObject, url, user, title };
  },
  methods: {
    confirmEvent(id) {
      console.log("confirm!", id);
      projectFirestore
        .collection("videos")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    cancelEvent() {
      console.log("cancel!");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap");

.videos {
  max-width: 600px;
  margin: auto;
}
.ex-video {
  margin-top: 150px;
  margin-bottom: 150px;
}
video {
  max-width: 600px;
}

.btn {
  margin: 0px 0px 50px 0px;
  float: right;
}

.card-box {
  font-family: "Rajdhani", sans-serif;
}
</style>
