<template>
  <form @submit.prevent="handleSumbit" class="signup">
    <h1 class="signup">Sign Up</h1>

    <InputText
      type="text"
      required
      placeholder="Display Name"
      v-model="displayName"
    />
    <InputText type="email" required placeholder="Email" v-model="email" />

    <Password
      style="margin: 10px; margin-top: 0px"
      required
      placeholder="Password"
      v-model="password"
      class="p-password-info"
      toggleMask
    />
    <Toast />
    <Button class="btn" label="Sign up" type="submit" />
  </form>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import useSignup from "../composable/useSignup";
import { useToast } from "primevue/usetoast";

export default {
  components: { InputText, Password, Button },
  setup(props, context) {
    const { error, signup } = useSignup();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const toast = useToast();

    const handleSumbit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        displayName.value = null;
        email.value = null;
        password.value = null;
        console.log("Signed Up");
        toast.add({
          severity: "success",
          summary: "Signup Info",
          detail: "Successfully signed up",
          life: 2000,
        });
        setTimeout(function () {
          context.emit("signup");
        }, 2000);
      } else {
        toast.add({
          severity: "error",
          summary: "Signup Failed",
          detail: error.value,
          life: 4000,
        });
      }
    };

    return { displayName, email, password, handleSumbit, error };
  },
};
</script>

<style>
.signup {
  padding: 10px;
}
</style>