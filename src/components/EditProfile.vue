<template>
  <el-page-header class="pghd" @back="goBack" content="Profile">
  </el-page-header>
  <h4 style="text-align: center; font-family: Roboto, sans-serif">
    Input arbitrary fields
  </h4>
  <form class="changeEdit" @submit.prevent="submitForm">
    <label for="bio">Bio:</label>
    <el-input
      maxlength="100"
      show-word-limit
      placeholder="Please enter a short bio"
      v-model="bio"
      type="text"
      name="bio"
      required
    ></el-input>
    <!-- <input v-model="bio" type="text" name="bio" required/> -->
    <label for="location">Location:</label>
    <el-input
      maxlength="17"
      show-word-limit
      placeholder="Please enter location"
      v-model="location"
      type="text"
      name="location"
      required
    ></el-input>
    <label for="profession">Profession:</label>
    <el-input
      maxlength="18"
      show-word-limit
      placeholder="Please enter your profession"
      v-model="profession"
      type="text"
      name="profession"
      required
    ></el-input>
    <label for="interest">Currently hacking on?</label>
    <el-input
      maxlength="15"
      show-word-limit
      placeholder="Please enter currently what are you on"
      v-model="interest"
      type="text"
      name="interest"
      required
    ></el-input>

    <el-button
      class="button"
      v-if="isLoading"
      type="primary"
      :loading="isLoading"
      >Loading</el-button
    >
    <el-button class="button" v-else type="primary" native-type="submit"
      >Change Edit</el-button
    >
  </form>
  <form class="changeName" @submit.prevent="changeName">
    <label for="displayName">Update Name: </label>
    <el-input
      type="text"
      :placeholder="user.displayName"
      v-model="changeDisplayName"
      maxlength="6"
      show-word-limit
      name="displayName"
      required
    >
    </el-input>
    <el-button
      class="button"
      v-if="isLoadingName"
      type="primary"
      :loading="isLoadingName"
      >Loading</el-button
    >
    <el-button v-else class="button" type="primary" native-type="submit"
      >Update Name</el-button
    >
    <p v-if="errorUpdateName" class="error">{{ errorUpdateName }}</p>
  </form>
  <form class="changePass" @submit.prevent="updatePass">
    <div class="passwordButton">
    <label for="password">Update Password: </label>
    <el-button class="showPass" type="danger" @click="dialogVisible = true">See Current Password</el-button>
    </div>
    <el-input
      placeholder="Please input password"
      v-model="newPassword"
      show-password
      required
    ></el-input>
    <el-button
      class="button"
      v-if="isLoadingPass"
      type="primary"
      :loading="isLoadingPass"
      >Loading</el-button
    >
    <el-button v-else class="button" type="primary" native-type="submit"
      >Update Password</el-button
    >
    <p v-if="errorUpdatePass" class="error">{{ errorUpdatePass }}</p>
  </form>

  <!-- dialog pops up to see current password -->
  <el-dialog
  style="font-family: Roboto, sans-serif;"
  title="Password"
  v-model="dialogVisible"
  width="300px"
  :before-close="handleClose">
  <span style="font-family: Roboto, sans-serif;">Your current password is: </span>
  <p style="font-family: Roboto, sans-serif;" class="error">{{info.userPass}}</p>
  <pre>Don't share with other.</pre>
  <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
    </span>
  </template>
</el-dialog>

</template>

<script>
import { ref } from "vue";
import userEditProfileInfo from "@/composable/userEditProfileInfo.js";
import { useRouter } from "vue-router";
import getUser from "@/composable/getUser.js";
import {
  updateUserName,
  updateUserPass,
  errorUpdateName,
  errorUpdatePass,
} from "@/composable/updateUserName.js";
import getProfile from '../composable/getProfile'

export default {
  props: ["id"],

  setup(props) {
    const { user } = getUser();

    const { addDoc } = userEditProfileInfo();

    const router = useRouter();

    const { info } = getProfile("profiles", user.value.uid)

    const bio = ref(null);
    const location = ref(null);
    const profession = ref(null);
    const interest = ref(null);
    const fileError = ref("");
    const changeDisplayName = ref(null);

    const isLoading = ref(false);
    const isLoadingName = ref(false);
    const isLoadingPass = ref(false);
    const dialogVisible = ref(false);
    const newPassword = ref(null);

    const submitForm = async () => {
      isLoading.value = true;

      await addDoc(props.id, {
        bio: bio.value,
        location: location.value,
        profession: profession.value,
        interest: interest.value,
      });
      isLoading.value = false;

      router.push({ name: "Profile" });

      // console.log(bio.value, location.value, profession.value, interest.value)
    };

    const goBack = () => {
      router.push({ name: "Profile" });
    };

    const changeName = async () => {
      isLoadingName.value = true;
      await updateUserName(changeDisplayName.value);

      changeDisplayName.value = null;

      isLoadingName.value = false;

      if (!errorUpdateName.value) {
        goBack();
      }
    };

    const updatePass = async () => {
      isLoadingPass.value = true;

      await updateUserPass(newPassword.value);

      newPassword.value = null;

      isLoadingPass.value = false;

      if (!errorUpdatePass.value) {
        goBack();
      }
    };

    return {
      bio,
      location,
      profession,
      interest,
      submitForm,
      isLoading,
      goBack,
      changeDisplayName,
      isLoadingName,
      changeName,
      user,
      newPassword,
      isLoadingPass,
      updatePass,
      errorUpdateName,
      errorUpdatePass,
      info,
      dialogVisible
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
h1 {
  text-align: center;
}
form {
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}
label {
  margin: 10px;
}
.pghd {
  margin: 10px;
  font-family: "Roboto", sans-serif;
}
.button {
  width: 300px;
  margin: 20px auto;
}
.changeEdit {
  border-radius: 10px;
  padding: 5px;
  border-bottom: 2px solid #34a3a3;
  border-top: 2px solid #34a3a3;
  margin-bottom: 20px;
}
.changeName {
  border-radius: 10px;
  padding: 5px;
  border-bottom: 2px solid #8fbbaf;
  border-top: 2px solid #8fbbaf;
  margin-bottom: 20px;
}
.changePass {
  font-family: "Roboto", sans-serif !important;
  border-radius: 10px;
  padding: 5px;
  border-bottom: 2px solid #0c7b93;
  border-top: 2px solid #0c7b93;
  margin-bottom: 20px;
}

.error {
  font-family: "Roboto", sans-serif !important;
  color: red;
  text-align: center;
}

.passwordButton {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  display: flex;
  align-items: center;
}
.showPass {
  margin-left: auto;
}
@media (max-width: 425px) {
  form {
    max-width: 350px;
  }
  .button {
    width: 100%;
    margin: 10px auto;
  }
}
</style>