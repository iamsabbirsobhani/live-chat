<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="warn-btn">
    <lottie-player
      src="https://assets10.lottiefiles.com/temp/lf20_QYm9j9.json"
      background="transparent"
      speed=".5"
      style="width: 250px; height: 250px; margin: auto; "
      loop
      autoplay
      v-if="!showVideos"
    ></lottie-player>
    <Button
      v-if="!showVideos"
      class="ad-btn p-button-danger"
      @click="showAVideo"
      icon="pi pi-chevron-down"
      label="Click to Show Adult Videos"
    ></Button>
    <Button
      v-if="showVideos"
      class="ad-btn p-button-danger"
      @click="hideAVideo"
      icon="pi pi-angle-up"
      label="Click to Hide Adult Videos"
    ></Button>
    <Tag
      class="p-mr-2"
      severity="warning"
      value="Videos are auto generated by adult websites. Author is not accountable for anything."
    ></Tag>
  </div>
  <div v-if="showVideos" class="videos" @touchend.once="avideoPage">
    <el-card
      shadow="never"
      v-if="
        user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2` ||
          user.uid == `UO1BAq0rxycSpKKt3cIlgWgkZpi1` ||
          user.uid == `MORuJJ0PWpb3inamywW5sSrHDGq2`
      "
    >
      <form @submit.prevent="submit">
        <el-input
          style="margin-top: 20px; margin-bottom: 20px;"
          v-model="title"
          placeholder="Please input title"
          required
          class="card-box"
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
        <!-- @keyup.space="addTags" -->

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
        <div style="display: flex; align-items: center; margin-top: 20px;">
          <label style="margin-right: 10px;" for="toggle">Private: </label>
          <ToggleButton
            v-model="checked1"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            tag-name="toggle"
          />
        </div>

        <!-- <el-button type="submit" >Submit</el-button> -->
        <Button
          style="width: 100%; margin-top: 20px;"
          label="Submit"
          class="p-button-success"
          type="submit"
        />
        <Button
          style="width: 100%; margin-top: 20px;"
          label="See views"
          class="p-button-danger"
          @click="openMaximizable"
        />
      </form>
    </el-card>
    <div class="ex-video" v-for="u in urlT" :key="u">
      <el-card
        shadow="never"
        class="card-box"
        v-if="
          !u.private ||
            user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2` ||
              user.id == `UO1BAq0rxycSpKKt3cIlgWgkZpi1` ||
              user.id == `MORuJJ0PWpb3inamywW5sSrHDGq2`
        "
      >
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
          v-if="
            user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2` ||
              user.id == `UO1BAq0rxycSpKKt3cIlgWgkZpi1` ||
              user.id == `MORuJJ0PWpb3inamywW5sSrHDGq2`
          "
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
        <video
          @play="played(u.id, u.title, u.url, u.tags, u.private)"
          :style="styleObject"
          controls
          muted
        >
          <source :src="u.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
    <Tag
      class="p-mr-2"
      severity="warning"
      value="Videos are auto generated by adult websites. Author is not accountable for anything. No Copyright © 2021"
    ></Tag>
  </div>

  <Dialog
    header="Views of Adult Videos"
    v-model:visible="displayMaximizable"
    :style="styleDialog"
    :maximizable="true"
    :modal="true"
  >
    <div class="p-m-0">
      <AVideosPlayed />
    </div>
    <template #footer>
      <Button
        style="margin-top: 15px;"
        label="Close"
        icon="pi pi-check"
        @click="closeMaximizable"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import useAVideos from "../composable/useAVideos";
import getAVideosUrl from "../composable/getAVideosUrl";
import getUser from "@/composable/getUser.js";
import { projectFirestore } from "@/firebase/config.js";
import { profileUpdateField } from "@/composable/profileUpdateField";
import { debounce } from "vue-debounce";
import { timestamp } from "../firebase/config";
import { format } from "date-fns";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Tag from "primevue/tag";
import colors from "@/composable/colors.js";
import { avPlayed } from "@/composable/avPlayed.js";
import Dialog from "primevue/dialog";
import AVideosPlayed from "@/subComponent/AVideosPlayed.vue";
import ToggleButton from "primevue/togglebutton";
export default {
  components: { ConfirmDialog, Tag, Dialog, AVideosPlayed, ToggleButton },
  setup() {
    const confirm = useConfirm();
    const toast = useToast();
    const { user } = getUser();
    const input = ref(null);
    const title = ref(null);
    const showVideos = ref(false);
    const checked1 = ref(false);
    const { postAVideoUrl } = useAVideos("avideos");
    const { url } = getAVideosUrl();
    const tag = ref([]);
    const tagInput = ref(null);
    const displayMaximizable = ref(false);
    const submit = async () => {
      console.log(input.value);
      await postAVideoUrl({
        url: input.value,
        title: title.value,
        createdAt: timestamp(),
        private: checked1.value,
        tags: tag.value,
        played: 0,
      });
      input.value = null;
      title.value = null;
      tagInput.value = null;
      tag.value = [];
    };
    const windWidth = ref(null);
    const styleObject = ref(null);
    const styleDialog = ref(null);
    const urlT = computed(() => {
      if (url.value) {
        return url.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PP");
          return { ...doc, createdAt: time };
        });
      }
    });
    onMounted(async () => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleDialog.value = {
          width: `50vw`,
        };
        styleObject.value = {
          width: `556px`,
          // height: `240px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `285px`,
          // height: `240px`,
        };
        styleDialog.value = {
          width: `100vw`,
        };
      }
    });
    const played = debounce(async (vid, tit, u, tg, pv) => {
      await profileUpdateField({ key: "avideoPlayed" });
      await avPlayed({
        key: "played",
        id: vid,
        title: tit,
        url: u,
        tags: tg,
        private: pv,
      });
      console.log(vid);
    }, 2500);
    const avideoPage = async () => {
      await profileUpdateField({ key: "avideoPage" });
    };
    const showAVideo = () => {
      confirm.require({
        message:
          "Videos contain Nudity or sexuality, some people may find offensive or disturbing. ",
        header: "Sensitive Content! 18+",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptLabel: "Show",
        rejectLabel: "Don't show!",
        accept: () => {
          showVideos.value = true;
          toast.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Videos are open now. Enjoy!",
            life: 4000,
          });
        },
        reject: () => {
          showVideos.value = false;
          toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have rejected to watch adult videos.",
            life: 4000,
          });
        },
      });
    };
    const hideAVideo = () => {
      showVideos.value = false;
    };
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
    const openMaximizable = () => {
      displayMaximizable.value = true;
    };
    const closeMaximizable = () => {
      displayMaximizable.value = false;
    };
    return {
      openMaximizable,
      closeMaximizable,
      displayMaximizable,
      urlT,
      submit,
      input,
      styleObject,
      user,
      title,
      played,
      avideoPage,
      showAVideo,
      showVideos,
      hideAVideo,
      addTags,
      tagInput,
      tag,
      styleDialog,
      checked1,
    };
  },
  methods: {
    confirmEvent(id) {
      console.log("confirm!");
      projectFirestore
        .collection("avideos")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      projectFirestore
        .collection("avideosplayed")
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
