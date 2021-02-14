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
      required
      placeholder="Password"
      v-model="password"
      class="p-password-info"
    />
    <Toast />
    <Button class="btn" label="Submit" type="submit" />
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
  setup() {
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
          detail: "Signup Success",
          life: 3000,
        });
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
  /* border: 1px solid transparent;
  border-bottom: 3px dashed orangered; */
}
</style>