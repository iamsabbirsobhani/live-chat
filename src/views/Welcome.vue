<template>
  <div class="welcome container">
    <h1>Welcome</h1>
    <div v-if="showLogin">
      <SigninForm />
      <p>Not registered? <span @click="showLogin = false">Signup</span> Instead</p>
    </div>
    <div v-else>
      <SignupForm />
      <p>Already registered? <span @click="showLogin = true">Login</span> Instead</p>
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

@media (max-width: 700px){
    .welcome input{
        width: 90%;
    }
    .welcome > div:nth-child(2) > form:nth-child(1) > h1:nth-child(1){
      font-size: 16px;
    }
    .welcome > div:nth-child(2) > p:nth-child(2){
      font-size: 13px;
    }

}
</style>