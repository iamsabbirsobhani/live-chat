<template>
  <el-page-header class="page-head" @back="goBack" content="profile">
  </el-page-header>
  <div style="background-color: black;">
    <!-- elementplus -->
    <div class="el-table">
      <h3 style="margin: 10px; padding: 5px;">User Actions</h3>
      <el-table
        :data="formatedDoc"
        style="width: 100%; font-family: Roboto, sans-serif;"
      >
        <el-table-column prop="userName" label="User Name" width="180">
        </el-table-column>
        <el-table-column prop="totalPostCount" label="Total Posted" width="180">
        </el-table-column>
        <el-table-column
          prop="totalPostDelete"
          label="Deleted Post"
          width="180"
        >
        </el-table-column>
        <!-- <el-table-column prop="chatSendCount" label="Message Sent(deprecated)" width="180">
        </el-table-column> -->
        <el-table-column prop="submitReqForExploreHome" label="ExploreHome Submit" width="180">
        </el-table-column>
        <el-table-column prop="exploreHome" label="ExploreHome Visited" width="180">
        </el-table-column>
        <el-table-column prop="avideoPage" label="Adult Visited" width="180">
        </el-table-column>
        <el-table-column prop="videoPlayed" label="Video Played" width="180">
        </el-table-column>
        <el-table-column prop="avideoPlayed" label="AVideo Played" width="180">
        </el-table-column>
        <el-table-column prop="imgUploaded" label="Image Sent" width="180">
        </el-table-column>
        <el-table-column prop="chatDeleted" label="Message Deleted(deprecated)" width="180">
        </el-table-column>
        <el-table-column prop="imgDeleted" label="Image Deleted" width="180">
        </el-table-column>
        <el-table-column
          prop="dpChanged"
          label="Cover & Dp Changed"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="isDark" label="Dark Mode" width="180">
        </el-table-column>
        <el-table-column prop="editorUsed" label="Quill Editor Opened" width="180">
        </el-table-column>
      </el-table>
    </div>
    <!-- elementplus -->

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
    <!-- primevue -->

    <!-- elementplus -->
    <div class="el-table">
      <h3 style="margin: 10px; padding: 5px;">Page Visited</h3>
      <el-table
        :data="formatedDoc"
        style="width: 100%; font-family: Roboto, sans-serif;"
      >
        <el-table-column prop="userName" label="User Name" width="180">
        </el-table-column>
        <el-table-column prop="pageVisited.home" label="Home Page" width="180">
        </el-table-column>
        <el-table-column
          prop="pageVisited.profile"
          label="Profile Page"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.messagePage"
          label="Message Page"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.privateMsg"
          label="Private Chat Room"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.chatRoomPage"
          label="Public Chat Room"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.editProfile"
          label="Edit Profile"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.coverp"
          label="Cover & Profile Photos"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.userList"
          label="User List"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.friendList"
          label="Friend List"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pageVisited.friendRequest"
          label="Friend Request"
          width="180"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- elementplus -->

    <div>
      <Dialog
        header="Logs (50 MAX)"
        v-model:visible="displayMaximizable"
        :style="editPostQuery"
        :maximizable="true"
        :modal="true"
      >
        <div v-for="k in dddd" :key="k">
          <!-- <p class="p-m-0"> -->
          <Chip class="logtime" :label="k" icon="pi pi-clock" />
          <!-- </p> -->
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
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import Chip from "primevue/chip";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getUsers from "@/composable/getUsers";
import getUser from "@/composable/getUser";
import { format } from "date-fns";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
export default {
  components: { DataTable, Column, Dialog, Chip },
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
            dddd[key] = `[${key}] ${time}`;
          }
          dddd.reverse();
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

.logtime {
  margin-top: 10px;
}

.el-table {
  // margin: 10px auto;
  font-family: "Roboto", sans-serif;
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
