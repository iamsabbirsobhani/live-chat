<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    style="font-family: Roboto, sans-serif"
  >
    <el-tooltip
      class="item"
      effect="dark"
      content="Click on name to go profile"
      placement="right"
    >
      <el-menu-item index="1">
        <router-link :to="{ name: 'Profile', params: { id: user.uid } }">
          <div class="navPhoto">
            <img
              class="profilePic"
              :src="info.phofilePhoto"
              alt="Profile Photo"
            />
            {{ user.displayName }}
          </div>
        </router-link>
      </el-menu-item>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="Click Messages to check inbox"
      placement="left"
    >
      <el-menu-item index="2">
        <Button
          @click="messages(user.uid)"
          label="Messages"
          class="p-button-raised p-button-secondary p-button-text"
        />
      </el-menu-item>
    </el-tooltip>
  </el-menu>

  <!-- <el-page-header style="margin: 10px;" @back="goBack" content="Profile">
  </el-page-header> -->
  <!-- <h1 style="text-align: center; font-size: 25px">Home</h1> -->
  <div v-if="formattedDocuments">
    <div v-for="doc in formattedDocuments" :key="doc.userUid" class="postcard">
      <!-- :class="{ borderCard: !seeComments  && doc.id === seeCommentsDocId}" -->
      <div v-if="doc.privacy == `public`">
        <el-card
          v-if="doc.post"
          :style="doc.id === seeCommentsDocId ? styleBorder : ''"
          shadow="always"
          style="border-radius: 10px"
        >
          <router-link
            style="text-decoration: none; margin: 0px"
            :to="{ name: 'Profile', params: { id: doc.userId } }"
            @click="metaProfileName(doc.userName)"
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
          <div class="post-edited-time">
            <p v-if="doc.isEdited" class="edited-date">
              Edited: {{ doc.editedAt }}
            </p>
            <p class="post">{{ doc.post }}</p>
          </div>
          <Chip
            @click="publicToolTip"
            icon="pi pi-lock-open"
            v-if="doc.privacy == `public`"
            label="Public"
            class="p-mr-2 p-mb-2 custom-chip public-chip"
          />
          <Chip
            v-if="doc.privacy == ``"
            label="Not Set"
            class="p-mr-2 p-mb-2 custom-chip"
          />
          <div class="feeling" style=" margin-top: 10px;">
            <div class="feelinglikedislike">
              <Button
                v-if="doc.likeId.includes(user.uid)"
                @click.stop="like(doc.id, user.uid)"
                icon="fas fa-thumbs-up"
                class="p-button-rounded p-button-text likeButton "
              />
              <Button
                v-else
                @click.stop="like(doc.id, user.uid)"
                icon="far fa-thumbs-up"
                class="p-button-rounded p-button-text likeButton "
              />
              <p>{{ doc.like }}</p>
              <Button
                v-if="doc.dislikeId.includes(user.uid)"
                @click.stop="dislike(doc.id, user.uid)"
                style="color: red"
                icon="fas fa-thumbs-down"
                class="p-button-rounded p-button-danger p-button-text"
              />
              <Button
                v-else
                @click.stop="dislike(doc.id, user.uid)"
                style="color: red"
                icon="far fa-thumbs-down"
                class="p-button-rounded p-button-danger p-button-text"
              />
              <p style="display: inline">{{ doc.dislike }}</p>
            </div>
            <!-- comments -->
            <div style="cursor: pointer; font-family: Roboto, sans-serif">
              <p
                v-if="seeComments"
                class="seeComment"
                @click="seeComment(doc.id, seeCommentsDocId)"
              >
                See Comments
              </p>
              <p
                v-if="closeComments && doc.id === seeCommentsDocId"
                class="closeComment"
                @click="closeComment(doc.id)"
              >
                Close
              </p>
              <el-tooltip
                class="item"
                effect="dark"
                content="To see comments please close the other comment section"
                placement="top"
              >
                <div>
                  <p
                    style="cursor: text"
                    v-if="closeComments && !(doc.id === seeCommentsDocId)"
                  >
                    See Comments
                  </p>
                </div>
              </el-tooltip>
            </div>
          </div>

          <transition name="fade">
            <div
              class="comment-section"
              v-if="!seeComments && doc.id === seeCommentsDocId"
            >
              <p style="font-family: Roboto, sans-serif">Comments:</p>

              <div
                class="comment"
                v-for="cmt in formattedComments"
                :key="cmt.id"
              >
                <div class="commentDes" v-if="cmt.docId === doc.id">
                  <p class="commentName">
                    {{ cmt.name }}
                  </p>
                  <p class="commentDate" v-if="cmt.docId === doc.id">
                    {{ cmt.createdAt }}
                  </p>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Delete Comment"
                    placement="left"
                  >
                    <div style="margin-left: auto">
                      <Button
                        v-if="cmt.docId === doc.id && user.uid === cmt.userId"
                        icon="pi pi pi-times"
                        style="color: red; margin-left: auto"
                        @click="deleteCmt(cmt.id)"
                        class="
                        p-button-rounded
                        p-button-danger
                        p-button-outlined
                        p-button-sm
                      "
                      />
                    </div>
                  </el-tooltip>
                </div>
                <p class="commentComment" v-if="cmt.docId === doc.id">
                  {{ cmt.comment }}
                </p>
              </div>

              <!-- <el-input placeholder="Please input" v-model="comment"></el-input> -->
              <div style="display: flex; flex-direction: column">
                <InputText
                  style="border-radius: 10px"
                  placeholder="Please enter comment"
                  type="text"
                  v-model.trim="comment"
                />
                <el-button
                  style="margin-top: 10px; border-radius: 10px"
                  class="button"
                  v-if="isLoading"
                  :loading="isLoading"
                  >Loading</el-button
                >
                <el-button
                  v-else
                  @click="postComment(doc.id, user.displayName, user.uid)"
                  style="margin-top: 10px; border-radius: 10px"
                  >Comment</el-button
                >
              </div>
            </div>
          </transition>
          <!-- comments -->
        </el-card>
      </div>
    </div>
  </div>
  <div v-else v-loading.fullscreen.lock="true"></div>

  <!-- <div class="showMore">
    <el-button
      v-if="clickedShowMore"
      type="primary"
      @click="showMore"
      v-loading.fullscreen.lock="fullscreenLoading"
      :disabled="showMoreBtn"
      style="margin-bottom: 10px; margin-top: 10px;"
    >
      Show more...
    </el-button>
  </div> -->
  <!-- <pre style="text-align: center; color: rgb(196, 196, 196); cursor: not-allowed; user-select: none;">Pagination is Beta.</pre> -->
  <p class="home-footer">
    Copyright © 2021 made with <i class="fas fa-heart"></i> by Albion Johnson.
  </p>
</template>

<script>
import Chip from "primevue/chip";
import getUser from "@/composable/getUser.js";
import getPosts from "@/composable/getPosts.js";
import getUsers from "@/composable/getUsers.js";
import getProfile from "@/composable/getProfile.js";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { computed, ref, onUpdated, onMounted } from "vue";
import { format, formatDistanceToNow } from "date-fns";
import likeSystem from "@/composable/likeSystem.js";
import dislikeSystem from "@/composable/dislikeSystem.js";
import useComments from "@/composable/useComments.js";
import getComments from "@/composable/getComments.js";
import commentDelete from "@/composable/commentDelete.js";
import colors from "@/composable/colors.js";
import { timestamp } from "../firebase/config";
import InputText from "primevue/inputtext";
import { useStore } from "vuex";
import { home, messagePageCount } from "@/composable/pageVisited";

export default {
  components: { Button, InputText, Chip },
  setup() {
    const { user } = getUser();
    const { error, documents } = getUsers();
    const { statusHome, morePosts, showMoreBtn } = getPosts("posts");
    const router = useRouter();
    const isLoading = ref(false);
    const store = useStore();

    // comment section
    const seeComments = ref(true);
    const closeComments = ref(false);
    const seeCommentsDocId = ref(null);
    const comment = ref("");
    const docsid = ref(null);
    const { postComments } = useComments("comments");
    const { comments } = getComments(docsid);
    const { commentDel } = commentDelete();
    // end of comment section

    const { info } = getProfile("profiles", user.value.uid);

    const { likePost } = likeSystem();
    const { dislikePost } = dislikeSystem();

    // const formattedDocuments = computed(() => {
    //   if (statusHome.value) {
    //     return statusHome.value.map((doc) => {
    //       let time = format(doc.createdAt.toDate(), "PPPp");
    //       return { ...doc, createdAt: time };
    //     });
    //   }
    // });

    const formattedDocuments = computed(() => {
      if (statusHome.value) {
        return statusHome.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PPPp");
          if (doc.isEdited) {
            let ed = format(doc.editedAt.toDate(), "PPPp");
            return { ...doc, createdAt: time, editedAt: ed };
          } else {
            return { ...doc, createdAt: time };
          }
        });
      }
    });

    // comment section
    const formattedComments = computed(() => {
      if (comments.value) {
        return comments.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });
    const styleBorder = ref(null);
    const seeComment = (id, cmtId) => {
      seeCommentsDocId.value = id;
      const random = Math.random();
      const index = Math.round(random * 280);
      // if ( id === cmtId) {
      // const color = ['blue', '#15b3f3', '#15f67b']
      styleBorder.value = {
        // border: "2x solid black"
        // borderStyle: "solid",
        // borderWidth: "3px",
        // boxShadow: `0 2.8px 2.2px ${colors[index]}`,
        // borderColor: colors[index]
      };
      // }
      seeComments.value = false;
      closeComments.value = true;
      // commentPost(id)
    };
    const closeComment = (id) => {
      seeCommentsDocId.value = id;
      styleBorder.value = {
        // border: "2x solid black"
        borderStyle: "none",
      };
      seeComments.value = true;
      closeComments.value = false;
    };

    const postComment = async (docId, name, userId) => {
      isLoading.value = true;
      docsid.value = docId;
      const docs = {
        docId,
        name,
        userId,
        createdAt: timestamp(),
        comment: comment.value,
      };

      if (comment.value) {
        await postComments(docs);
      }
      comment.value = null;
      isLoading.value = false;
    };

    const deleteCmt = async (id) => {
      await commentDel(id);
    };
    // end of comment section

    const goBack = () => {
      router.push({ name: "Profile", params: { id: user.value.uid } });
    };

    const like = (postId, reacter) => {
      likePost(postId, reacter);
    };

    const dislike = (postIdt, reactert) => {
      dislikePost(postIdt, reactert);
    };

    const messages = async (uid) => {
      await messagePageCount();
      let payload = { name: "Messages", back: "Messages" };
      store.commit("clickOn", payload);
      router.push({ name: "Messages", params: { id: uid } });
    };

    const fullscreenLoading = ref(false);
    const clickedShowMore = ref(true);

    const showMore = async () => {
      clickedShowMore.value = false;
      fullscreenLoading.value = true;

      await morePosts();

      fullscreenLoading.value = false;
      clickedShowMore.value = true;
    };

    onMounted(async () => {
      await home();

      document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#DFE4E0');

    });

    // let i = 0;
    // onUpdated(() => {
    //   if (i !== 0) {
    //     var scrollingElement = document.scrollingElement || document.body;
    //     scrollingElement.scrollTop = scrollingElement.scrollHeight;
    //   }
    //   i++;
    // });

    const metaProfileName = (name) => {
      store.commit("setMetaProfileName", name);
    }

    return {
      goBack,
      user,
      formattedDocuments,
      like,
      dislike,
      seeComment,
      seeComments,
      seeCommentsDocId,
      comment,
      closeComment,
      closeComments,
      postComment,

      deleteCmt,
      formattedComments,
      isLoading,
      styleBorder,
      documents,
      info,
      messages,
      showMore,
      fullscreenLoading,
      showMoreBtn,
      clickedShowMore,
      metaProfileName
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Roboto:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    font-size: 18px;
  }
}

.likeButton {
  background-blend-mode: red !important;
}

.postcard {
  max-width: 550px;
  margin: 10px auto;
}
.post {
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  margin-top: 15px;
}
.name {
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
.name h3 {
  margin-left: 10px;
}

.nameDate {
  line-height: 0.5;
  h3 {
    color: #004f89;
  }
}

.date {
  font-size: 12px;
  margin: 10px;
  color: rgba(0, 80, 137, 0.829);
}

.feeling {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feelinglikedislike {
  display: flex;
}

.feeling p {
  margin: 10px;
  color: gray;
  font-family: "Roboto", sans-serif;
}

.seeComment {
  color: black;
  transition: color 0.2s;
}
.seeComment:hover {
  color: #15b3f3;
}
.closeComment {
  color: black;
  transition: color 0.2s;
}
.closeComment:hover {
  color: #ff191f;
}

.comment-section {
  font-family: "Roboto", sans-serif;
}
.commentDes {
  display: flex;
  align-items: center;
  // flex-direction: column;
  line-height: 0;
}
.comment {
  margin: 10px;
  margin-left: 20px;
  word-wrap: break-all;
  .commentName {
    color: #004f89;
    font-weight: 900;
    font-size: 14px;
  }
  .commentComment {
    margin: 5px;
    margin-left: 10px;
  }
  .commentDate {
    margin-left: 10px;
    font-size: 12px;
    color: gray;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.borderCard {
  // border: 3px solid rgba(0, 0, 255, 0.712);
  border: 3px solid #15b3f3;
}

.profilePic {
  width: 35px;
  height: 35px;
  border-radius: 500px;
  object-fit: cover;
  margin-right: 5px;
}
.navPhoto {
  margin: 0px;
  filter: opacity(70%);
  transition: filter 0.4s;
}
.navPhoto:hover {
  filter: opacity(100%);
}

.showMore {
  text-align: center;
}

.home-footer {
  text-align: center;
  // color: rgb(165, 165, 165);
  color: #c1c8c7;
  cursor: not-allowed;
  user-select: none;
  font-family: "Roboto", sans-serif;
  max-width: 400px;
  margin: 10px auto;
}

.fa-heart {
  color: red;
}

.public-chip {
  background-color: #33dfac;
  color: white;
}

.post-edited-time {
  margin-top: 30px;
}

.edited-date {
  font-family: "Roboto", sans-serif;
  position: relative;
  color: rgb(179, 179, 179);
  font-size: 11px;
  float: right;
  margin-top: -25px;
}
@media (max-width: 425px) {
  .postcard {
    max-width: 320px;
  }
}
</style>
