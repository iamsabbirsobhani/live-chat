<template>
  <form @submit.prevent="handleSumbit">
      <h1>Sign Up</h1>
      <input type="text" required placeholder="display name" v-model="displayName">
      <input type="email" required placeholder="email" v-model="email">
      <input type="password" required placeholder="password" v-model="password">
      <div class="error">{{ error }}</div>
      <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composable/useSignup'
export default {
    setup(){
        const { error, signup } = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSumbit = async () => {
            await signup(email.value, password.value, displayName.value)
            console.log('Signed up')
        }

        return { displayName, email, password, handleSumbit, error}
    }
}
</script>

<style>

</style>