<template>
  <Navbar @delete="deletes" />
  <h3 style="text-align: center">Chatroom</h3>
  <NewChatForm />
  <ConfirmPopup></ConfirmPopup>
  <div class="card">
    <Toast />
  </div>

  <!-- bubble amination -->
  <section class="sticky">
    <div class="bubbles">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>
  </section>
  <!-- end of bubble amination -->

</template>

<script>
import userDelete from "../composable/userDelete";
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import NewChatForm from "../components/NewChatForm.vue";
import Navbar from "../components/Navbar.vue";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
  components: { Navbar, NewChatForm, Button },
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const { delUser, error } = userDelete();

    const deleteUser = async () => {
      await delUser();
    };

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
        console.log("watching");
      }
    });

    const deletes = () => {
      if (!error.value) {
        deleteUser();
      }
    };
    return { deletes };
  },
};
</script>

<style scoped>
/* .card{
  padding: 20px;
  border-top: 1px solid rgb(255, 208, 208);
  text-align: center;
} */

/* bubble animation */
.bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  top: 0;
  left: 0;
}
.bubble {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  /* background:#f1f1f1; */
  background: #a8dcff67;
  border-radius: 50%;
  opacity: 0.5;
  animation: rise 20s infinite ease-in;
}
.bubble:nth-child(1) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 8s;
}
.bubble:nth-child(2) {
  width: 20px;
  height: 20px;
  left: 20%;
  animation-duration: 5s;
  animation-delay: 1s;
}
.bubble:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 35%;
  animation-duration: 7s;
  animation-delay: 2s;
}
.bubble:nth-child(4) {
  width: 80px;
  height: 80px;
  left: 50%;
  animation-duration: 11s;
  animation-delay: 0s;
}
.bubble:nth-child(5) {
  width: 35px;
  height: 35px;
  left: 55%;
  animation-duration: 6s;
  animation-delay: 1s;
}
.bubble:nth-child(6) {
  width: 45px;
  height: 45px;
  left: 65%;
  animation-duration: 8s;
  animation-delay: 3s;
}
.bubble:nth-child(7) {
  width: 90px;
  height: 90px;
  left: 70%;
  animation-duration: 12s;
  animation-delay: 2s;
}
.bubble:nth-child(8) {
  width: 25px;
  height: 25px;
  left: 80%;
  animation-duration: 6s;
  animation-delay: 2s;
}
.bubble:nth-child(9) {
  width: 15px;
  height: 15px;
  left: 70%;
  animation-duration: 5s;
  animation-delay: 1s;
}
.bubble:nth-child(10) {
  width: 90px;
  height: 90px;
  left: 25%;
  animation-duration: 10s;
  animation-delay: 4s;
}
@keyframes rise {
  0% {
    bottom: -100px;
    transform: translateX(0);
  }
  50% {
    transform: translate(100px);
  }
  100% {
    bottom: 1080px;
    transform: translateX(-200px);
  }
}
/* end of bubble animation */
</style>