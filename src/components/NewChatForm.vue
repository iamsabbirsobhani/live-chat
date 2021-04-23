<template>
  <form>
    <Card
      class="card"
      style="
        position: relative;
        width: 25rem;
        height: 400px;
        margin: 10px auto;
        margin-bottom: 2em;
        padding: 0px;
        overflow: hidden;
      "
    >
      <template #content>
        <ChatWindow class="cwindow" />
      </template>
      <template #footer>
        <div class="typeStatus">
          <Typing />
        </div>
      </template>
    </Card>
    <div class="type">
      <Textarea
        v-model.trim="message"
        v-debounce:610ms.cancelonempty="stopTyping"
        v-model="typeStatus"
        @keypress.enter.prevent="handleSumbit"
        class="textarea"
        :autoResize="true"
        rows="2"
        cols="30"
        placeholder="Type a message and hit enter to send..."
        style="margin-right: 5px"
      />

      <div class="files">
        <el-upload
          class="upload-demo"
          action="#"
          :on-change="handleAvatarSuccess"
          accept="image/*"
          :auto-upload="false"
          :limit="1"
        >
          <el-button
            class="upbutton"
            icon="el-icon-plus"
            size="small"
            type="primary"
          ></el-button>
          <!-- <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template> -->
        </el-upload>
      </div>
    </div>
    <!-- Primevue Error Popup -->
    <div v-if="error">
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
        <template #footer>
          <Button
            label="Close"
            icon="pi pi-times"
            @click="closeConfirmation"
            class="p-button-text"
          />
        </template>
      </Dialog>
    </div>
    <!-- End of Primevue Error Popup -->
  </form>
</template>

<script>
import FileUpload from "primevue/fileupload";
import Dialog from "primevue/dialog";
import Typing from "../components/Typing.vue";
import Card from "primevue/card";
import ChatWindow from "../components/ChatWindow.vue";
import Textarea from "primevue/textarea";
import { onMounted, onUpdated, ref, watch } from "vue";
import getUser from "../composable/getUser";
import { timestamp } from "../firebase/config";
import useCollection from "../composable/useCollection";
import userTypingSetFlag from "../composable/userTypingSetFlagValue";
import Button from "primevue/button";
import useStorage from "@/composable/useStorage";
import { useToast } from "primevue/usetoast";
export default {
  components: {
    Textarea,
    Card,
    Button,
    ChatWindow,
    Typing,
    Dialog,
    FileUpload,
  },
  setup() {
    const message = ref("");
    const toast = useToast();
    const typeStatus = ref(null);
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");
    const { addDocType } = userTypingSetFlag();
    const { url, uploadImage } = useStorage();
    const displayConfirmation = ref(false);

    watch(error, (newErrorValue) => {
      if (newErrorValue) {
        displayConfirmation.value = true;
      }
    });

    const handleSumbit = async () => {

      if (message.value) {
        const chat = {
          name: user.value.displayName,
          message: message.value,
          createdAt: timestamp(),
        };
        await addDoc(chat);

        if (!error.value) {
          message.value = "";
        }
      }
    };

    // Type Status Check
    watch(typeStatus, () => {
      // console.log(typeStatus.value);
      keypressF();
    });

    const keypressF = async () => {
      if (typeStatus.value) {
        // console.log(typeStatus.value);
        var keypresss = {
          isType: true,
        };
        // console.log("Typing Start");
        await addDocType(keypresss);
      } else {
        var keypresss = {
          isType: false,
        };
        await addDocType(keypresss);
      }
    };

    const stopTyping = () => {
      const key = {
        isType: false,
      };
      addDocType(key);
      // console.log("Typing Stopped");
    };
    // End of Type Status Check

    const closeConfirmation = () => {
      displayConfirmation.value = false;
    };

    const myUploader = async (file) => {

      if (file) {
        await uploadImage(file);
      }

      const chat = {
        name: user.value.displayName,
        createdAt: timestamp(),
        imgUrl: url.value,
      };
      await addDoc(chat);

      toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
      file.value = null;

    };

    const handleAvatarSuccess = (file) => {
      myUploader(file.raw);
    };

    return {
      message,
      handleSumbit,
      error,
      typeStatus,
      stopTyping,
      displayConfirmation,
      closeConfirmation,
      handleAvatarSuccess,
      url,
    };
  },
};
</script>


<style scoped>

.typeStatus {
  z-index: 2;
  z-index: 2;
  /* margin: 111px !important; */
  /* top: 35px; */
  position: absolute;
  top: 314px;
  margin-left: 20px;
}
#app > form > textarea {
  width: 300px;
  position: relative;
  bottom: 0;
  height: 66px !important;
  margin-bottom: 10px;
  display: block;
  margin: 10px auto !important;
  margin-top: 0px;
  overflow-y: auto !important;
}

.p-button-danger {
  display: block;
  margin: 20px auto;
}
.card {
  position: relative;
  /* height: 300px; */
  padding: 0px;
}
#app > form > div.p-card.p-component.card {
  height: 350px !important;
  margin: 0px auto !important;
}
.type {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 400px;
  margin: 20px auto;
}
.files {
  width: 130px;
}
.upbutton {
  width: 90px;
}

@media (max-width: 425px) {
  .card {
    width: 300px !important;
  }
  #app > form > textarea {
    width: 250px;
  }
  .type {
    display: flex;
    max-width: 300px;
    margin: 10px auto;
  }
  .files {
    width: 70px;
  }
  .upbutton {
    width: 70px;
  }
}
</style>