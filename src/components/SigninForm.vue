<template>
  <form @submit.prevent="handleSumbit" class="signin">
    <h1 class="login">Login</h1>
    <InputText type="email" required placeholder="Email" v-model="email" />
    <Password
      style="margin: 10px; margin-top: 0px"
      required
      placeholder="Password"
      v-model="password"
      :feedback="false"
      toggleMask
    />
    <Button class="btn" label="Login" type="submit" />
    <Toast />
  </form>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { onMounted, ref } from "vue";
import useLogin from "../composable/userLogin";
import { useToast } from "primevue/usetoast";
export default {
  components: { InputText, Password, Button },

  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const { login, error } = useLogin();
    const toast = useToast();

    const handleSumbit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        console.log("Signed In");
        toast.add({
          severity: "success",
          summary: "Login Info",
          detail: "Successfully logged in",
          life: 2000,
        });
        setTimeout(function() {
          context.emit("login");
        }, 2000);
      } else {
        toast.add({
          severity: "error",
          summary: "Login Failed",
          detail: error.value,
          life: 4000,
        });
      }
    };

    onMounted(() => {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#0f172a");
    });

    return { email, password, handleSumbit, error };
  },
};
</script>

<style>
.btn {
  font-weight: bold;
}
.signin {
  padding: 10px;
  background-color: #1e293b !important;
}
.login {
  padding: 10px;
  border: 1px solid transparent;
}
</style>
