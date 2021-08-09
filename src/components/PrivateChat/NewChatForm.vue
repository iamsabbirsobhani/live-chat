<template>
  <form @submit.prevent="handleSumbit" >
    <div class="pvtChatbox">
      <ChatWindow :userTo="userTo" class="cwindows" />
      <div class="typeStatus">
        <Typing />
      </div>
    </div>
    <div class="type">
      <Button v-if="!isLoading" type="submit" icon="pi pi-send" class="send-button"/>
      <Button v-else type="submit" icon="pi pi-spin pi-spinner" class="send-button"/>
      <el-input
        placeholder="type..."
        v-model.msg="newModel.msg"
        v-debounce:610ms.cancelonempty="stopTyping"
        v-model.typest="newModel.typest"
      ></el-input>

        <!-- @keypress.enter.prevent="handleSumbit" -->
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
import Typing from "@/components/Typing.vue";
import Card from "primevue/card";
import ChatWindow from "@/components/PrivateChat/ChatWindow.vue";
import Textarea from "primevue/textarea";
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import getUser from "@/composable/getUser";
import { timestamp } from "@/firebase/config";
import useCollection from "@/composable/PrivateChat/useCollection";
import userTypingSetFlag from "@/composable/PrivateChat/userTypingSetFlagValue";
import Button from "primevue/button";
import useStorage from "@/composable/useStorage";
import { useToast } from "primevue/usetoast";
import colors from "@/composable/colors.js";
import { privateMsgPage } from "@/composable/pageVisited";
import { profileUpdateField } from "@/composable/profileUpdateField";
export default {
  props: ["userTo"],
  components: {
    Textarea,
    Card,
    Button,
    ChatWindow,
    Typing,
    Dialog,
    FileUpload,
  },
  setup(props) {
    const toast = useToast();
    const { user } = getUser();
    const { addDoc, error } = useCollection("privateChat");
    const { addDocType } = userTypingSetFlag();
    const { url, uploadImage } = useStorage();
    const displayConfirmation = ref(false);

    // variable
    const isLoading = ref(false)
    // end variable

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
      isLoading.value = true

      // checking if the "newModel.value.msg" has any value
      function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
      }
      // end of checking if the "newModel.value.msg" has any value

      // empty/blank text field send button
      if (isEmptyOrSpaces(newModel.value.msg)) { isLoading.value = false }
      // end empty/blank text field send button

      if (!isEmptyOrSpaces(newModel.value.msg)) {
        const chat = {
          name: user.value.displayName,
          message: newModel.value.msg,
          userId: user.value.uid,
          to: props.userTo,
          createdAt: timestamp(),
          deletedAt: null,
        };
        await addDoc(chat);
        isLoading.value = false
        newModel.value.msg = null;
        await profileUpdateField({key: "chatSendCount"})
        if (!error.value) {
          newModel.value.msg = "";
        }
      }
    };

    // Type Status Check
    watch(newModel.value, () => {
      keypressF();
    });

    const keypressF = async () => {
      if (newModel.value.msg) {
        var keypresss = {
          isType: true,
          typeTo: props.userTo,
        };
        await addDocType(keypresss, user.value.uid);
      } else {
        var keypresss = {
          isType: false,
          typeTo: props.userTo,
        };
        await addDocType(keypresss, user.value.uid);
      }
    };

    const stopTyping = () => {
      const key = {
        isType: false,
      };
      addDocType(key, user.value.uid);
    };
    // End of Type Status Check

    const closeConfirmation = () => {
      displayConfirmation.value = false;
    };

    const myUploader = async (file) => {
      if (file) {
        await uploadImage(file);
        await profileUpdateField({key: "imgUploaded"})
      }

      const chat = {
        name: user.value.displayName,
        userId: user.value.uid,
        to: props.userTo,
        createdAt: timestamp(),
        imgUrl: url.value,
        deletedAt: null,
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

    onMounted(async() => {
      await privateMsgPage();
    })
    return {
      handleSumbit,
      error,
      stopTyping,
      displayConfirmation,
      closeConfirmation,
      handleAvatarSuccess,
      url,
      newModel,
      isLoading
    };
  },
};
</script>

<style scoped>
.pvtChatbox {
  max-width: 580px;
  height: 480px;
  margin: auto;
  margin-top: 0px;
  position: relative;
}

.typeStatus {
  z-index: 2;
  z-index: 2;
  position: absolute;
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

.send-button {
  width: 80px !important;
  margin: 10px !important;
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
  .pvtChatbox {
    max-width: 350px;
    margin: auto;
    /* height: 422px; */
    height: 520px;
  }
}
</style>
