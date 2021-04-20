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
      <p>
        <span class="dname">{{ user.displayName }} </span>
      </p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <div>
      <!-- old logout -->
      <!-- <Button
        @click="handleClick"
        style="height: 50px; width: 50px"
        class="signoutbtn p-button-secondary p-button-raised p-button-rounded p-button-lg"
        icon="pi pi-sign-out"
        iconPos="right"
      /> -->
      <!-- end of old logout -->

      <!-- new logout/del -->

      <Button
        type="button"
        style="height: 50px; width: 50px; margin: 20px"
        @click="toggle"
        aria-haspopup="true"
        icon="pi pi-sign-out"
        iconPos="right"
        aria-controls="overlay_menu"
      />
      <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />

      <Dialog
        header="Confirmation"
        v-model:visible="displayConfirmation"
        :style="{ width: '350px' }"
        :modal="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          />
          <span>Are you sure want to delete your account?</span>
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            @click="closeConfirmation"
            class="p-button-text"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            @click="deleteConfirmation"
            class="p-button-text"
            autofocus
          />
        </template>
      </Dialog>
      <!-- end of new logout/del -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import useLogout from "../composable/useLogout";
import getUser from "../composable/getUser";
export default {
  components: { Menubar, Button, Menu, Dialog },
  setup(props, context) {
    const { logout, error } = useLogout();
    const { user } = getUser();
    const displayConfirmation = ref(false);
    const toast = useToast();
    const menu = ref();
    const items = ref([
      {
        label: "Options",
        items: [
          {
            label: "Log out",
            icon: "pi pi-sign-out",
            command: () => {
              setTimeout(() => {
                handleClick();
              }, 1000);
              toast.add({
                severity: "success",
                summary: "Sign Out",
                detail: "Successfully Signed Out",
                life: 3000,
              });
            },
          },
          {
            label: "Delete Account",
            icon: "pi pi-times",
            command: () => {
              openConfirmation();
            },
          },
        ],
      },
    ]);

    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const save = () => {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Data Saved",
        life: 3000,
      });
    };

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("Logged Out");
      }
    };

    const openConfirmation = () => {
      displayConfirmation.value = true;
    };

    const deleteConfirmation = () => {
      setTimeout(() => {
        context.emit("delete");
      }, 1000);

      toast.add({
        severity: "warn",
        summary: "Deleted",
        detail: "Account has been deleted successfully!",
        life: 3000,
      });
      displayConfirmation.value = false;
    };

    const closeConfirmation = () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "Account deletion has been halted!",
        life: 3000,
      });
      displayConfirmation.value = false;
    };
    return {
      deleteConfirmation,
      handleClick,
      user,
      items,
      menu,
      toggle,
      save,
      displayConfirmation,
      closeConfirmation,
    };
  },
};
</script>

<style scoped>
#start {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
  max-width: 600px;
  margin: 20px auto;
  border-bottom: 1px solid #eee;
}
.p-button-secondary {
  margin: 10px;
}
.dname {
  font-size: 25px;
  color: rgb(88, 240, 0);
}
</style>