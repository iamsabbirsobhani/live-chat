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

    <el-button class="button" v-if="isLoading" type="primary" :loading="isLoading">Loading</el-button>
    <el-button class="button" v-else type="primary" native-type="submit">Change Edit</el-button>
  </form>

</template>

<script>
import { ref } from "vue";
import userEditProfileInfo from "@/composable/userEditProfileInfo.js";
import { useRouter } from "vue-router";
import getUser from "@/composable/getUser.js";

export default {
  props: ["id"],

  setup(props) {
    const { user } = getUser();

    const { addDoc } = userEditProfileInfo();

    const router = useRouter();

    const bio = ref(null);
    const location = ref(null);
    const profession = ref(null);
    const interest = ref(null);
    const fileError = ref("");

    const isLoading = ref(false);

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
      router.push({ name: 'Profile' })
    }

    return {
      bio,
      location,
      profession,
      interest,
      submitForm,
      isLoading,
      goBack,
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