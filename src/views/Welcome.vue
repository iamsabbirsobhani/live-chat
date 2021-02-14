<template>
  <div class="welcome container">
    <h1>Live Chat</h1>
    <div v-if="showLogin">
      <SigninForm @login="chatroom"/>

      <p>Not registered? <span @click="show">Sign up</span> Instead</p>
    </div>

    <div v-if="showSignup">
      <SignupForm @signup="chatroom"/>
      <p>Already registered? <span @click="show">Login</span> Instead</p>
    </div>
  </div>
</template>

<script>
import projectFirestore from "../firebase/config.js";
import SignupForm from "../components/SignupForm.vue";

import SigninForm from "../components/SigninForm.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router'
export default {
  components: { SignupForm, SigninForm },
  setup() {
    const showLogin = ref(true);
    const showSignup = ref(false);
    const router = useRouter()

    const show = () => {
      showLogin.value = !showLogin.value;
      showSignup.value = !showSignup.value;
    };

    const chatroom = () => {
      router.push({ name: 'Chatroom' })
    }

    return { showLogin, showSignup, show, chatroom };
  },
};
</script>

<style>
.welcome > h1:nth-child(1) {
  font-family: "Hammersmith One", sans-serif;
  /* background: -webkit-linear-gradient(139deg, rgba(13,137,236,1) 0%, rgba(79,33,252,1) 36%, rgba(81,92,222,1) 64%, rgba(0,212,255,1) 100%); */
  -webkit-background-clip: text;
  background: -webkit-linear-gradient(
    139deg,
    rgba(13, 137, 236, 1) 0%,
    rgba(0, 125, 226, 1) 36%,
    rgba(18, 106, 249, 1) 64%,
    rgba(0, 212, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.welcome {
  text-align: center;
  padding: 10px 0;
}

.welcome form {
  /* background-color: #ffffff; */
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 310px;
  height: 400px;
  margin: 10px auto;
  border: 1px solid #e6e7e9;
  border-top: 5px solid royalblue;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 0.6px #ececec;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 270px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  /* border: 1px solid #eee; */
  outline: none;
  color: #999;
  margin: 10px auto;
}
.input.p-inputtext:nth-child(1) {
  width: 310px;
  padding: 10px;
  /* border-radius: 20px; */
  /* border: 1px solid #eee; */
  /* outline: none;
  color: #999;
  margin: 10px auto; */
}
.welcome > div:nth-child(2) > p:nth-child(2) > span:nth-child(1) {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button {
  margin: 20px auto;
}

.welcome > div:nth-child(2) > form:nth-child(1) > h1:nth-child(1) {
  font-size: 20px;
}
.welcome > div:nth-child(2) > p:nth-child(2) {
  font-size: 20px;
}

.welcome > div:nth-child(2) > p:nth-child(2) > span:nth-child(1) {
  color: #0d89ec;
}

@media (max-width: 700px) {
  .welcome input {
    width: 310px;
  }
  .welcome > div:nth-child(2) > form:nth-child(1) > h1:nth-child(1) {
    font-size: 20px;
  }
  .welcome > div:nth-child(2) > p:nth-child(2) {
    font-size: 20px;
  }
  .welcome form {
    width: 300px;
  }
  .welcome input {
    width: 260px;
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    /* border: 1px solid #eee; */
    outline: none;
    color: #999;
    margin: 10px auto;
  }
}
</style>