<template>
  <div class="profile">
    <div class="profile-card">
      <div class="cover">
        <el-empty v-if="!info.coverPhoto" description=" "></el-empty>
        <img v-else class="cover-photo" :src="info.coverPhoto" alt="cover" />
      </div>
      <div class="button-group">
        <el-dropdown trigger="click">
          <span
            class="el-dropdown-link"
            style="cursor: pointer; font-weight: bold; font-size: 17px"
          >
            Menu<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="home" icon="el-icon-house"
                >Home</el-dropdown-item
              >
              <el-dropdown-item @click="chatroom" icon="el-icon-chat-dot-round"
                >Chatroom</el-dropdown-item
              >
              <el-dropdown-item
                v-if="id == user.uid"
                @click="editProfile"
                icon="el-icon-edit-outline"
                >Edit Profile</el-dropdown-item
              >
              <el-dropdown-item
                v-if="id == user.uid"
                @click="photos"
                icon="el-icon-picture-outline"
                >Cover & Profile Photos</el-dropdown-item
              >
              <el-dropdown-item @click="UserList" icon="pi pi-users"
                >User List</el-dropdown-item
              >
              <el-dropdown-item
                v-if="id == user.uid"
                @click="frList"
                icon="pi pi-user"
                >Friend List</el-dropdown-item
              >
              <el-dropdown-item
                v-if="id == user.uid"
                @click="frReq"
                icon="pi pi-user-plus"
                >Friend Request</el-dropdown-item
              >

              <!-- admin option -->
              <el-dropdown-item
                v-if="`oJStHj6xShPbVyEFpwmK1B1rjAk2` == user.uid"
                @click="userActivity"
                icon="pi pi-file-o"
                >User Activity</el-dropdown-item
              >
              <!-- admin option -->

              <el-dropdown-item @click="signout" icon="pi pi-sign-out"
                >Log out</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="profile-photo-container">
        <el-avatar
          shape="square"
          :size="100"
          :fit="fit"
          :src="info.phofilePhoto"
        ></el-avatar>
      </div>
      <div class="info">
        <el-skeleton :rows="1" v-if="!info.userName" animated />
        <h3 v-else>{{ info.userName }}</h3>
        <p style="line-height: 1.2">{{ info.bio }}</p>
      </div>
    </div>
  </div>
  <div v-if="info" class="add-info">
    <div v-if="info.location" class="place">
      <i class="el-icon-location-outline"></i>
      <p>{{ info.location }}</p>
    </div>
    <div v-if="info.profession" class="profession">
      <i class="el-icon-office-building"></i>
      <p>{{ info.profession }}</p>
    </div>
    <div v-if="info.interest" class="interest">
      <i class="el-icon-loading"></i>
      <p>{{ info.interest }}</p>
    </div>
  </div>

  <!-- post section -->
  <div v-if="id === user.uid" class="status">
    <form>
      <div class="express">
        <el-input
          class="el-input"
          style="display: block"
          placeholder="Express your mind?"
          v-model="input"
        ></el-input>
        <el-button
          v-if="isLoadingStatus"
          type="primary"
          :loading="true"
        ></el-button>
        <el-button
          v-else
          @click="post"
          class="el-button"
          type="primary"
          icon="el-icon-position"
        ></el-button>
      </div>
      <div class="post-choice">
        <div>
          <label for="public">Public</label>
          <Checkbox
            class="cbox"
            @click="publicP"
            value="public"
            v-model="checked"
            :binary="true"
            id="public"
          />
          <label for="private">Private</label>
          <Checkbox
            class="cbox"
            @click="privateP"
            value="private"
            v-model="checked2"
            :binary="true"
            id="public"
          />
        </div>
        <Button
          @click="vueQuillEditor"
          label="Editor"
          class="p-button-help"
          icon="far fa-edit"
        />
        <!-- <div class="image-upload">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <template #default>
              <i class="el-icon-plus"></i>
            </template>
            <template #file="{file}">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                    ><i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div> -->
      </div>
    </form>
  </div>
  <!-- is editor is empty show error-->
  <div class="empty">
    <p>{{ errorEditor }}</p>
  </div>
  <!-- is editor is empty show error-->
  <!-- end post section -->

  <!-- status -->
  <div v-for="doc in formattedDocuments" :key="doc.userUid" class="postcard">
    <el-card
      v-if="doc.post && user.uid == doc.userId"
      shadow="always"
      style="border-radius: 10px"
    >
      <div class="name">
        <el-avatar :size="40">
          <img :src="doc.dp" />
        </el-avatar>
        <div class="nameDate">
          <h3>{{ doc.userName }}</h3>
          <p class="date">{{ doc.createdAt }}</p>
        </div>
        <!-- <el-tooltip
          class="item"
          effect="dark"
          placement="left"
          content="Edit Post"
        > -->
        <div class="delbtn">
          <!-- <Button
              v-if="user.uid == doc.userId"
              icon="pi pi pi-times"
              @click="deleteDoc(doc.id)"
              style="color: red"
              class="p-button-rounded p-button-danger p-button-outlined"
            /> -->
          <Button
            icon="pi pi-ellipsis-v"
            class="p-button-rounded p-button-text"
            @click="openMaximizable(doc.id)"
          />
        </div>
        <!-- </el-tooltip> -->
      </div>

      <div :class="{ 'post-edited-time': doc.isEdited }">
        <p v-if="doc.isEdited" class="edited-date">
          Edited: {{ doc.editedAt }}
        </p>
        <div v-if="doc.postByEditor" v-html="doc.post" class="post"></div>
        <div v-else class="post">
          <!-- <p>{{ doc.post }}</p> -->
          <div v-if="doc.post.match(/mp4|mkv|MP4|MKV|AVI|avi|3gp/)">
            <div>
              <video :style="styleObject" controls muted>
                <source :src="doc.post" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <p v-else v-html="doc.post"></p>
          <!-- <div v-html="doc.post"></div> -->
        </div>
      </div>

      <div
        class="userPost"
        style="display: flex; margin-bottom: 10px; margin-top: 10px;"
      >
        <div>
          <p class="postReact" v-if="doc.like > 0">Liked by {{ doc.like }}</p>

          <p class="postReact" v-if="doc.dislike > 0">
            Disliked by {{ doc.dislike }}
          </p>
          <Chip
            @click="publicToolTip"
            icon="pi pi-lock-open"
            v-if="doc.privacy == `public`"
            label="Public"
            class="p-mr-2 p-mb-2 custom-chip public-chip"
          />
          <Chip
            @click="privateToolTip"
            icon="pi pi-lock"
            v-if="doc.privacy == `private`"
            label="Private"
            class="p-mr-2 p-mb-2 custom-chip private-chip"
          />
          <Chip
            v-if="doc.privacy == ``"
            label="Not Set"
            class="p-mr-2 p-mb-2 custom-chip"
          />
        </div>

        <!-- comment section -->
        <div
          style="
            cursor: pointer;
            font-family: Roboto, sans-serif;
            margin-left: auto;
          "
        >
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

          <div class="comment" v-for="cmt in formattedComments" :key="cmt.id">
            <div class="commentDes">
              <p class="commentName" v-if="cmt.docId === doc.id">
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
                    class="p-button-rounded p-button-danger p-button-outlined p-button-sm"
                  />
                </div>
              </el-tooltip>
            </div>
            <p class="commentComment" v-if="cmt.docId === doc.id">
              {{ cmt.comment }}
            </p>
          </div>

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
              v-if="isLoadingCmt"
              :loading="isLoadingCmt"
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
        <!-- end of comment section -->
      </transition>
    </el-card>
    <!-- <h3 v-else>Nothing</h3> -->

    <!-- public view on profile -->
    <div v-else-if="doc.post && doc.privacy == `public`">
      <el-card shadow="always" style="border-radius: 10px">
        <div class="name">
          <el-avatar :size="40">
            <img :src="doc.dp" />
          </el-avatar>
          <div class="nameDate">
            <h3>{{ doc.userName }}</h3>
            <p class="date">{{ doc.createdAt }}</p>
          </div>
          <el-tooltip
            class="item"
            effect="dark"
            content="Delete Post"
            placement="left"
          >
            <div class="delbtn">
              <Button
                v-if="user.uid == doc.userId"
                icon="pi pi pi-times"
                @click="deleteDoc(doc.id)"
                style="color: red"
                class="p-button-rounded p-button-danger p-button-outlined"
              />
            </div>
          </el-tooltip>
        </div>

        <!-- Post -->
        <div class="post-edited-time">
          <p v-if="doc.isEdited" class="edited-date">
            Edited: {{ doc.editedAt }}
          </p>
          <div v-if="doc.postByEditor" v-html="doc.post" class="post"></div>
          <div v-else>
            <p class="post">{{ doc.post }}</p>
          </div>
        </div>
        <!-- Post -->

        <div style="display: flex">
          <div>
            <p class="postReact" v-if="doc.like > 0">Liked by {{ doc.like }}</p>

            <p class="postReact" v-if="doc.dislike > 0">
              Disliked by {{ doc.dislike }}
            </p>

            <Chip
              @click="publicToolTip"
              icon="pi pi-lock-open"
              v-if="doc.privacy == `public`"
              label="Public"
              class="p-mr-2 p-mb-2 custom-chip public-chip"
            />
            <Chip
              @click="privateToolTip"
              icon="pi pi-lock"
              v-if="doc.privacy == `private`"
              label="Private"
              class="p-mr-2 p-mb-2 custom-chip private-chip"
            />
          </div>

          <!-- comment section -->
          <div
            style="
            cursor: pointer;
            font-family: Roboto, sans-serif;
            margin-left: auto;
          "
          >
            <p
              v-if="seeComments"
              class="seeComment"
              @click="seeComment(doc.id)"
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

            <div class="comment" v-for="cmt in formattedComments" :key="cmt.id">
              <div class="commentDes" v-if="cmt.docId === doc.id">
                <p class="commentName" v-if="cmt.docId === doc.id">
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
                      class="p-button-rounded p-button-danger p-button-outlined p-button-sm"
                    />
                  </div>
                </el-tooltip>
              </div>
              <p class="commentComment" v-if="cmt.docId === doc.id">
                {{ cmt.comment }}
              </p>
            </div>

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
                v-if="isLoadingCmt"
                :loading="isLoadingCmt"
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
          <!-- end of comment section -->
        </transition>
      </el-card>
    </div>
    <!-- end public view on profile -->
  </div>
  <!-- status -->

  <!-- tool tip -->
  <!-- public tool tip -->
  <Dialog
    header="Post privacy (Public)"
    v-model:visible="displayPublicToolTip"
    :style="editPostQuery"
  >
    <div class="privacy-icon-public">
      <i class="pi pi-lock-open" style="fontSize: 4rem;"></i>
    </div>
    <p style="font-size: 20px; text-align: center;">
      Everyone can see this post.
    </p>
    <template #footer>
      <Button
        label="Okay"
        icon="pi pi-check"
        @click="closePublitToolTip"
        autofocus
      />
    </template>
  </Dialog>
  <!-- public tool tip -->

  <!-- private tool tip -->
  <Dialog
    header="Post privacy (Private)"
    v-model:visible="displayPrivateToolTip"
    :style="editPostQuery"
  >
    <div class="privacy-icon-private">
      <i class="pi pi-lock" style="fontSize: 4rem; text-align: center;"></i>
    </div>
    <p style="font-size: 20px; text-align: center;">
      Only you can see this post.
    </p>
    <template #footer>
      <Button
        label="Okay"
        icon="pi pi-check"
        @click="closePrivateToolTip"
        autofocus
      />
    </template>
  </Dialog>
  <!-- private tool tip -->

  <!-- edit post dialog -->
  <Dialog
    header="Edit Post"
    v-model:visible="displayMaximizable"
    :maximizable="true"
    :modal="true"
    :style="editPostQuery"
    class="dialog-edit-post"
  >
    <form>
      <div class="edit-post-form">
        <label for="post">Post:</label>
        <el-input
          type="textarea"
          autosize
          placeholder="Please input"
          v-model="postValue"
        >
        </el-input>
      </div>
    </form>
    <template #footer>
      <div v-if="windowWidth <= 475" class="post-choice-edit-footer-mobile">
        <div class="post-choice-checkbox">
          <div style="display: flex; align-items: center;">
            <label for="public">Public</label>
            <Checkbox
              class="edit-cbox-footer-public cbox"
              @click="publicPostF"
              value="public"
              v-model="checked3"
              :binary="true"
              id="public"
            />
          </div>
          <div style="display: flex; align-items: center;">
            <label for="private">Private</label>
            <Checkbox
              class="edit-cbox-footer-private cbox"
              @click="privatePostF"
              value="private  "
              v-model="checked4"
              :binary="true"
              id="public"
            />
          </div>
        </div>
        <div class="post-choice-button">
          <Button
            style="margin-top: 10px;"
            label="Update"
            icon="pi pi-check"
            @click="closeMaximizable"
          />
          <Button
            style="margin-top: 10px;"
            icon="pi pi pi-times"
            label="Delete "
            @click="deleteDoc"
            class="p-button-danger"
          />
        </div>
      </div>

      <div v-else class="post-choice-edit-footer">
        <label for="public">Public</label>
        <Checkbox
          class="cbox"
          @click="publicPostF"
          value="public"
          v-model="checked3"
          :binary="true"
          id="public"
        />
        <label for="private">Private</label>
        <Checkbox
          class="cbox"
          @click="privatePostF"
          value="private"
          v-model="checked4"
          :binary="true"
          id="public"
        />
        <Button
          style="margin-left: 10px;"
          label="Update"
          icon="pi pi-check"
          @click="closeMaximizable"
        />
        <Button
          icon="pi pi pi-times"
          label="Delete"
          @click="deleteDoc"
          class="p-button-danger"
        />
      </div>
    </template>
  </Dialog>
  <!-- edit post dialog -->

  <Dialog
    header="Add new post"
    v-model:visible="openEditor"
    :style="editPostQuery"
    :maximizable="true"
    :modal="true"
  >
    <QuillEditor
      v-if="openEditor"
      style="height: 320px;"
      contentType="html"
      v-model:content="input"
      toolbar="full"
      theme="snow"
    />
    <div style="margin-top: 10px;">
      <form style="display: flex;">
        <Button
          v-if="isLoadingStatus"
          icon="pi pi-spin pi-spinner"
          label="Post"
          class="p-button-outlined"
        />
        <Button
          v-else
          @click="postByEditor"
          label="Post"
          class="p-button-outlined"
        />
        <div class="post-choice">
          <label for="public" style="margin-left: 10px;">Public</label>
          <Checkbox
            class="cbox"
            @click="publicP"
            value="public"
            v-model="checked"
            :binary="true"
            id="public"
          />
          <label for="private" style="margin-left: 10px;">Private</label>
          <Checkbox
            class="cbox"
            @click="privateP"
            value="private"
            v-model="checked2"
            :binary="true"
            id="public"
          />
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script>
import Textarea from "primevue/textarea";
import ConfirmDialog from "primevue/confirmdialog";
import Chip from "primevue/chip";
import Dialog from "primevue/dialog";
import Checkbox from "primevue/checkbox";
import getProfile from "@/composable/getProfile.js";
import { useRouter, useRoute } from "vue-router";
import { ref, computed, watch, onMounted } from "vue";
import { format, formatDistanceToNow } from "date-fns";
import Button from "primevue/button";
import getUser from "@/composable/getUser.js";
import userPost from "@/composable/userPost.js";
import getPosts from "@/composable/getPosts.js";
import { timestamp } from "../firebase/config";
import useComments from "@/composable/useComments.js";
import getComments from "@/composable/getComments.js";
import commentDelete from "@/composable/commentDelete.js";
import delPost from "@/composable/delPost.js";
import InputText from "primevue/inputtext";
import useLogout from "../composable/useLogout";
import { useStore } from "vuex";
import { getPostById } from "@/composable/getPostById.js";
import { logOutCount } from "@/composable/logOutCount";
// import { profileVisitedBy } from "@/composable/profileVisitedBy";
import {
  profile,
  chatRoom,
  coverAndProfilePhoto,
  editProfilePage,
  userListPage,
  friendListPageCount,
  friendRequestPageCount,
} from "@/composable/pageVisited";
import { profileUpdateField } from "@/composable/profileUpdateField";

export default {
  props: ["id"],
  components: {
    Button,
    InputText,
    Checkbox,
    Dialog,
    Chip,
    ConfirmDialog,
    Textarea,
  },
  setup(props) {
    const { user } = getUser();
    const { info } = getProfile("profiles", props.id);
    const { addPost } = userPost(props.id);
    const { status } = getPosts("posts", props.id);
    const { getP, postP, updatePost, docDel } = getPostById();
    const router = useRouter();
    const route = useRoute();
    const { logout, error } = useLogout();
    const isLoadingCmt = ref(false);
    const store = useStore();

    // variable section
    const checked = ref(true);
    const checked2 = ref(false);
    const checked3 = ref(false);
    const checked4 = ref(false);
    const postPrivacy = ref("public");
    const displayMaximizable = ref(false);
    const windowWidth = ref(window.innerWidth);
    const editPostQuery = ref(null);
    const displayPublicToolTip = ref(false);
    const displayPrivateToolTip = ref(false);
    const editPrivacy = ref(null);
    const openEditor = ref(false);
    let errorEditor = ref("");
    // end variable section

    // comment section
    const seeComments = ref(true);
    const closeComments = ref(false);
    const seeCommentsDocId = ref(null);
    const comment = ref(null);
    const docsid = ref(null);
    const { postComments } = useComments("comments");
    const { comments } = getComments(docsid);
    const { commentDel } = commentDelete();
    // comment section

    const isLoadingStatus = ref(false);

    const input = ref(null);

    const post = async () => {
      isLoadingStatus.value = true;
      // checking if the "input.value" has any value
      function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
      }
      // end of checking if the "input.value" has any value
      if (!isEmptyOrSpaces(input.value)) {
        errorEditor.value = null;
        await addPost({
          userName: user.value.displayName,
          dp: info.value.phofilePhoto,
          userId: props.id,
          post: input.value,
          privacy: postPrivacy.value,
          like: 0,
          dislike: 0,
          likeId: [],
          dislikeId: [],
          createdAt: timestamp(),
          editedAt: timestamp(),
          isEdited: false,
          postByEditor: false,
        });
        await profileUpdateField({ key: "totalPostCount" });
        postPrivacy.value = `public`;
        checked.value = true;
        checked2.value = false;
      } else {
        console.log("Empty");
        postPrivacy.value = `public`;
        checked.value = true;
        checked2.value = false;
        errorEditor.value = `Empty editor, please write something before post.`;
      }
      input.value = null;
      isLoadingStatus.value = false;
    };

    const postByEditor = async () => {
      isLoadingStatus.value = true;

      // checking if the "input.value" has any value
      function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
      }
      // end of checking if the "input.value" has any value
      // if input has image
      // try catch for handling TypeError when empty editor post
      try {
        errorEditor.value = null;
        if (input.value.includes("img")) {
          let ind = input.value.indexOf("img") + 4;
          let stri = input.value;
          // method taken from https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index by user113716
          String.prototype.splice = function(idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
          };
          input.value = stri.splice(
            ind,
            0,
            `style="display: block;max-width: 280px; overflow: hidden; max-height: 400px; margin: auto;"`
          );
          // method taken from https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index by user113716
        }
      } catch (error) {
        console.log(error);
      }
      // if input has image
      if (!isEmptyOrSpaces(input.value)) {
        errorEditor.value = null;
        await addPost({
          userName: user.value.displayName,
          dp: info.value.phofilePhoto,
          userId: props.id,
          post: input.value,
          privacy: postPrivacy.value,
          like: 0,
          dislike: 0,
          likeId: [],
          dislikeId: [],
          createdAt: timestamp(),
          editedAt: timestamp(),
          isEdited: false,
          postByEditor: true,
        });
        await profileUpdateField({ key: "totalPostCount" });
        postPrivacy.value = `public`;
        checked.value = true;
        checked2.value = false;
        openEditor.value = false;
      } else {
        console.log("Empty");
        openEditor.value = false;
        postPrivacy.value = `public`;
        checked.value = true;
        checked2.value = false;
        errorEditor.value = `Empty editor, please write something before post.`;
      }
      input.value = null;
      isLoadingStatus.value = false;
    };

    const formattedDocuments = computed(() => {
      if (status.value) {
        return status.value.map((doc) => {
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
      // await profileVisitedBy(); disabled profile page view count
      isLoadingCmt.value = true;
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
      isLoadingCmt.value = false;
    };
    // end of comment section

    const deleteCmt = async (id) => {
      await commentDel(id);
    };

    const chatroom = async () => {
      await chatRoom();
      router.push({ name: "Chatroom" });
    };

    const editProfile = async () => {
      await editProfilePage();
      router.push({ name: "EditProfile" });
    };

    const UserList = async () => {
      await userListPage();
      router.push({ name: "UserList" });
    };
    const home = () => {
      router.push({ name: "Home" });
    };
    const photos = async () => {
      await coverAndProfilePhoto();
      router.push({ name: "UpdateCoverAndDP" });
    };
    const frReq = async () => {
      await friendRequestPageCount();
      router.push({ name: "FriendRequest" });
    };
    const frList = async () => {
      await friendListPageCount();
      let payload = { name: "FriendList", back: "Friends" };
      store.commit("clickOn", payload);
      router.push({ name: "FriendList" });
    };

    const deleteDoc = async () => {
      await docDel();
      await profileUpdateField({ key: "totalPostDelete" });
      displayMaximizable.value = false;
    };

    const userActivity = () => {
      router.push({ name: "UserActivity" });
    };

    const signout = async () => {
      await logOutCount();

      await logout();

      if (!error.value) {
        console.log("Logged Out");
      }
      router.push({ name: "Welcome" });
    };
    const publicP = () => {
      checked2.value = false;
      checked.value = true;
      if (checked.value == true) {
        postPrivacy.value = "public";
      }
    };

    const privateP = () => {
      checked.value = false;
      checked2.value = true;
      if (checked2.value == true) {
        postPrivacy.value = "private";
      }
    };

    const publicPostF = () => {
      checked4.value = false;
      checked3.value = true;
      if (checked3.value == true) {
        editPrivacy.value = "public";
        // console.log(postPrivacy.value);
      }
    };

    const privatePostF = () => {
      checked4.value = true;
      checked3.value = false;
      if (checked4.value == true) {
        editPrivacy.value = "private";
        // console.log(postPrivacy.value);
      }
    };

    const postValue = ref(null);
    const openMaximizable = (id) => {
      displayMaximizable.value = true;
      checked3.value = false;
      checked4.value = false;
      getP(id);
    };

    const closeMaximizable = async () => {
      await updatePost({
        post: postValue.value,
        privacy: editPrivacy.value,
        editedAt: timestamp(),
        isEdited: true,
      });
      displayMaximizable.value = false;
    };
    // watching value update for postP and postValue
    watch(postP, (newPostP) => {
      postValue.value = newPostP.post;
      if (newPostP.privacy == `public`) {
        checked3.value = true;
        editPrivacy.value = `public`;
      } else if (newPostP.privacy == `private`) {
        checked4.value = true;
        editPrivacy.value = `private`;
      }
    });
    // watching value update for postP and postValue

    // Dialog resize/responsive by screen size
    // media query using code

    const windWidth = ref(null);
    const styleObject = ref(null);
    onMounted(async () => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `450px`,
          // height: `400px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `280px`,
          // height: `240px`,
        };
      }

      // console.log(route.params.id, user.value.uid)
      // console.log(windowWidth.value);
      await profile();
      let style = {
        width: "60vw",
      };
      let style2 = {
        width: "100vw",
      };

      if (windowWidth.value > 600) {
        editPostQuery.value = style;
      } else {
        editPostQuery.value = style2;
      }

      // for dark mode
      document.body.style.backgroundColor = "white";

      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#DFE4E0");
    });
    // media query using code
    // end Dialog resize/responsive by screen size

    // post privacy tool tip dialog
    const publicToolTip = () => {
      displayPublicToolTip.value = true;
    };
    const privateToolTip = () => {
      displayPrivateToolTip.value = true;
    };

    const closePublitToolTip = () => {
      displayPublicToolTip.value = false;
    };

    const closePrivateToolTip = () => {
      displayPrivateToolTip.value = false;
    };
    // post privacy tool tip dialog

    const vueQuillEditor = async () => {
      openEditor.value = true;
      // await profileUpdateField({ key: "editorUsed" });
    };

    return {
      info,
      chatroom,
      editProfile,
      user,
      UserList,
      input,
      post,
      isLoadingStatus,
      home,
      status,
      formattedDocuments,
      deleteDoc,
      photos,
      frReq,
      frList,

      seeComment,
      seeComments,
      seeCommentsDocId,
      comment,
      closeComment,
      closeComments,
      postComment,
      deleteCmt,
      formattedComments,

      signout,
      isLoadingCmt,

      checked,
      checked2,
      checked3,
      checked4,
      publicP,
      privateP,

      openMaximizable,
      closeMaximizable,
      displayMaximizable,
      editPostQuery,

      postP,
      postValue,

      publicToolTip,
      privateToolTip,
      closePublitToolTip,
      displayPublicToolTip,
      closePrivateToolTip,
      displayPrivateToolTip,

      publicPostF,
      privatePostF,
      userActivity,
      openEditor,
      postByEditor,
      errorEditor,
      windowWidth,
      vueQuillEditor,

      styleObject
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");

.profile {
  //  font-family: 'Roboto', sans-serif;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 180px;
}
.profile-card {
  max-width: 600px;
  max-height: 200px;
  margin: 0px auto;
}
.cover {
  max-width: 600px;
  height: 200px;
}
.cover-photo {
  border-radius: 0px 0px 10px 10px;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.profile-photo {
  height: 100%;
  width: 100%;
  border-radius: 100px;
  border: 2px solid white;
}
.profile-photo-container {
  height: 110px;
  width: 110px;
  margin: auto;
  margin-top: -80px;
}
.info {
  text-align: center;
  line-height: 0.5;
}
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
.add-info {
  display: flex;
  justify-content: space-around;
  // align-items: center;
  max-width: 600px;
  margin: auto;
}
.place {
  text-align: center;
}

.profession {
  text-align: center;
}

.interest {
  text-align: center;
}

.status {
  display: flex;
  max-width: 300px;
  margin: 5px auto;
  .el-button {
    margin-left: 10px;
    height: 25px;
  }
}

// status card
.postcard {
  max-width: 500px;
  margin: 20px auto;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}

.post {
  // max-width: 300px;
  // max-height: 200px;
  font-size: 16px;
  word-break: break-all;
}

.post.add {
  margin-top: 25px;
}

.nameDate {
  line-height: 1;
  align-self: center;
  color: #004f89;
}
.nameDate h3 {
  margin: 10px;
}

.date {
  font-size: 12px;
  margin: 10px;
  color: rgba(0, 80, 137, 0.829);
}
.name {
  display: flex;
  align-items: center;
}
/* New Tricks: On display flex, if its item(child) set margin-left: auto;
it will be positioned auto left */
.delbtn {
  margin-left: auto;
}

.postReact {
  color: rgb(121, 121, 121);
  font-size: 13px;
}
// status card

// comments
.seeComment {
  color: gray;
  transition: color 0.2s;
}
.seeComment:hover {
  color: #15b3f3;
}
.closeComment {
  color: gray;
  transition: color 0.2s;
}
.closeComment:hover {
  color: #ff191f;
}

.commentDes {
  display: flex;
  align-items: center;
  // flex-direction: column;
  line-height: 0;
}
.comment {
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

// end comments

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.express {
  display: flex;
  margin-bottom: 10px;
}

.post-choice {
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  // margin-top: 10px;
  label {
    margin-right: 10px;
  }
  .cbox {
    margin-right: 10px;
  }
}

.post-choice-edit {
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  margin-top: 10px;
  label {
    margin-right: 10px;
  }
  .cbox {
    margin-right: 10px;
  }
}
.post-choice-edit-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Roboto", sans-serif;
  margin-top: 10px;
  label {
    margin-right: 10px;
  }
  .cbox {
    margin-right: 10px;
  }
}

.edit-post-form {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
}

.public-chip {
  background-color: #33dfac;
  color: white;
}
.private-chip {
  background-color: #02060b;
  color: white;
}

.privacy-icon-public {
  margin: 10px;
  text-align: center;
  .pi-lock-open {
    color: #335c67;
  }
}
.privacy-icon-private {
  margin: 10px;
  text-align: center;
  .pi-lock {
    color: #e13834;
  }
}

.image-upload {
  width: 100px;
}

.edited-date {
  position: relative;
  color: rgb(179, 179, 179);
  font-size: 11px;
  float: right;
  margin-top: -25px;
}

.post-edited-time {
  margin-top: 30px;
}

.userPost {
  p {
    img {
      width: 500px;
    }
  }
}
@media (max-width: 425px) {
  .place {
    max-width: 150px;
    word-wrap: break-word;
    padding: 5px;
  }

  .profession {
    max-width: 150px;
    word-wrap: break-word;
    padding: 5px;
  }

  .interest {
    max-width: 150px;
    word-wrap: break-word;
    padding: 5px;
  }
  .add-info {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    max-width: 320px;
  }
  .postcard {
    max-width: 320px;
  }
  .postReact {
    color: rgb(121, 121, 121);
    font-size: 14px;
  }
  .empty {
    width: 300px;
    margin: auto;
  }
  .post-choice-edit-footer-mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-choice-checkbox {
    margin: 10px;
  }
  .edit-cbox-footer-public {
    margin: 10px;
    label {
      margin: 10px;
    }
  }
  .edit-cbox-footer-private {
    margin: 10px;
    label {
      margin: 10px;
    }
  }
}
</style>
