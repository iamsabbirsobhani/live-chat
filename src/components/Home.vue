<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    style="font-family: Roboto, sans-serif; "
  >
    <el-tooltip class="item" effect="dark" content="Click on name to go profile" placement="right">
    <el-menu-item index="1">
      <router-link :to="{ name: 'Profile', params: { id: user.uid } }">
        {{ user.displayName }}
      </router-link>
    </el-menu-item>
        </el-tooltip>
  </el-menu>

  <!-- <el-page-header style="margin: 10px;" @back="goBack" content="Profile">
  </el-page-header> -->
  <!-- <h1 style="text-align: center; font-size: 25px">Home</h1> -->
  <div v-for="doc in formattedDocuments" :key="doc.userUid" class="postcard">
    <el-card v-if="doc.post" shadow="always" style="border-radius: 10px">
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
        <div class="feelinglikedislike">
          <Button
            @click.stop="like(doc.id, user.uid)"
            icon="pi pi-thumbs-up"
            class="p-button-rounded p-button-text"
          />
          <p>{{ doc.like }}</p>
          <Button
            @click.stop="dislike(doc.id, user.uid)"
            style="color: red"
            icon="pi pi-thumbs-down"
            class="p-button-rounded p-button-danger p-button-text"
          />
          <p style="display: inline">{{ doc.dislike }}</p>
        </div>
        <!-- comments -->
        <div style="cursor: pointer; font-family: Roboto, sans-serif">
          <p v-if="seeComments" class="seeComment" @click="seeComment(doc.id)">
            See Comments
          </p>
          <p
            v-if="closeComments && doc.id === seeCommentsDocId"
            class="closeComment"
            @click="closeComment(doc.id)"
          >
            Close
          </p>
           <el-tooltip class="item" effect="dark" content="To see comments please close the other comment section" placement="top">
          <div>
          <p
            style="cursor: text"
            v-if="closeComments && !(doc.id === seeCommentsDocId)"
          >
            See comments
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

        <div class="comment" v-for="cmt in formattedComments" :key="cmt.id">
          <div class="commentDes">
            <p class="commentName" v-if="cmt.docId === doc.id">
              {{ cmt.name }}
            </p>
            <p class="commentDate" v-if="cmt.docId === doc.id">
              {{ cmt.createdAt }}
            </p>
            <el-tooltip class="item" effect="dark" content="Delete Comment" placement="left">
            <div style="margin-left: auto">
            <Button
              v-if="cmt.docId === doc.id && user.uid === cmt.userId"
              icon="pi pi pi-times"
              style="color: red; margin-left: auto"
              @click="deleteCmt(cmt.id)"
              class="p-button-rounded p-button-danger p-button-outlined p-button-sm"
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
            placeholder="Please enter comment"
            type="text"
            v-model.trim="comment"
          />
           <el-button style="margin-top: 10px" class="button" v-if="isLoading" :loading="isLoading">Loading</el-button>
          <el-button
          v-else
            @click="postComment(doc.id, user.displayName, user.uid)"
            style="margin-top: 10px"
            >Comment</el-button
          >
        </div>
      </div>
        </transition>
      <!-- comments -->
    </el-card>
  </div>
</template>

<script>
import getUser from "@/composable/getUser.js";
import getPosts from "@/composable/getPosts.js";
import getUsers from "@/composable/getUsers.js";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { computed, ref } from "vue";
import { format, formatDistanceToNow } from "date-fns";
import likeSystem from "@/composable/likeSystem.js";
import dislikeSystem from "@/composable/dislikeSystem.js";
import useComments from "@/composable/useComments.js";
import getComments from "@/composable/getComments.js";
import commentDelete from "@/composable/commentDelete.js";
import { timestamp } from "../firebase/config";
import InputText from "primevue/inputtext";

export default {
  components: { Button, InputText },
  setup() {
    const { user } = getUser();
    const { error, documents } = getUsers();
    const { statusHome } = getPosts("posts");
    const router = useRouter();
    const isLoading = ref(false)

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

    const { likePost } = likeSystem();
    const { dislikePost } = dislikeSystem();

    const formattedDocuments = computed(() => {
      if (statusHome.value) {
        return statusHome.value.map((doc) => {
          let time = format(doc.createdAt.toDate(), "PPPPp");
          return { ...doc, createdAt: time };
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

    const seeComment = (id) => {
      seeCommentsDocId.value = id;
      seeComments.value = false;
      closeComments.value = true;
      // commentPost(id)
    };
    const closeComment = (id) => {
      seeCommentsDocId.value = id;
      seeComments.value = true;
      closeComments.value = false;
    };

    const postComment = async (docId, name, userId) => {
      isLoading.value = true
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
      isLoading.value = false
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
      isLoading
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Roboto:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
.el-menu-demo{
  a{
  text-decoration: none;
  font-size: 18px;
  }
}

.postcard {
  max-width: 550px;
  margin: 10px auto;
}
.post {
  font-size: 16px;
  font-family: "Roboto", sans-serif;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


@media (max-width: 425px) {
  .postcard {
    max-width: 320px;
  }
}
</style>