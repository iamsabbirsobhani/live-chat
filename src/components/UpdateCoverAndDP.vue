<template>
  <el-page-header
    style="margin: 10px; font-family: Roboto, sans-serif"
    class="pghd"
    @back="goABack"
    content="Authentication"
    v-if="masterPass != userMasterPass"
  >
  </el-page-header>
  <div v-if="masterPass == userMasterPass">
    <el-page-header
      style="margin: 10px"
      class="pghd"
      @back="goBack"
      content="Profile"
    >
    </el-page-header>

    <el-card shadow="always" class="card">
      <h3 style="text-align: center">Add Cover And Profile Photos</h3>
      <form @submit.prevent="submitForm">
        <label for="coverphoto">Cover Photo:</label>
        <div class="coverfiles">
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

        <!-- <input accept="image/*" type="file" @change="handleChangeCover" name="coverphoto" required/> -->
        <label for="profilephoto">Profile Photo:</label>
        <div class="coverfiles">
          <el-upload
            class="upload-demo"
            action="#"
            :on-change="handleChangeProfile"
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
        <div class="buttonwrapper">
          <el-button
            class="button"
            v-if="isLoading"
            type="primary"
            :loading="isLoading"
            >Loading</el-button
          >
          <el-button class="button" v-else type="primary" native-type="submit"
            >Upload</el-button
          >
        </div>
      </form>
    </el-card>
  </div>
  <div v-else>
    <UnauthorizedPage />
  </div>
</template>

<script>
import { ref } from "vue";
import userProfileStorage from "@/composable/userProfileStorage.js";
import userEditProfileInfo from "@/composable/userEditProfileInfo.js";
import { useRouter } from "vue-router";
// import { profileUpdateField } from "@/composable/profileUpdateField";
import UnauthorizedPage from "../subComponent/UnauthorizedPage.vue";
import { useStore } from "vuex";
export default {
  props: ["id"],
  components: { UnauthorizedPage },
  setup(props) {
    const store = useStore();
    const coverUrl = ref(null);
    const profileUrl = ref(null);
    const isLoading = ref(false);

    const { urlCover, urlProfile, error, uploadImage } = userProfileStorage();
    const { addDoc } = userEditProfileInfo();
    const router = useRouter();

    const submitForm = async () => {
      if (coverUrl.value && profileUrl.value) {
        isLoading.value = true;

        await uploadImage(coverUrl.value, profileUrl.value);

        await addDoc(props.id, {
          coverPhoto: urlCover.value,
          phofilePhoto: urlProfile.value,
        });
        // await profileUpdateField({ key: "dpChanged" }); disabled dpChanged visited count
        router.push({ name: "Profile" });
      }
      isLoading.value = false;

      // console.log(bio.value, location.value, profession.value, interest.value)
    };

    const handleAvatarSuccess = (file) => {
      coverUrl.value = file.raw;
    };
    const handleChangeProfile = (file) => {
      profileUrl.value = file.raw;
    };

    const goBack = () => {
      router.push({ name: "Profile" });
    };

    const masterPass = ref(null);
    const userMasterPass = ref(null);
    userMasterPass.value = store.state.userMasterPass;
    masterPass.value = store.state.masterPass;

    const goABack = () => {
      router.push({ name: "Authentication"});
    };

    return {
      handleAvatarSuccess,
      handleChangeProfile,
      submitForm,
      isLoading,
      goBack,

      masterPass,
      userMasterPass,
      goABack,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
.card {
  margin: 20px auto;
  max-width: 400px;
  font-family: "Roboto", sans-serif;
}
label {
  display: block;
  margin: 10px;
  margin-left: 0px;
}
.upbutton {
  width: 100px;
}
.button {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
}
.buttonwrapper {
  text-align: center;
}
.pghd {
  font-family: "Roboto", sans-serif;
}
@media (max-width: 425px) {
  .card {
    margin: 20px auto;
    max-width: 320px;
  }
}
</style>
