<template>
  <el-page-header class="pghd" @back="goBack" content="Edit Profile">  </el-page-header>
  <h4 style="text-align: center;">Input All the fields</h4>
  <form @submit.prevent="submitForm">
    <label for="bio" >Bio:</label>
    <el-input maxlength="100" show-word-limit placeholder="Please enter a short bio" v-model="bio" type="text" name="bio" required></el-input>
    <!-- <input v-model="bio" type="text" name="bio" required/> -->
    <label for="location">Location:</label>
    <el-input  maxlength="17" show-word-limit placeholder="Please enter location" v-model="location" type="text" name="location" required></el-input>
    <label for="profession">Profession:</label>
    <el-input maxlength="18" show-word-limit placeholder="Please enter your profession" v-model="profession" type="text" name="profession" required></el-input>
    <label for="interest">Currently hacking on?</label>
    <el-input maxlength="15" show-word-limit placeholder="Please enter currently what are you on" v-model="interest" type="text" name="interest" required></el-input>
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
    <label  for="profilephoto">Profile Photo:</label>
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

    <el-button class="button" v-if="isLoading" type="primary" :loading="isLoading">Loading</el-button>
    <el-button class="button" v-else type="primary" native-type="submit">Change Edit</el-button>
  </form>

</template>

<script>
import { ref } from "vue";
import userProfileStorage from "@/composable/userProfileStorage.js";
import userEditProfileInfo from "@/composable/userEditProfileInfo.js";
import { useRouter } from "vue-router";
import getUser from "@/composable/getUser.js";

export default {
  props: ["id"],

  setup(props) {
    const { user } = getUser();

    const { urlCover, urlProfile, error, uploadImage } = userProfileStorage();

    const { addDoc } = userEditProfileInfo();

    const router = useRouter();

    const bio = ref(null);
    const location = ref(null);
    const profession = ref(null);
    const interest = ref(null);
    const coverUrl = ref(null);
    const profileUrl = ref(null);
    const fileError = ref("");

    const isLoading = ref(false);

    const submitForm = async () => {
      isLoading.value = true;

      await uploadImage(coverUrl.value, profileUrl.value);

      await addDoc(props.id, {
        coverPhoto: urlCover.value,
        phofilePhoto: urlProfile.value,
        bio: bio.value,
        location: location.value,
        profession: profession.value,
        interest: interest.value,
      });
      isLoading.value = false;

      router.push({ name: "Profile" });

      // console.log(bio.value, location.value, profession.value, interest.value)
    };

    const handleAvatarSuccess = (file) => {
      coverUrl.value = file.raw
    };
    const handleChangeProfile = (file) => {
      profileUrl.value = file.raw
    };

    const goBack = () => {
      router.push({ name: 'Profile' })
    }

    return {
      bio,
      location,
      profession,
      interest,
      submitForm,
      handleChangeProfile,
      isLoading,
      goBack,
      handleAvatarSuccess
    };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}
label  {
  margin: 10px;
}
.pghd {
  margin: 10px;
}
.button {
  width: 300px;
  margin: 20px auto;
}
@media (max-width: 425px) {
  form {
    max-width: 350px;
  }
  .button {
    width: 350px;
    margin: 10px auto;
  }
}
</style>