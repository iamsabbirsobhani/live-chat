<template>
  <div class="av-played">
    <div class="ex-video" v-for="u in urlT" :key="u">
      <el-card shadow="never" class="card-box">
        <div class="title-texts">
          <h3 v-if="u.title">{{ u.title }}</h3>
          <p>Published: {{ u.createdAt }}</p>
          <div v-if="u.tags" id="tags">
            <p>Tags:</p>
            <div v-for="tg in u.tags" :key="tg">
              <Tag
                class="p-mr-2"
                id="ptag"
                severity="warning"
                :value="tg.tagName"
                :style="{ background: tg.tagColor }"
              ></Tag>
            </div>
          </div>
        </div>
        <video :style="styleObject" controls muted>
          <source :src="u.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div v-if="u.played && user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`">
          <p>Total Played: {{ u.played }}</p>
        </div>

        <div style="display: flex; align-items: center; margin-top: 20px;">
          <label style="margin-right: 10px;" for="tags">Privacy: </label>
          <Tag
            class="p-mr-2"
            id="ptag"
            severity="warning"
            v-if="u.private"
            value="Private"
            style="background: black; color: white;"
            tag-name="tags"
          ></Tag>
          <Tag
            tag-name="tags"
            v-else
            class="p-mr-2"
            id="ptag"
            severity="warning"
            value="Public"
            style="background: #33dfac; color: white;"
          ></Tag>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import getAVideosPlayed from "../composable/getAVideosPlayed";
import { computed, onMounted, ref } from "vue";
import { format } from "date-fns";
import getUser from "@/composable/getUser.js";
import Tag from "primevue/tag";

export default {
  components: { Tag },
  setup() {
    const { user } = getUser();
    const { url } = getAVideosPlayed();
    const windWidth = ref(null);
    const styleObject = ref(null);

    const urlT = computed(() => {
      if (url.value) {
        return url.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PP");
          return { ...doc, createdAt: time };
        });
      }
    });

    onMounted(() => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `575px`,
          // height: `240px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `270px`,
          // height: `240px`,
        };
      }
    });

    return { styleObject, urlT, user };
  },
};
</script>

<style lang="scss" scoped>
.ex-video {
  margin-top: 10px;
  margin-bottom: 150px;
}

video {
  max-width: 600px;
}
.card-box {
  font-family: "Rajdhani", sans-serif;
}

.warn-btn {
  max-width: 600px;
  margin: auto;
}

.ad-btn {
  font-family: "Rajdhani", sans-serif;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  height: 60px;
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
}

.p-mr-2 {
  width: 100%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

#ptag {
  width: unset;
  margin-left: 5px;
  margin-bottom: 5px;
  display: inline-block;
}

#tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.title-texts {
  line-height: 1.2;
  h3 {
    margin-bottom: 5px;
  }
  p {
    margin-top: 7px;
    margin-bottom: 5px;
  }
}
</style>
