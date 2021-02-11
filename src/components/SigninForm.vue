<template>
  <form @submit.prevent="handleSumbit">
      <input type="email" required placeholder="email" v-model="email">
      <input type="password" required placeholder="password" v-model="password">
      <button>Sign in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(){
        const email = ref('')
        const password = ref('')

        const handleSumbit = () => {
            console.log(email.value, password.value)
        }

        return { email, password, handleSumbit}
    }
}
</script>

<style>

</style>