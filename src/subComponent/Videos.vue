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

        <el-input
          style="margin-top: 20px; margin-bottom: 20px;"
          v-model="tagInput"
          placeholder="Please input tags and hit/swipe right"
          @keyup.right="addTags"
        />

        <div v-if="tag" id="tags">
          <div v-for="t in tag" :key="t">
            <Tag
              class="p-mr-2"
              id="ptag"
              severity="warning"
              :style="{ background: t.tagColor }"
              :value="t.tagName"
            ></Tag>
          </div>
        </div>

        <!-- <el-button type="submit" >Submit</el-button> -->
        <Button
          style="width: 100%; margin-top: 20px;"
          label="Submit"
          class="p-button-success"
          type="submit"
        />
      </form>
    </el-card>
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
        <video @play="played" :style="styleObject" controls muted>
          <source :src="u.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </el-card>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import useVideos from "../composable/useVideos";
import getVideosUrl from "../composable/getVideosUrl";
import getUser from "@/composable/getUser.js";
import { projectFirestore } from "@/firebase/config.js";
import { timestamp } from "../firebase/config";
import { debounce } from "vue-debounce";
import { profileUpdateField } from "@/composable/profileUpdateField";
import colors from "@/composable/colors.js";
import Tag from "primevue/tag";
import { format } from "date-fns";

export default {
  components: { Tag },
  setup() {
    const { user } = getUser();
    const input = ref(null);
    const title = ref(null);
    const { postVideoUrl } = useVideos("videos");
    const { url } = getVideosUrl();
    const tag = ref([]);
    const tagInput = ref(null);
    const submit = async () => {
      console.log(input.value);
      await postVideoUrl({
        url: input.value,
        title: title.value,
        createdAt: timestamp(),
        private: false,
        tags: tag.value,
      });
      input.value = null;
      title.value = null;
      tagInput.value = null;
      tag.value = [];
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

    const urlT = computed(() => {
      if (url.value) {
        return url.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PP");
          return { ...doc, createdAt: time };
        });
      }
    });

    const played = debounce(async () => {
      await profileUpdateField({ key: "videoPlayed" });
    }, 2500);


    const addTags = () => {
      console.log(tagInput.value);
      const random = Math.random();
      const index = Math.round(random * 279);
      let backgroundColor = `${colors[index]}`;
      // checking if the "newModel.value.msg" has any value
      function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
      }
      if (!isEmptyOrSpaces(tagInput.value)) {
        tag.value.push({
          tagName: tagInput.value,
          tagColor: backgroundColor,
        });
      }
      console.log(tag.value);
      tagInput.value = null;
    };
    return {
      submit,
      input,
      styleObject,
      url,
      user,
      title,
      played,
      addTags,
      tagInput,
      tag,
      urlT
    };
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
