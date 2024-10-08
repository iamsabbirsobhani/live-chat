<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <el-skeleton :rows="9" animated v-if="!documents" />
    <div v-if="documents" ref="messages" class="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <!-- self user -->

        <div
          style="max-width: 90%"
          v-if="user.uid == doc.userId && !doc.to"
          class="selfUser"
        >
          <div class="name-wraper" style="width: 100%; text-align: end"></div>
          <div style="max-width: 100%; text-align: end">
            <!-- v-if="doc.message && !doc.to" -->
            <Chip
              style="text-align: start"
              v-if="doc.message"
              :label="doc.message"
              class="p-mr-2 p-mb-2 custom-chip"
            />
          </div>
          <!-- element-plus Image Preview -->
          <div v-if="doc.imgUrl" class="selfUser demo-image__preview">
            <el-image
              class="images"
              :src="doc.imgUrl"
              :preview-src-list="esourceList"
            >
            </el-image>
          </div>
          <!-- end of element-plus Image Preview -->
          <span style="margin-left: 5px; margin-right: 5px" class="created-at"
            >{{ doc.createdAt }} ago by you</span
          >
        </div>

        <!-- end of self user -->

        <!-- other user -->

        <div style="max-width: 90%" v-else class="otherUser">
          <!-- overflow-x: hidden; -->
          <Chip class="othermsg" v-if="doc.message" :label="doc.message" />

          <!-- element-plus Image Preview -->
          <div v-if="doc.imgUrl" class="selfUser demo-image__preview">
            <el-image
              class="images"
              :src="doc.imgUrl"
              :preview-src-list="esourceList"
            >
            </el-image>
          </div>
          <!-- end of element-plus Image Preview -->

          <span style="margin-right: 5px" class="created-at"
            >{{ doc.createdAt }} ago by {{ doc.name }}</span
          >
        </div>

        <!-- end of other user -->
      </div>

      <!-- facebook typing indicator -->
      <div v-if="type.user !== user.uid && type.isType" class="ticontainer">
        <div class="tiblock">
          <div class="tidot"></div>
          <div class="tidot"></div>
          <div class="tidot"></div>
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
import { computed, onUpdated, ref, watch } from "vue";
import { formatDistanceToNow, format } from "date-fns";
import getCollection from "../composable/getCollection";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import getUser from "@/composable/getUser.js";
import ScrollPanel from "primevue/scrollpanel";

import getTypeStatus from "../composable/getTypeStatus";
export default {
  components: { Dialog, Button, Chip, ScrollPanel },
  setup() {
    const { error, documents, esourceList } = getCollection("messages");

    const displayConfirmation = ref(false);

    const { type } = getTypeStatus();

    const { user } = getUser();

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

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let timeAgo = formatDistanceToNow(doc.createdAt.toDate());
          let timeFormat = format(doc.createdAt.toDate(), "PPp");
          if (!timeAgo.includes("hour") && !timeAgo.includes("day") && !timeAgo.includes("month") && !timeAgo.includes("year")) {
            return { ...doc, createdAt: `${timeAgo}` };
          } else {
            return { ...doc, createdAt: `${timeFormat}` };
          }
        });
      }
    });

    //Auto Scrolling
    const messages = ref(null);

    onUpdated(() => {
      const time = setInterval(() => {
        messages.value.scrollTop = messages.value.scrollHeight;
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

    return {
      error,
      documents,
      formattedDocuments,
      messages,
      displayConfirmation,
      esourceList,
      user,
      type,
    };
  },
};
</script>

<style lang="scss" scoped>
.p-chip.custom-chip {
  background: var(--primary-color);
  color: var(--primary-color-text);
  margin-right: 5px;
  margin-bottom: 3px;
}

.chat-window {
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
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 380px;
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

.messages::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.messages::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.messages::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // background-color: #d62929;
  // background-color: #838383;
  // background-color: #b6b6b6a9;
  // background-color: #e4e4e41e;
}

.selfUser .images {
  max-width: 200px;
  max-height: 400px;
  overflow: hidden;
  display: block;
  border-radius: 10px;
  margin-right: 5px;
}

.otherUser .images {
  max-width: 200px;
  max-height: 400px;
  overflow: hidden;
  display: block;
  border-radius: 10px;
}

.single {
  display: flex;
  flex-direction: column;
}

.selfUser {
  align-self: flex-end;
}

.selfUser .message-wraper {
  max-width: 180px;
  border-radius: 25px;
  padding: 1px;
  background-color: #0086f9;
  margin-right: 5px;
}
.otherUser .message-wraper {
  max-width: 180px;
  border-radius: 25px;
  padding: 5px;
  background-color: #e4e6eb;
}

.otherUser {
  word-wrap: break-word !important;
}

.selfUser .message {
  color: white;
  font-weight: bold;
  margin-left: 20px;
}

.otherUser .message {
  color: rgb(63, 63, 63);
  font-weight: bold;
}

.message {
  margin-left: 10px;
}

.selfUser p {
  margin: 8px;
}

.selfUser span {
}

.otherUser p {
  margin: 8px;
}

.otherUser .name {
  color: #02060b;
}

/* facebook typing indicator */

.tiblock {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 17px;
  background-color: #dee2e6;
  width: 9%;
  padding: 5px;
  height: 30px;
  border-radius: 50px;
}

.ticontainer .tidot {
  background-color: #90949c;
}

.tidot {
  -webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
  border-radius: 7px;
  display: inline-block;
  height: 6px;
  width: 6px;
  // margin-right: 2px;
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

.tidot:nth-child(1) {
  -webkit-animation-delay: 200ms;
}
.tidot:nth-child(2) {
  -webkit-animation-delay: 300ms;
}
.tidot:nth-child(3) {
  -webkit-animation-delay: 400ms;
}
/* end of facebook typing indicator */

@media (max-width: 425px) {
  .images {
    max-width: 200px;
    max-height: 250px;
    overflow: hidden;
    display: block;
  }
  .messages {
    max-height: 390px;
    overflow: auto;
  }
  .tiblock {
    width: 16%;
  }
}
/* End of Scrollbar Style */
</style>