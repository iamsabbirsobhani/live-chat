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


  <el-page-header class="page-head" @back="goBack" content="profile"> </el-page-header>


  <!-- primevue -->
  <DataTable :value="formatedDoc" responsiveLayout="scroll">
    <template #header>
      <div class="table-header">
        User Activity
      </div>
    </template>
    <Column field="name" header="Name">
      <template #body="slotProps">
        <div>
          <p>{{ slotProps.data.userName }}</p>
        </div>
      </template>
    </Column>

    <Column header="Profile Photo">
      <template #body="slotProps">
        <img
          :src="slotProps.data.phofilePhoto"
          :alt="slotProps.data.userName"
          class="product-image"
        />
      </template>
    </Column>

    <Column field="lastvisited" header="Last Visited">
      <template #body="slotProps">
        <div>
          {{ slotProps.data.lastVisited }}
        </div>
      </template>
    </Column>
  </DataTable>
  <!-- primevue -->
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import getUsers from "@/composable/getUsers";
import getUser from "@/composable/getUser";
import { format } from "date-fns";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { DataTable, Column },
  setup() {
    const { documents } = getUsers();
    const { user } = getUser();
    const router = useRouter();

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

    return { formatedDoc, goBack };
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap');

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.page-head {
    font-family: 'Roboto', sans-serif;
    margin: 10px;
}
</style>
