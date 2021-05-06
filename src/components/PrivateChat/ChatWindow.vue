<template >
  <div class="chat-window messages" ref="messages">
    <div v-if="error">{{ error }}</div>
    <el-skeleton :rows="15" animated v-if="!documents" />
    <div v-if="documents">
      <!-- self user -->

      <div v-for="doc in formattedDocuments" :key="doc.id">
        <div v-if="doc.to == userTo && doc.userId == user.uid">
          <div class="single">
            <div
              v-if="doc.to == userTo && doc.userId == user.uid"
              class="selfUser"
              style="max-width: 90%"
            >
              <!-- :style="{ backgroundColor: doc.backgroundColor }" -->
              <div style="max-width: 100%; text-align: end">
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
              <span
                style="margin-left: 5px; margin-right: 5px"
                class="created-at"
                >{{ doc.createdAt }} ago by you</span
              >
            </div>
          </div>
        </div>

        <!-- end of self user -->

        <!-- other user -->

        <div
          style="margin-bottom: 20px"
          v-if="doc.to == user.uid && doc.userId == userTo"
        >
          <!-- overflow-x: hidden; -->
          <div style="max-width: 90%" class="otherUser">
            <!-- :style="{ backgroundColor: doc.backgroundColor }" -->
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
        </div>

        <!-- end of other user -->
      </div>

      <!-- facebook typing indicator -->

      <!-- below inside the commented, div  logic works as well -->
      <!-- <div v-if="(type.userUid == userTo)  && type.isType" class="ticontainer"> -->
      <div v-if="type.userUid !== user.uid && type.isType" class="ticontainer">
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
import { formatDistanceToNow } from "date-fns";
import getCollection from "@/composable/PrivateChat/getCollection";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import getUser from "@/composable/getUser.js";
import ScrollPanel from "primevue/scrollpanel";

import getTypeStatus from "@/composable/PrivateChat/getTypeStatus";
export default {
  props: ["userTo"],
  components: { Dialog, Button, Chip, ScrollPanel },
  setup(props) {
    const { error, documents, esourceList } = getCollection("privateChat");

    const displayConfirmation = ref(false);

    const { type } = getTypeStatus(props.userTo);

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
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

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

    const colors = ref({
      backgroundColor: "red",
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
      colors,
    };
  },
};
</script>

<style lang="scss" scoped>
.p-chip.custom-chip {
  // background: var(--primary-color);
  background-color: linear-gradient(
    90deg,
    rgba(16, 145, 255, 1) 0%,
    rgba(0, 138, 255, 1) 29%,
    rgba(0, 121, 255, 1) 56%,
    rgba(0, 97, 249, 1) 100%
  );
  color: var(--primary-color-text);
  margin-right: 5px;
  margin-bottom: 3px;
}

.chat-window {
  padding: 10px 10px;
}
.chat-window .messages .cwindow {
  padding: 3px;
}
.messages {
  padding: 3px;
}
.cwindow {
  padding: 3px;
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

.selfUser .images {
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  display: block;
  border-radius: 10px;
  margin-right: 5px;
}

.otherUser .images {
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

.selfUser {
  align-self: flex-end;
}

.selfUser .message-wraper {
  max-width: 180px;
  border-radius: 25px;
  padding: 1px;
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
  // color: rgb(255, 255, 255);
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

.othermsg {
  color: black;
  // color: black;
  // color: black;
  //   -webkit-text-fill-color: white;
  //   -webkit-text-stroke-width: .1px;
  //   -webkit-text-stroke-color: black;
}

.p-mr-2 {
  // color: black;
  //   -webkit-text-fill-color: white;
  //   -webkit-text-stroke-width: .1px;
  //   -webkit-text-stroke-color: black;
  background-color: linear-gradient(
    90deg,
    rgba(255, 49, 198, 1) 0%,
    rgba(213, 0, 101, 1) 52%,
    rgba(173, 0, 0, 1) 100%
  );
}

/* End of Scrollbar Style */

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
  .selfUser .images {
    max-width: 200px;
    max-height: 250px;
    overflow: hidden;
    display: block;
  }
  .messages {
    // max-height: 390px;
    max-height: 520px;
    overflow: auto;
  }
  .tiblock {
    width: 16%;
  }
}
</style>