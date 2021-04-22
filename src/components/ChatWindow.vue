<template>
  <div class="chat-window">
    <!-- <div v-if="error">{{ error }}</div> -->
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }} ago</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>

        <!-- element-plus Image Preview -->
        <div class="demo-image__preview" v-if="doc.imgUrl">
          <el-image
            class="images"
            :src="doc.imgUrl"
            :preview-src-list="esourceList"
          >
          </el-image>
        </div>
        <!-- end of element-plus Image Preview -->
      </div>
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
import { computed, onUpdated, ref, watch } from "vue";
import { formatDistanceToNow } from "date-fns";
import getCollection from "../composable/getCollection";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  components: { Dialog, Button },
  setup() {
    const { error, documents, esourceList } = getCollection("messages");

    const displayConfirmation = ref(false);

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
      messages.value.scrollTop = messages.value.scrollHeight;
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
      esourceList
    };
  },
};
</script>

<style>
.chat-window {
  /* background: #fafafa; */
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 250px;
  overflow: auto;
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
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.messages::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

.messages::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #d62929;
}
.images {
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  display: block;
  border-radius: 10px;
}
@media (max-width: 425px) {
  .images {
    max-width: 200px;
    max-height: 250px;
    overflow: hidden;
    display: block;
  }
}
/* End of Scrollbar Style */
</style>