<template>
  <div class="videos">
    <form v-if="user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`" @submit.prevent="submit">
      <el-input v-model="input" placeholder="Please input" required />
    </form>
    <div class="ex-video" v-for="u in url" :key="u">
      <video :style="styleObject" controls muted>
        <source :src="u.url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useVideos from "../composable/useVideos";
import getVideosUrl from "../composable/getVideosUrl";
import getUser from "@/composable/getUser.js";

export default {
  setup() {
    const { user } = getUser();
    const input = ref(null);
    const { postVideoUrl } = useVideos("videos");
    const { url } = getVideosUrl();
    const submit = async () => {
      console.log(input.value);
      await postVideoUrl({ url: input.value });
    };

    const windWidth = ref(null);
    const styleObject = ref(null);

    onMounted(() => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `600px`,
          // height: `240px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `320px`,
          // height: `240px`,
        };
      }
    });
    return { submit, input, styleObject, url, user };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
