<template>
  <div class="authentication">
    <h3 style="text-align: center;">
      One more step to go <i class="fas fa-angle-double-right"></i>
    </h3>
    <div class="lottie">
      <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_q5pk6p1k.json"
        background="transparent"
        speed="1"
        style="width: 260px; height: 260px;"
        loop
        autoplay
        class="lt"
      ></lottie-player>
    </div>
    <div class="p-m-0">
      <form @submit.prevent="masterSubmit">
        <div class="password">
          <el-input
            v-model="masterPass"
            placeholder="Please input password"
            show-password
            required
          />
        </div>
        <p v-if="passwordState" class="empty">Incorrect Password</p>
        <div class="p-btn">
          <Button
            v-if="!disableBtn"
            class="p-btn-b"
            label="Submit"
            type="submit"
          />
          <Button
            v-if="disableBtn"
            icon="pi pi-spin pi-spinner"
            class="p-btn-b"
            disabled="disabled"
            label="Submit"
            type="submit"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Button from 'primevue/button';
export default {
  components: { Button },
  setup() {
    const store = useStore();
    const router = useRouter();
    const disableBtn = ref(false);
    const passwordState = ref(false);

    // masterpassword section
    const masterPass = ref(null);
    const masterSubmit = () => {
      // console.log(masterPass.value);
      disableBtn.value = true;
      passwordState.value = false;
      if (masterPass.value == store.state.masterPass) {
        store.commit("setMasterPass", masterPass.value);
        passwordState.value = false;
        console.log("Correct Password");
        // console.log(store.state.userExplorePass);
        router.push({
          name: "Home",
        });
        disableBtn.value = false;
        masterPass.value = null;
      } else {
        passwordState.value = true;
        store.commit("setMasterPass", masterPass.value);
        // console.log(store.state.userExplorePass);
        console.log("Wrong Password");
        disableBtn.value = false;
      }
    };
    // end masterpassword section
    return { masterPass, masterSubmit, disableBtn, passwordState };
  },
};
</script>

<style lang="scss" scoped>
.p-btn {
  margin: 50px 10px;
  text-align: center;
  .p-btn-b {
  }
  button {
    width: 100% !important;
  }
}

.password {
  margin: 10px 10px;
  input {
    width: 100% !important;
  }
}

.empty {
  color: gray;
}

.authentication {
  max-width: 600px;
  margin: 6vh auto;
  padding: 10px;
  border: 1px solid rgba(128, 128, 128, 0.24);
  border-radius: 4px;
  box-shadow: 0.5px 0.5px 5px 0.5px rgba(128, 128, 128, 0.301);
}

.lottie {
  // width: 100%;
}

.lt {
  margin: auto;
}

.fa-angle-double-right {
  color: rgba(49, 49, 250, 0.87);
}

h3 {
  color: gray;
  font-size: 24px;
}

@media (max-width: 550px) {
  .authentication {
    max-width: 320px;
  }
}
</style>
