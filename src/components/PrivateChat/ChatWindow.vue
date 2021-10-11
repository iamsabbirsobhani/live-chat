<template>
  <div
    class="chat-windows "
    :class="{ chatMessagesDark: isDark, chatMessages: !isDark }"
    ref="messages"
  >
    <div v-if="error">{{ error }}</div>
    <el-skeleton :rows="15" animated v-if="!documents" />
    <div v-if="documents">
      <!-- self user -->
      <div v-for="doc in formattedDocuments" :key="doc.id">
        <div v-if="doc.to == userTo && doc.userId == user.uid">
          <div class="single" style="margin-bottom: 4px; margin-top: 4px">
            <div
              @click="showDateSelf(doc.id)"
              v-if="doc.to == userTo && doc.userId == user.uid"
              class="pvtSelfUser"
              style="max-width: 90%"
            >
              <div
                v-if="
                  doc.message !== `${doc.name} unsent a message` &&
                    doc.message !== `${doc.name} unsent an image or a video`
                "
                style="max-width: 100%; text-align: end"
              >
                <Chip
                  style="text-align: start"
                  :label="doc.message"
                  v-if="doc.message"
                  class="p-mr-2 p-mb-2 custom-chip self-solid-text"
                />
              </div>
              <div style="max-width: 100%; text-align: end" v-else>
                <Chip
                  style="text-align: start"
                  v-if="
                    doc.message &&
                      doc.userId === user.uid &&
                      doc.imgUrl !== null
                  "
                  label="You unsent a message"
                  class="p-mr-2 p-mb-2 unsentChat"
                />
                <Chip
                  style="text-align: start"
                  v-else
                  label="You unsent an image or a video"
                  class="p-mr-2 p-mb-2 unsentChat"
                />
              </div>
              <!-- element-plus Image Preview -->
              <div v-if="doc.imgUrl" class="pvtSelfUser demo-image__preview">
                <!-- <div v-if="doc.imgUrl.includes(`mp4`) || doc.imgUrl.includes(`MP4`) || doc.imgUrl.includes(`MKV`) || doc.imgUrl.includes(`mkv`)"> -->
                <div v-if="doc.imgUrl.match(/mp4|mkv|MP4|MKV|AVI|avi|3gp/)">
                  <video :style="styleObject" controls>
                    <source :src="doc.imgUrl" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <el-image
                  v-else
                  class="images"
                  :src="doc.imgUrl"
                  :preview-src-list="esourceList"
                >
                </el-image>
                <transition name="slide-fade">
                  <span
                    style="margin-left: 5px; margin-right: 5px"
                    class="created-at"
                    >{{ doc.createdAt }} ago by you
                    <span
                      v-if="user.uid === doc.userId && doc.imgUrl"
                      class="chatDelete"
                      @click="chatDel(doc.id, doc.imgUrl, doc.name)"
                      >Unsent</span
                    ></span
                  >
                </transition>
              </div>
              <!-- end of element-plus Image Preview -->
              <transition name="slide-fade">
                <span
                  style="margin-left: 5px; margin-right: 5px"
                  class="created-at"
                  v-if="shoSelf && doc.id == idsSelf && !doc.imgUrl"
                  >{{ doc.createdAt }} by you

                  <!-- doesnt work, dont know why! -->
                  <!-- v-if="
                      user.uid === doc.userId && !doc.message.includes(`unsent`)
                    " -->
                  <!-- end doesnt work, dont know why! -->

                  <span class="deleteTime" v-if="doc.deletedAt">
                    <br />
                    Unsent {{ doc.deletedAt }}</span
                  >
                  <span
                    v-if="
                      user.uid === doc.userId &&
                        doc.message !== `${doc.name} unsent a message` &&
                        doc.message !== `${doc.name} unsent an image or a video`
                    "
                    class="chatDelete"
                    @click="chatDel(doc.id, doc.imgUrl, doc.name)"
                    >Unsent</span
                  ></span
                >
              </transition>
            </div>
          </div>
        </div>

        <!-- end of self user -->

        <!-- other user -->
        <div
          style="margin-bottom: 8px"
          v-if="doc.to == user.uid && doc.userId == userTo"
          @click="showDateOther(doc.id)"
        >
          <div
            v-if="
              doc.message !== `${doc.name} unsent a message` &&
                doc.message !== `${doc.name} unsent an image or a video`
            "
            style="max-width: 90%"
            class="pvtOtherUser"
          >
            <div v-if="doc.createdAt.includes('Just')">
              <Chip
                class="othermsg-just"
                v-if="doc.message"
                :label="doc.message"
              />
            </div>
            <div v-else>
              <Chip class="othermsg" v-if="doc.message" :label="doc.message" />
            </div>

            <!-- element-plus Image Preview -->
            <div v-if="doc.imgUrl" class="pvtSelfUser demo-image__preview">
              <!-- <div v-if="doc.imgUrl.includes(`mp4`) || doc.imgUrl.includes(`MP4`) || doc.imgUrl.includes(`MKV`) || doc.imgUrl.includes(`mkv`)"> -->
              <div v-if="doc.imgUrl.match(/mp4|mkv|MP4|MKV|AVI|avi|3gp/)">
                <video :style="styleObject" width="280" height="240" controls>
                  <source :src="doc.imgUrl" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <el-image
                v-else
                class="images"
                :src="doc.imgUrl"
                :preview-src-list="esourceList"
              >
              </el-image>
            </div>
            <!-- end of element-plus Image Preview -->
          </div>
          <div style="max-width: 100%; text-align: start" v-else>
            <Chip
              style="text-align: start"
              v-if="doc.message"
              :label="doc.message"
              class="p-mr-2 p-mb-2 unsentChat"
            />
          </div>

          <transition name="slide-fade">
            <span
              style="margin-right: 5px"
              class="created-at"
              v-if="shoOther && doc.id == idsOther"
              >{{ doc.createdAt }} by {{ doc.name }}
              <span class="deleteTime" v-if="doc.deletedAt">
                <br />Unsent {{ doc.deletedAt }}</span
              >
            </span>
          </transition>
        </div>

        <!-- end of other user -->
      </div>

      <!-- facebook typing indicator -->
      <div v-if="type">
        <div v-if="type.typeTo == user.uid && type.isType" class="ticontainer">
          <div class="tiblock">
            <div class="tidot1"></div>
            <div class="tidot2"></div>
            <div class="tidot3"></div>
          </div>
        </div>
      </div>
      <!-- end of facebook typing indicator -->
    </div>

    <!-- Primevue Error Popup -->
    <div v-if="!error">
      <Dialog
        header="Network Error"
        v-model:visible="displayConfirmation"
        :style="{ width: '350px' }"
        :modal="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          />
          <span>{{ error }}</span>
        </div>
        <template #footer> </template>
      </Dialog>
    </div>
    <!-- End of Primevue Error Popup -->
  </div>
</template>

<script>
import Chip from "primevue/chip";
import Tag from "primevue/tag";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { formatDistanceToNow, format } from "date-fns";
import getCollection from "@/composable/PrivateChat/getCollection";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import getUser from "@/composable/getUser.js";
import ScrollPanel from "primevue/scrollpanel";
import { deleteChat } from "@/composable/PrivateChat/deleteChat.js";
import { profileUpdateField } from "@/composable/profileUpdateField";
import getTypeStatus from "@/composable/PrivateChat/getTypeStatus";
import { mapGetters } from "vuex";

export default {
  props: ["userTo"],
  components: { Dialog, Button, Chip, ScrollPanel, Tag },
  setup(props) {
    const { user } = getUser();
    const { performDelete } = deleteChat();

    const { error, documents, esourceList } = getCollection(
      "privateChat",
      props.userTo,
      user.value.uid
    );

    const displayConfirmation = ref(false);

    const { type } = getTypeStatus(props.userTo);

    watch(error, (newErrorValue) => {
      if (newErrorValue) {
        displayConfirmation.value = true;
      }
    });

    //When to use Computed Properties?
    //Ans: Sometimes, When situation like this in here we are going to use Computed Property.
    //Computed properties allow us to define a property that is used the
    //same way as data , but can also have some custom logic that is cached
    // based on its dependencies. ... If we want to add a bit of
    //functionality each time something changes, or respond to a particular
    //change, we could watch a property and apply some logic.
    const backStyle = ref(null);
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          // createdAt
          let timeAgo = formatDistanceToNow(doc.createdAt.toDate());
          let timeFormat = format(doc.createdAt.toDate(), "PPp");
          if (doc.createdAt && !doc.deletedAt) {
            if (timeAgo.includes("less")) {
              return { ...doc, createdAt: `Just now` };
            } else if (
              !timeAgo.includes("hour") &&
              !timeAgo.includes("day") &&
              !timeAgo.includes("month") &&
              !timeAgo.includes("year")
            ) {
              return { ...doc, createdAt: `${timeAgo} ago` };
            } else {
              return { ...doc, createdAt: `${timeFormat}` };
            }
          }

          // deletedAt
          if (doc.createdAt && doc.deletedAt) {
            let timeAgoDel = formatDistanceToNow(doc.deletedAt.toDate());
            let timeFormatDel = format(doc.deletedAt.toDate(), "PPp");
            if (
              !timeAgo.includes("hour") &&
              !timeAgo.includes("day") &&
              !timeAgo.includes("month") &&
              !timeAgo.includes("year")
            ) {
              return {
                ...doc,
                createdAt: `${timeAgo} ago`,
                deletedAt: `${timeAgoDel} ago`,
              };
            } else {
              return {
                ...doc,
                createdAt: `${timeFormat}`,
                deletedAt: `on ${timeFormatDel}`,
              };
            }
          }
        });
      }
    });

    // const deletedTime = computed(() => {
    //   return formatDistanceToNow(deltime.toDate());
    // })

    //Auto Scrolling
    const messages = ref(null);

    onUpdated(() => {
      const time = setInterval(() => {
        messages.value.scrollTop = messages.value.scrollHeight;
        // messages.value.scrollHeight;
      }, 10);
      setTimeout(() => {
        clearInterval(time);
      }, 5000);
      //for getting scrollTop
      //the container should have css properties,
      //height: whatever;
      //overflow: auto;    or
      //max-height: whatever;
      //overflow-y: auto;
    });
    //End of Auto Scrolling

    const shoSelf = ref(false);
    const idsSelf = ref(null);
    let oldIdSelf;

    const showDateSelf = (id) => {
      oldIdSelf === id
        ? (shoSelf.value = !shoSelf.value)
        : (shoSelf.value = true);
      idsSelf.value = id;
      oldIdSelf = id;
    };

    const shoOther = ref(false);
    const idsOther = ref(null);
    let oldIdOther;

    const showDateOther = (id) => {
      oldIdOther === id
        ? (shoOther.value = !shoOther.value)
        : (shoOther.value = true);
      idsOther.value = id;
      oldIdOther = id;
    };

    const chatDel = async (id, img, docName) => {
      if (!img) {
        // await profileUpdateField({ key: "chatDeleted" });
        performDelete(id, { url: false, name: docName });
      }
      if (img) {
        await profileUpdateField({ key: "imgDeleted" });
        performDelete(id, { url: true, name: docName });
      }
    };

    const windWidth = ref(null);
    const styleObject = ref(null);
    onMounted(() => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `310px`,
          // height: `240px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `280px`,
          // height: `240px`,
        };
      }
    });

    return {
      error,
      documents,
      formattedDocuments,
      messages,
      displayConfirmation,
      esourceList,
      user,
      type,
      showDateSelf,
      shoSelf,
      idsSelf,
      showDateOther,
      shoOther,
      idsOther,
      chatDel,
      styleObject,
    };
  },
  computed: {
    ...mapGetters(["isDark"]),
  },
};
</script>

<style lang="scss" scoped>
// transition for msg time
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
// end transition for msg time

.p-chip.custom-chip {
  // background: var(--primary-color);
  background-color: rgb(0, 132, 255);
  color: var(--primary-color-text);
  margin-right: 5px;
  margin-bottom: 3px;
  word-break: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.chat-windows {
  padding: 10px 10px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 4px;
  z-index: -1;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.chatMessages,
.chatMessagesDark {
  max-height: 485px;
  overflow: auto;
}
.message {
  word-wrap: break-word;
}
/* Scrollbar Style */
header {
  font-family: "Lobster", cursive;
  text-align: center;
  font-size: 25px;
}

#info {
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-bottom: 25px;
}

a {
  color: #074e8c;
}

.scrollbar {
  margin-left: 30px;
  float: left;
  height: 300px;
  width: 65px;
  background: #f5f5f5;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 450px;
}

#wrapper {
  text-align: center;
  width: 500px;
  margin: auto;
}

.chatMessages::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
  // background-color:black;
}

.chatMessages::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.chatMessagesDark::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: black;
}
.chatMessagesDark::-webkit-scrollbar {
  width: 5px;
  background-color: black;
}

.chatMessages::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.pvtSelfUser .images {
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  display: block;
  border-radius: 10px;
  margin-right: 5px;
}

.pvtOtherUser .images {
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  display: block;
  border-radius: 10px;
}

.single {
  display: flex;
  flex-direction: column;
}

.pvtSelfUser {
  align-self: flex-end;
}

.pvtSelfUser .message-wraper {
  max-width: 180px;
  border-radius: 25px;
  padding: 1px;
  background-color: #0086f9;
  margin-right: 5px;
}
.pvtOtherUser .message-wraper {
  max-width: 180px;
  border-radius: 25px;
  padding: 5px;
  background-color: #e4e6eb;
}

.pvtOtherUser {
  word-wrap: break-word !important;
}

.pvtSelfUser .message {
  color: white;
  font-weight: bold;
  margin-left: 20px;
}

.pvtOtherUser .message {
  color: rgb(63, 63, 63);
  font-weight: bold;
}

.message {
  margin-left: 10px;
}

.pvtSelfUser p {
  margin: 8px;
}

.pvtSelfUser span {
}

.pvtOtherUser p {
  margin: 8px;
}

.pvtOtherUser .name {
  color: #02060b;
}

.othermsg {
  color: #050505;
  background: #e4e6eb;
  margin-bottom: 3px;
  word-break: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.p-mr-2 {
  // color: black;
  //   -webkit-text-fill-color: white;
  //   -webkit-text-stroke-width: .1px;
  //   -webkit-text-stroke-color: black;
}

/* End of Scrollbar Style */

/* facebook typing indicator */

.tiblock {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 17px;
  // background-color: #dee2e6;
  // background-color: #dee2e6;
  border: 2px solid rgb(0, 132, 255);
  background-color: rgb(250, 247, 247);
  width: 9%;
  padding: 5px;
  height: 30px;
  border-radius: 50px;
}

.ticontainer {
  // background-color: #90949c;
  // background-color: #0256fd;
}

.tidot1 {
  background-color: rgb(69, 165, 255);
}
.tidot2 {
  background-color: rgb(41, 152, 255);
}
.tidot3 {
  background-color: rgb(17, 140, 255);
}

.tidot1,
.tidot2,
.tidot3 {
  -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
  border-radius: 7px;
  display: inline-block;
  height: 6px;
  width: 6px;
  margin: 2px auto;
}

@-webkit-keyframes mercuryTypingAnimation {
  0% {
    -webkit-transform: translateY(0px);
  }
  28% {
    -webkit-transform: translateY(-5px);
  }
  44% {
    -webkit-transform: translateY(0px);
  }
}

.tidot1:nth-child(1) {
  -webkit-animation-delay: 200ms;
}
.tidot2:nth-child(2) {
  -webkit-animation-delay: 300ms;
}
.tidot3:nth-child(3) {
  -webkit-animation-delay: 400ms;
}
/* end of facebook typing indicator */

.chat-windows {
  padding: 3px;
}
.chatMessages,
.chatMessagesDark {
  padding: 3px;
}
.cwindows {
  padding: 3px;
}
@media (max-width: 425px) {
  .images {
    max-width: 200px;
    max-height: 250px;
    overflow: hidden;
    display: block;
  }
  .chatMessages,
  .chatMessagesDark {
    // max-height: 390px;
    max-height: 520px;
    overflow: auto;
  }
  .tiblock {
    width: 14%;
  }
  .pvtOtherUser .images {
    max-width: 200px;
  }
  .pvtSelfUser .images {
    max-width: 200px;
  }
}
</style>
