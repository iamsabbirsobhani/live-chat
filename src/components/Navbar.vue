<template>
  <div id="start" v-if="user">
    <img
      style="margin: 20px; margin-right: 30px"
      alt="logo"
      src="../assets/favicon.svg"
      height="40"
      class="p-mr-2"
    />
    <div>
      <p>Hey There {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <div>
      <Button
        @click="handleClick"
        style="height: 50px;width: 50px;"
        class="signoutbtn p-button-secondary p-button-raised p-button-rounded p-button-lg"
        icon="pi pi-sign-out"
        iconPos="right"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import  useLogout  from '../composable/useLogout'
import  getUser  from '../composable/getUser'
export default {
  components: { Menubar, Button },
  setup() {
       const { logout, error } = useLogout()
       const { user } = getUser()

        const handleClick = async () => {
            await logout()
            if(!error.value){
                console.log("Logged Out")
            }
        }

       return { handleClick, user }
  },
};
</script>

<style scoped>
#start {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 20px auto;
  border-bottom: 1px solid #eee;
}
.p-button-secondary{
  margin: 10px;
}
</style>