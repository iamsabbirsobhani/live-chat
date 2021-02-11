<template>
  <div class="welcome container">
    <h1>Welcome</h1>
    <!-- <SignupForm /> -->
    <SigninForm />
  </div>
</template>

<script>
import projectFirestore from "../firebase/config.js";
import SignupForm from "../components/SignupForm.vue";
import SigninForm from "../components/SigninForm.vue";
export default {
  components: { SignupForm, SigninForm },
  setup() {},
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
</style>