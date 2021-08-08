<template>
  <!-- elementplus -->
  <!-- <el-table
      :data="formatedDoc"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="User Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastVisited"
        label="Last Visited"
        width="180">
      </el-table-column>
    </el-table>  -->
  <!-- elementplus -->

  <el-page-header class="page-head" @back="goBack" content="profile">
  </el-page-header>

  <!-- primevue -->
  <DataTable :value="formatedDoc" responsiveLayout="scroll">
    <template #header>
      <div class="table-header">
        User Activity
      </div>
    </template>
    <Column field="name" header="Name">
      <template #body="slotProps">
        <div class="profile">
          <img
            :src="slotProps.data.phofilePhoto"
            :alt="slotProps.data.userName"
            class="product-image"
          />
          <p>{{ slotProps.data.userName }}</p>
        </div>
      </template>
    </Column>

    <!-- <Column header="Profile Photo">
      <template #body="slotProps">
        <img
          :src="slotProps.data.phofilePhoto"
          :alt="slotProps.data.userName"
          class="product-image"
        />
      </template>
    </Column> -->

    <Column field="lastvisited" header="Last Visited">
      <template #body="slotProps">
        <div>
          {{ slotProps.data.lastVisited }}
        </div>
        <Button
          label="Logs"
          @click="openMaximizable(slotProps.data.userUid)"
          class="p-button-outlined p-button-info"
        />
      </template>
    </Column>

    <Column field="totallogin" header="Total Login">
      <template #body="slotProps">
        <div>{{ slotProps.data.loginCount }} times.</div>
      </template>
    </Column>

    <Column field="totallogout" header="Total Logout">
      <template #body="slotProps">
        <div>{{ slotProps.data.logoutCount }} times.</div>
      </template>
    </Column>
  </DataTable>

  <div class="page-visited">
    <DataTable :value="formatedDoc" responsiveLayout="scroll">
      <template #header>
        <div class="table-header">
          Page Visited
        </div>
      </template>
      <Column field="name" header="Name">
        <template #body="slotProps">
          <div class="profile">
            <img
              :src="slotProps.data.phofilePhoto"
              :alt="slotProps.data.userName"
              class="product-image"
            />
            <p>{{ slotProps.data.userName }}</p>
          </div>
        </template>
      </Column>
      <Column field="home" header="Home Page">
        <template #body="slotProps">
          <div>{{ slotProps.data.pageVisited.home }} times.</div>
        </template>
      </Column>
      <Column field="profile" header="Profile Page">
        <template #body="slotProps">
          <div>{{ slotProps.data.pageVisited.profile }} times.</div>
        </template>
      </Column>
      <Column field="privatechat" header="Private Chat Page">
        <template #body="slotProps">
          <div>{{ slotProps.data.pageVisited.privateMsg }} times.</div>
        </template>
      </Column>
    </DataTable>
  </div>
  <!-- primevue -->

  <div>
    <Dialog
      header="Logs"
      v-model:visible="displayMaximizable"
      :style="editPostQuery"
      :maximizable="true"
      :modal="true"
    >
      <div v-for="k in dddd" :key="k">
        <p class="p-m-0">
          {{ k }}
        </p>
      </div>

      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          @click="closeMaximizable"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getUsers from "@/composable/getUsers";
import getUser from "@/composable/getUser";
import { format } from "date-fns";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
export default {
  components: { DataTable, Column, Dialog },
  setup() {
    const { documents } = getUsers();
    const { user } = getUser();
    const router = useRouter();

    // variable
    const displayMaximizable = ref(false);
    let windowWidth = ref(window.innerWidth);
    let editPostQuery = ref(null);
    let dddd = [];
    // variable


    const formatedDoc = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = format(doc.lastVisited.toDate(), "PPPPp");
          return { ...doc, lastVisited: time };
        });
      }
    });

    const goBack = () => {
      router.push({ name: `Profile`, params: { id: user.value.uid } });
    };

    const openMaximizable = (id) => {
      documents.value.forEach((element) => {
        if (element.id == id) {
          dddd.length = 0;
          for (let key in element.logs) {
            let time = format(element.logs[key].toDate(), "PPPPp");
            dddd[key] = time;
          }
          dddd.reverse()
        }
      });
      displayMaximizable.value = true;
    };

    const closeMaximizable = () => {
      displayMaximizable.value = false;
    };

    onMounted(() => {
      let style = {
        width: "50vw",
      };
      let style2 = {
        width: "100vw",
      };

      if (windowWidth.value > 600) {
        editPostQuery.value = style;
      } else {
        editPostQuery.value = style2;
      }
    });
    return {
      formatedDoc,
      goBack,
      openMaximizable,
      closeMaximizable,
      displayMaximizable,
      dddd,
      editPostQuery,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap");

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile {
  display: flex;
  align-items: centers;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.page-head {
  font-family: "Roboto", sans-serif;
  margin: 10px;
}

.page-visited {
  margin-top: 50px;
}
.p-button-info {
  margin-top: 5px;
}

@media (max-width: 475px) {
  .profile {
    flex-direction: column;
  }
  .product-image {
    // display: none;
  }
}
</style>
