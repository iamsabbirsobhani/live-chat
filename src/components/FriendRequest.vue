<template>
  <el-page-header
    style="margin: 10px"
    class="pghd"
    @back="goBack"
    content="Profile"
  >
  </el-page-header>
  <h3 style="text-align: center">Friend Request</h3>

  <div v-for="doc in documents" :key="doc.userUid">
    <div v-for="fr in info.friendRequest" :key="fr.id">
      <div v-if="doc.id === fr">
        <div class="users">
          <router-link
            style="text-decoration: none"
            :to="{ name: 'Profile', params: { id: doc.userUid } }"
          >
            <div class="name">
              <el-avatar :size="60">
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
            <Button
          v-if="!(doc.userUid === user.uid)"
          @click="accepts(user.uid, doc.userUid)"
          icon="pi pi-check"
          class="p-button-rounded p-button-success"
        />
            <Button
            style="margin-left: 10px;"
          v-if="!(doc.userUid === user.uid)"
          @click="rejects(user.uid, doc.userUid)"
          icon="pi pi-times"
          class="p-button-rounded p-button-danger p-button-outlined"
        />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getProfile from "@/composable/getProfile.js";
import { useRouter } from "vue-router";
import getUsers from "@/composable/getUsers.js";
import acceptReq from "@/composable/acceptReq/acceptReq.js";
import updateRequester from "@/composable/acceptReq/updateRequester.js";
import getUser from "@/composable/getUser.js";

export default {
  props: ["id"],
  setup(props) {
    const { info } = getProfile("profiles", props.id);
    const router = useRouter();
    const { error, documents } = getUsers();
    const { user } = getUser()
    const { accept } = acceptReq()
    const { update } = updateRequester()

    const goBack = () => {
      router.push({ name: "Profile" });
    };

    const accepts = (userId, reqId) => {
      console.log('User ID ', userId, 'Req Id ', reqId)
      console.log('Accepted')
      accept(userId, reqId)
      update(userId, reqId)
    }
    const rejects = (userId, reqId) => {
      console.log('User ID ', userId, 'Req Id ', reqId)
      console.log('Rejected')
    }

    return { info, goBack, documents, accepts, rejects, user };
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
  /* margin: 10px; */
}

.name {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.name h4 {
  margin-left: 10px;
}
p {
  margin: 0px;
  padding: 0px;
}

@media (max-width: 425px) {
  .users {
    max-width: 340px;
  }
  .p-button-rounded {
    margin-left: 5px;
  }
}
</style>