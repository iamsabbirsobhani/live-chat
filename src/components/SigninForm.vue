<template>
  <form @submit.prevent="handleSumbit">
      <h1>Login</h1>
      <input type="email" required placeholder="email" v-model="email">
      <input type="password" required placeholder="password" v-model="password">
      <div class="error">{{ error }}</div>
      <button>Sign in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composable/userLogin'
export default {
    setup(){
        const email = ref('')
        const password = ref('')
        const { login, error } = useLogin()
        const handleSumbit = async () => {
            await login(email.value, password.value)
            if(error.value){
                console.log('Signed In')
            }
        }

        return { email, password, handleSumbit, error}
    }
}
</script>

<style>

</style>