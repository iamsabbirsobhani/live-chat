<template>
  <form>
    <div class="chatbox">
      <ChatWindow class="cwindow" />
      <div class="typeStatus">
        <Typing />
      </div>
    </div>

    <div class="type">
      <!-- <Textarea
        v-model.trim="message"
        v-debounce:610ms.cancelonempty="stopTyping"
        v-model="typeStatus"
        @keypress.enter.prevent="handleSumbit"
        class="textarea"
        :autoResize="true"
        rows="2"
        cols="30"
        placeholder="Type a message and hit enter to send..."
        style="margin-right: 5px; padding: 5px"
      /> -->
      <el-input
        placeholder="Hit enter to send message..."
        v-model.msg="newModel.msg"
        v-debounce:610ms.cancelonempty="stopTyping"
        v-model.typest="newModel.typest"
        @keypress.enter.prevent="handleSumbit"
      ></el-input>

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
import getUser from "@/composable/getUser";
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
    const toast = useToast();
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");
    const { addDocType } = userTypingSetFlag();
    const { url, uploadImage } = useStorage();
    const displayConfirmation = ref(false);

    // binding multiple "v-model" within one html element
    const newModel = ref({
      msg: null,
      typest: null,
    });
    // end of binding multiple "v-model" within one html element

    watch(error, (newErrorValue) => {
      if (newErrorValue) {
        displayConfirmation.value = true;
      }
    });

    const handleSumbit = async () => {
      // checking if the "newModel.value.msg" has any value
      function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
      }
      // end of checking if the "newModel.value.msg" has any value
      if (!isEmptyOrSpaces(newModel.value.msg)) {
        const chat = {
          name: user.value.displayName,
          message: newModel.value.msg,
          userId: user.value.uid,
          createdAt: timestamp(),
        };
        await addDoc(chat);

        newModel.value.msg = null;
        if (!error.value) {
          newModel.value.msg = "";
        }
      }
    };

    // Type Status Check
    watch(newModel.value, () => {
      // console.log(typeStatus.value);
      keypressF();
    });

    const keypressF = async () => {
      if (newModel.value.msg) {
        // console.log(typeStatus.value);
        var keypresss = {
          isType: true,
          user: user.value.uid,
        };
        // console.log("Typing Start");
        await addDocType(keypresss);
      } else {
        var keypresss = {
          isType: false,
          user: user.value.uid,
        };
        await addDocType(keypresss);
      }
    };

    const stopTyping = () => {
      const key = {
        isType: false,
        user: user.value.uid,
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
        userId: user.value.uid,
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
      handleSumbit,
      error,
      stopTyping,
      displayConfirmation,
      closeConfirmation,
      handleAvatarSuccess,
      url,
      newModel,
    };
  },
};
</script>


<style scoped>
.chatbox {
  max-width: 580px;
  height: 412px;
  margin: 10px auto;
  margin-top: 0px;
  padding: 5px;
  position: relative;
  /* box-sizing: border-box; */
}

.typeStatus {
  z-index: 2;
  z-index: 2;
  /* margin: 111px !important; */
  /* top: 35px; */
  position: absolute;
  /* top: 314px; */
  bottom: -5px;
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
  flex-direction: row-reverse;
  align-items: center;
  max-width: 400px;
  margin: 20px auto;
}
.files {
  width: 130px;
  margin-right: 10px;
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
  .chatbox {
    max-width: 350px;
    margin: auto;
    height: 430px;
  }
}
</style>