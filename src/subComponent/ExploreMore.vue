<template>
  <div class="explore">
    <Button
      @click="openMaximizable"
      class="btn"
      icon="pi pi-angle-double-right"
      label="Explore More"
    />
  </div>

  <Dialog
    header="Authentication"
    v-model:visible="displayMaximizable"
    :style="styleObject"
    :maximizable="true"
    :modal="true"
  >
    <div class="p-m-0">
      <form @submit.prevent="submit">
        <div class="password">
          <el-input
            v-model="password"
            placeholder="Please input password"
            show-password
            required
          />
        </div>
        <p v-if="passwordState" class="empty">Incorrect Password</p>
        <div class="p-btn">
          <Button class="p-btn-b" label="Submit" type="submit" />
        </div>
      </form>
    </div>
    <template #footer>
      <!-- <Button
        label="Okay"
        icon="pi pi-check"
        @click="closeMaximizable"
        autofocus
      /> -->
    </template>
  </Dialog>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { Button, Dialog },

  setup() {
    const displayMaximizable = ref(false);
    const password = ref(null);
    const router = useRouter();

    const closeMaximizable = () => {
      displayMaximizable.value = false;
    };
    const openMaximizable = () => {
      displayMaximizable.value = true;
    };

    const windWidth = ref(null);
    const styleObject = ref(null);

    onMounted(() => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `50vw`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `90vw`,
        };
      }
    });

    const passwordState = ref(false);
    const store = useStore();

    const submit = () => {
      passwordState.value = false;
      if (password.value == store.state.explorePass) {
        passwordState.value = false;
        console.log("Correct Password");
        store.commit("setExplorePass", password.value);
        console.log(store.state.userExplorePass);
        password.value = null;
        router.push({
          name: "ExploreHome",
        });
      } else {
        passwordState.value = true;
        store.commit("setExplorePass", password.value);
        console.log(store.state.userExplorePass);
        console.log("Wrong Password");
      }
    };

    return {
      closeMaximizable,
      openMaximizable,
      displayMaximizable,
      windWidth,
      styleObject,
      password,
      submit,
      passwordState,
    };
  },
};
</script>

<style lang="scss" scoped>
.explore {
  text-align: center;
  .btn {
    width: 100%;
  }
}

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
</style>
