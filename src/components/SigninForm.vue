<template>
  <form @submit.prevent="handleSumbit" class="signin">
    <h1 class="login">Login</h1>
    <InputText type="email" required placeholder="Email" v-model="email" />
    <Password
      required
      placeholder="Password"
      v-model="password"
      :feedback="false"
    />
    <Button class="btn" label="Login" type="submit" />
    <Toast />
  </form>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import useLogin from "../composable/userLogin";
import { useToast } from "primevue/usetoast";
export default {
  components: { InputText, Password, Button },

  setup() {
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
          detail: "Login Success",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Login Failed",
          detail: error.value,
          life: 4000,
        });
      }
    };

    return { email, password, handleSumbit, error };
  },
};
</script>

<style>

.btn{
    font-weight: bold;
}
.signin{
    padding: 10px;
}
.login{
    padding: 10px;
    border: 1px solid  transparent;
    /* border-left: 3px dashed orangered; */
  /* border-left-width: 5px; */
  /* width: 50px; */
}
</style>