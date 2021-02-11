<template>
  <div class="welcome container">
    <h1>Welcome</h1>
    <div v-if="showLogin">
      <SigninForm />
      <p>Not registered? <span @click="showLogin = false">Signup</span> Instead</p>
    </div>
    <div v-else>
      <SignupForm />
      <p>Already Registered? <span @click="showLogin = true">Signin</span> Instead</p>
    </div>
  </div>
</template>

<script>
import projectFirestore from "../firebase/config.js";
import SignupForm from "../components/SignupForm.vue";
import SigninForm from "../components/SigninForm.vue";
import { ref } from 'vue';
export default {
  components: { SignupForm, SigninForm },
  setup() {
    const showLogin = ref(true)

    return { showLogin };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}

.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span{
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
.welcome button{
  margin: 20px auto;
}
</style>