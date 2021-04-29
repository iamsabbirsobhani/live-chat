<template>
<el-page-header  style="margin: 10px;" @back="goBack" content="Profile">
</el-page-header>
  <h2 style="text-align: center">All the users</h2>
  <div v-for="doc in documents" :key="doc.userUid">
    <router-link style="text-decoration: none;" :to="{ name: 'Profile', params: {id: doc.userUid}}">
    <div class="users">
      <div class="name">
      <el-avatar :size="60" src="https://empty" @error="errorHandler">
        <img :src="doc.phofilePhoto" />
      </el-avatar>
      <h4>{{ doc.userName }}</h4>
      </div>
      <div class="title">
        <p>{{ doc.profession }}</p>
        <p>{{ doc.location }}</p>
      </div>
    </div>
    </router-link>
  </div>
</template>

<script>
import getUsers from "@/composable/getUsers.js";
import getUser from "../composable/getUser";
import { useRouter } from "vue-router"
export default {
  props: ["id"],
  setup(props) {
    const { error, documents } = getUsers();
    const { user } = getUser()
    const router = useRouter()

    const goBack = () => {
      router.push({ name: "Profile", params: {id: user.value.uid}})
    }

    return { documents, goBack };
  },
};
</script>

<style scoped>
.users {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  background-color: rgb(230, 230, 230);
  margin: 10px auto;
  border-radius: 10px;
  padding: 10px;
}
.users:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.title {
    font-size: 12px;
    margin: 10px;
}

  .name {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.name h4{
    margin-left: 10px;
}

@media (max-width: 425px) {
  .users {
    max-width: 300px;
  }
}
</style>