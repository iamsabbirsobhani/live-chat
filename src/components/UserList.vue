<template>
<el-page-header class="pghd"  style="margin: 10px;" @back="goBack" content="Profile">
</el-page-header>
  <h2 style="text-align: center;font-family: Roboto, sans-serif;">All the users</h2>
  <div v-for="doc in documents" :key="doc.userUid">
    <div class="users">
    <router-link style="text-decoration: none;" :to="{ name: 'Profile', params: {id: doc.userUid}}">
      <div class="name">
      <el-avatar :size="60" src="https://empty" @error="errorHandler">
        <img :src="doc.phofilePhoto" />
      </el-avatar>
      <h4>{{ doc.userName }}</h4>
      </div>
    </router-link>
      <div class="title">
        <p>{{ doc.profession }}</p>
        <p>{{ doc.location }}</p>
      </div>
      <div class="addFriend">
        <Button v-if="!(doc.userUid === user.uid )" @click="addFriends(doc.userUid, user.uid)" icon="pi pi-user-plus" class="p-button-rounded p-button-success" />
      </div>
    </div>
  </div>
</template>

<script>
import getUsers from "@/composable/getUsers.js";
import getUser from "../composable/getUser";
import friendRequest from "../composable/friendRequest";
import { useRouter } from "vue-router"
import Button from 'primevue/button';
export default {
  props: ["id"],
  components: { Button },
  setup(props) {
    const { error, documents } = getUsers();
    const { user } = getUser()
    const router = useRouter()
    const { addFriend } = friendRequest()

    const goBack = () => {
      router.push({ name: "Profile", params: {id: user.value.uid}})
    }
    const addFriends = (fid, uid) => {
      console.log("Add user id:", fid, 'Current user id:', uid)
      addFriend(fid, uid)
    }

    return { documents, goBack, addFriends, user };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
.users {
  font-family: "Roboto", sans-serif;
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
    /* margin: 10px; */
}

  .name {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.name h4{
    margin-left: 10px;
}
p{
  margin: 0px;
  padding: 0px;
}

.pghd {
  font-family: "Roboto", sans-serif;
}
@media (max-width: 425px) {
  .users {
    max-width: 330px;
  }
}
</style>