import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import Profile from "../components/Profile.vue";
import UserList from "../components/UserList.vue";
import EditProfile from "../components/EditProfile.vue";
import UpdateCoverAndDP from "../components/UpdateCoverAndDP.vue";
import FriendRequest from "@/components/FriendRequest.vue";
import FriendList from "@/components/FriendList.vue";
import Messages from "@/components/Messages.vue";
import PrivateChat from "@/views/PrivateChat/PrivateChat.vue";
import Home from "../components/Home.vue";
import UserActivity from "../components/UserActivity.vue";
import { projectAuth } from "../firebase/config";
import { lastSeen } from "@/composable/lastSeen";
import getUser from "@/composable/getUser";
const { user } = getUser();

const { performLastSeen } = lastSeen();

// Authintication guard
const requiredAuth = async (to, from, next) => {
  let user = projectAuth.currentUser; //Checking if a user is authinticated or not
  // console.log('Current user is auth guard', user)
  if (!user) {
    //if user is not authinticated
    next({ name: "Welcome" }); //it will be redirected to 'Welcome' route
  } else {
    await performLastSeen(user.uid);
    next(); //if user is authinticated, then it will be permitted to go to 'chatroom' route only.
  } //here next() means the route where we will place requiredAuth(), for this case we placed requiredAuth()
  //inside "routes" at '/chatroom's' path, So for this case if user is authenticated they can go to 'Chatroom'
};
// Final Route Guard
// if a user is authincated or logged in, then the user can not see the "sign in"/"root"/"sign up" page again.
// Once user logged out, only then user can see the "sign in"/"root"/"sign up" page again.

const adminPage = (to, from, next) => {
  if(user.value.uid !== `MORuJJ0PWpb3inamywW5sSrHDGq2`) {
    next({ name: "Home" });
  } else {
    next();
  }
}

const requiredNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

// End of Authintication guard

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: requiredNoAuth, //users have to face "beforeEnter" key, before they want to come to this route
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    beforeEnter: requiredAuth, //users have to face "beforeEnter" key, before they want to come to this route
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/profile/:id/editprofile",
    name: "EditProfile",
    component: EditProfile,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/profile/:id/friendrequest",
    name: "FriendRequest",
    component: FriendRequest,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/profile/friendlist/:id",
    name: "FriendList",
    component: FriendList,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/home/messages/:id",
    name: "Messages",
    component: Messages,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/:route/:routeTwo/privatechat/:id",
    name: "PrivateChat",
    component: PrivateChat,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/userlist",
    name: "UserList",
    component: UserList,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/useractivity",
    name: "UserActivity",
    component: UserActivity,
    beforeEnter: adminPage,
    props: true,
  },
  {
    path: "/profile/:id/updatecoveranddp",
    name: "UpdateCoverAndDP",
    component: UpdateCoverAndDP,
    beforeEnter: requiredAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
