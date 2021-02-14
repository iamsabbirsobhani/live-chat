<template>
  <div id="start">
    <img
      style="margin: 20px; margin-right: 30px"
      alt="logo"
      src="../assets/favicon.svg"
      height="40"
      class="p-mr-2"
    />
    <div>
      <p>Hey There...display name here</p>
      <p class="email">Currently logged in as...email</p>
    </div>
    <div>
      <Button
        class="signoutbtn"
        label="Logout"
        icon="pi pi-sign-out"
        iconPos="right"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Menubar from "primevue/menubar";
export default {
  components: { Menubar, Button },
  setup() {},
};
</script>

<style>
#start {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 20px auto;
  border-bottom: 1px solid #eee;
}
</style>