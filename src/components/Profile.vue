<template>
  <div class="profile">
    <div class="profile-card">
      <div class="cover">
        <el-empty v-if="!info.coverPhoto" description=" "></el-empty>

        <img v-else class="cover-photo" :src="info.coverPhoto" alt="cover" />
        <!-- <el-image
                class="cover-photo"
      style=" width: 100%; height: 100%"
      :src="srcTwo"
      :fit="fit">
      </el-image> -->
      </div>
      <div class="button-group">
        <el-dropdown trigger="click">
          <span
            class="el-dropdown-link"
            style="cursor: pointer; font-weight: bold; font-size: 17px"
          >
            Menu<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="home" icon="el-icon-house"
                >Home</el-dropdown-item
              >
              <el-dropdown-item @click="chatroom" icon="el-icon-chat-dot-round"
                >Chatroom</el-dropdown-item
              >
              <el-dropdown-item
                v-if="id == user.uid"
                @click="editProfile"
                icon="el-icon-edit-outline"
                >Edit Profile</el-dropdown-item
              >
              <el-dropdown-item @click="UserList" icon="el-icon-user"
                >User List</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="profile-photo-container">
        <!-- <img class="profile-photo" src="../assets/profile2.jpg" alt="cover"> -->
        <!-- <el-empty v-if="!info.phofilePhoto" description="empty"></el-empty> -->

        <el-avatar
          shape="square"
          :size="100"
          :fit="fit"
          :src="info.phofilePhoto"
        ></el-avatar>
      </div>
      <div class="info">
        <el-skeleton :rows="1" v-if="!info.userName" animated />
        <h3 v-else>{{ info.userName }}</h3>
        <p style="line-height: 1.2">{{ info.bio }}</p>
        <!-- <p>id is: {{ id }}</p> -->
      </div>
    </div>
  </div>
  <div v-if="info" class="add-info">
    <div v-if="info.location" class="place">
      <i class="el-icon-location-outline"></i>
      <p>{{ info.location }}</p>
    </div>
    <div v-if="info.profession" class="profession">
      <i class="el-icon-office-building"></i>
      <p>{{ info.profession }}</p>
    </div>
    <div v-if="info.interest" class="interest">
      <i class="el-icon-loading"></i>
      <p>{{ info.interest }}</p>
    </div>
  </div>

  <div v-if="id === user.uid" class="status">
    <el-input
      class="el-input"
      style="display: block"
      placeholder="Express your mind?"
      v-model="input"
    ></el-input>
    <el-button v-if="isLoading" type="primary" :loading="true"></el-button>
    <el-button
      v-else
      @click="post"
      class="el-button"
      type="primary"
      icon="el-icon-position"
    ></el-button>
  </div>

  <div v-if="info.post" class="post">
    <el-card shadow="always">
      <p>{{ info.post }}</p>
    </el-card>
  </div>
</template>

<script>
import getProfile from "@/composable/getProfile.js";
import { useRouter } from "vue-router";
import { ref } from "vue";
import getUser from "@/composable/getUser.js";
import userStatus from "@/composable/userStatus.js";
export default {
  props: ["id"],
  setup(props) {
    const { user } = getUser();
    const { info } = getProfile("profiles", props.id);
    const { addDoc } = userStatus();
    const router = useRouter();

    const isLoading = ref(false);

    const input = ref(null);

    const post = async () => {
      isLoading.value = true;
      if (input.value) {
        await addDoc(props.id, {
          post: input.value,
        });
      } else {
        console.log("Empty");
      }
      input.value = null;
      isLoading.value = false;
    };

    const chatroom = () => {
      router.push({ name: "Chatroom" });
    };

    const editProfile = () => {
      router.push({ name: "EditProfile" });
    };

    const UserList = () => {
      router.push({ name: "UserList" });
    };
    const home = () => {
      router.push({ name: "Home" });
    };

    return {
      info,
      chatroom,
      editProfile,
      user,
      UserList,
      input,
      post,
      isLoading,
      home,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");
.profile {
  /* font-family: 'Roboto', sans-serif; */
  font-family: "Montserrat", sans-serif;
  margin-bottom: 180px;
}
.profile-card {
  max-width: 600px;
  max-height: 200px;
  margin: 0px auto;
}
.cover {
  max-width: 600px;
  height: 200px;
}
.cover-photo {
  border-radius: 0px 0px 10px 10px;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.profile-photo {
  height: 100%;
  width: 100%;
  border-radius: 100px;
  border: 2px solid white;
}
.profile-photo-container {
  height: 110px;
  width: 110px;
  margin: auto;
  margin-top: -80px;
}
.info {
  text-align: center;
  line-height: 0.5;
}
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
.add-info {
  display: flex;
  justify-content: space-around;
  // align-items: center;
  max-width: 600px;
  margin: auto;
}
.place {
  text-align: center;
}

.profession {
  text-align: center;
}

.interest {
  text-align: center;
}

.status {
  display: flex;
  /* margin-top: 300px; */
  max-width: 300px;
  margin: 5px auto;
  .el-button {
    margin-left: 10px;
    height: 25px;
  }
}
.post {
  max-width: 300px;
  max-height: 200px;
  margin: 10px auto;
}

@media (max-width: 425px) {
  .place {
    max-width: 150px;
    word-wrap: break-word;
    padding: 5px;
  }

  .profession {
    max-width: 150px;
    word-wrap: break-word;
    padding: 5px;

  }

  .interest {
    max-width: 150px;
    word-wrap: break-word;
    padding: 5px;

  }
  .add-info {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    max-width: 320px;
  }
}
</style>>