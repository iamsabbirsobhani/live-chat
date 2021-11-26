<template>
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif"
    class="pghd"
    @back="goBack"
    content="Authentication"
    v-if="masterPass != userMasterPass"
  >
  </el-page-header>
  <div v-if="masterPass == userMasterPass">
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
      <!-- <el-tooltip
      class="item"
      effect="dark"
      content="Click Messages to check inbox"
      placement="left"
    > -->
      <el-menu-item index="2">
        <!-- <Button
        @click="messages(user.uid)"
        label="Messages"
        class="p-button-raised p-button-secondary p-button-text"
      /> -->
        <Button
          @click="openMaximizable"
          label="Messages"
          icon="pi pi-shield"
          class="p-button-raised p-button-secondary p-button-text"
        />
      </el-menu-item>
      <!-- </el-tooltip> -->
    </el-menu>

    <RandomCard />
    <!-- <el-page-header style="margin: 10px;" @back="goBack" content="Profile">
  </el-page-header> -->
    <!-- <h1 style="text-align: center; font-size: 25px">Home</h1> -->
    <div v-if="formattedDocuments">
      <div
        v-for="doc in formattedDocuments"
        :key="doc.userUid"
        class="postcard"
      >
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

            <!-- post -->
            <div class="post-edited-time">
              <p v-if="doc.isEdited" class="edited-date">
                Edited: {{ doc.editedAt }}
              </p>
              <div v-if="doc.postByEditor" v-html="doc.post" class="post"></div>
              <div v-else class="post">
                <!-- <p>{{ doc.post }}</p> -->
                <p v-html="doc.post"></p>
              </div>
            </div>
            <!-- post -->

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

    <Dialog
      header="Authentication"
      v-model:visible="displayMaximizable"
      :style="styleObject"
      :maximizable="true"
      :modal="true"
    >
      <div class="p-m-0">
        <form @submit.prevent="submit">
          <div class="password">
            <el-input
              v-model="password"
              placeholder="Please input password"
              show-password
              required
            />
          </div>
          <p v-if="passwordState" class="empty">Incorrect Password</p>
          <div class="p-btn">
            <Button
              v-if="!disableBtn"
              class="p-btn-b"
              label="Submit"
              type="submit"
            />
            <Button
              v-if="disableBtn"
              icon="pi pi-spin pi-spinner"
              class="p-btn-b"
              disabled="disabled"
              label="Submit"
              type="submit"
            />
          </div>
        </form>
      </div>
      <template #footer> </template>
    </Dialog>
  </div>
  <div v-else>
    <UnauthorizedPage />
  </div>
  <div style="margin: auto; max-width: 600px;" v-if="user.uid == `oJStHj6xShPbVyEFpwmK1B1rjAk2`">
    {{getKey}}
  </div>
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
import { timestamp, messaging } from "../firebase/config";
import InputText from "primevue/inputtext";
import { useStore } from "vuex";
import { home, messagePageCount } from "@/composable/pageVisited";
import RandomCard from "@/components/RandomCard";
import Dialog from "primevue/dialog";
import UnauthorizedPage from "../subComponent/UnauthorizedPage.vue";

export default {
  components: { Button, InputText, Chip, RandomCard, Dialog, UnauthorizedPage },
  setup() {
    const { user } = getUser();
    const disableBtn = ref(false);
    const { error, documents } = getUsers();
    const { statusHome, morePosts, showMoreBtn } = getPosts("posts");
    const router = useRouter();
    const isLoading = ref(false);
    const store = useStore();

    // message athentication variable and functionality
    const displayMaximizable = ref(false);
    const password = ref(null);
    const passwordState = ref(false);

    const submit = async () => {
      disableBtn.value = true;
      passwordState.value = false;
      if (password.value == store.state.messagesPass) {
        passwordState.value = false;
        console.log("Correct Password");
        store.commit("setMessagesPass", password.value);
        // console.log(store.state.userExplorePass);
        password.value = null;
        await messages();
        disableBtn.value = false;
      } else {
        passwordState.value = true;
        store.commit("setMessagesPass", password.value);
        // console.log(store.state.userExplorePass);
        console.log("Wrong Password");
        disableBtn.value = false;
      }
    };

    const messages = async () => {
      await messagePageCount();
      let payload = { name: "Messages", back: "Messages" };
      store.commit("clickOn", payload);
      router.push({ name: "Messages", params: { id: user.value.uid } });
    };
    // message athentication variable and functionality

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
      router.push({ name: "Authentication" });
    };

    const like = (postId, reacter) => {
      likePost(postId, reacter);
    };

    const dislike = (postIdt, reactert) => {
      dislikePost(postIdt, reactert);
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

    const windWidth = ref(null);
    const styleObject = ref(null);
    const getKey = ref(null)
    onMounted(async () => {
      messaging
        .getToken(messaging, {
          vapidKey:
            "BH7ENvckoWYuCSqCVDva-g6odYr_IxBzqR4cZeNcd-nvexFJA9jZ4kRkskKnp8e4R8yMgmZj3q1aSoUqzA1oluw",
        })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            getKey.value = currentToken
            console.log(currentToken)
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });

      await home();

      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#DFE4E0");

      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `50vw`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `90vw`,
        };
      }
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
    };

    const closeMaximizable = () => {
      displayMaximizable.value = false;
    };
    const openMaximizable = () => {
      displayMaximizable.value = true;
    };

    const masterPass = ref(null);
    const userMasterPass = ref(null);
    userMasterPass.value = store.state.userMasterPass;
    masterPass.value = store.state.masterPass;

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
      showMore,
      fullscreenLoading,
      showMoreBtn,
      clickedShowMore,
      metaProfileName,

      openMaximizable,
      displayMaximizable,
      styleObject,
      submit,
      password,
      disableBtn,
      passwordState,
      closeMaximizable,

      masterPass,
      userMasterPass,

      getKey,
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
  word-break: break-all;
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

.p-btn {
  margin: 50px 10px;
  text-align: center;
  .p-btn-b {
  }
  button {
    width: 100% !important;
  }
}

.password {
  margin: 10px 10px;
  input {
    width: 100% !important;
  }
}

.empty {
  color: gray;
}
@media (max-width: 425px) {
  .postcard {
    max-width: 320px;
  }
}
</style>
