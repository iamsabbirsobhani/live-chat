import {
  createRouter,
  createWebHistory,
  onBeforeRouteUpdate,
} from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import Profile from "../components/Profile.vue";
import UserList from "../components/UserList.vue";
import ExploreHome from "../components/ExploreHome.vue";
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
import { logs } from "@/composable/logs";
import getUser from "@/composable/getUser";
import Authentication from "@/subComponent/Authentication.vue";
const { user } = getUser();
import { getSingleDoc } from "@/composable/getSingleDoc.js";
let { getDoc } = getSingleDoc();

// import getProfile from "@/composable/getProfile.js";
import store from "../store";
// import {  useStore } from "vuex";

const { performLastSeen } = lastSeen();

// Authintication guard
const requiredAuth = async (to, from, next) => {
  let user = projectAuth.currentUser; //Checking if a user is authinticated or not
  if (!user) {
    //if user is not authinticated
    next({ name: "Welcome" }); //it will be redirected to 'Welcome' route
  } else {
    await logs();
    await performLastSeen(user.uid);
    next(); //if user is authinticated, then it will be permitted to go to 'chatroom' route only.
  } //here next() means the route where we will place requiredAuth(), for this case we placed requiredAuth()
  //inside "routes" at '/chatroom's' path, So for this case if user is authenticated they can go to 'Chatroom'
};
// Final Route Guard
// if a user is authincated or logged in, then the user can not see the "sign in"/"root"/"sign up" page again.
// Once user logged out, only then user can see the "sign in"/"root"/"sign up" page again.

const adminPage = (to, from, next) => {
  if (
    user.value.uid !== `oJStHj6xShPbVyEFpwmK1B1rjAk2` &&
    user.value.uid !== `MORuJJ0PWpb3inamywW5sSrHDGq2` &&
    user.value.uid !== `UO1BAq0rxycSpKKt3cIlgWgkZpi1`
  ) {
    next({ name: "Home" });
  } else {
    next();
  }
};

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
    meta: {
      title: "Live Chat - Welcome",
      metaTags: [
        {
          name: "description",
          content: "Welcome to Live Chat",
        },
        {
          property: "og:description",
          content:
            "Live Chat is a live chatting and social media web application. Create an account and start surfing!",
        },
      ],
    },
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    beforeEnter: requiredAuth, //users have to face "beforeEnter" key, before they want to come to this route
    meta: {
      title: "Chatroom - Public Chat",
      metaTags: [
        {
          name: "description",
          content: "Public chatroom of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "Public chatroom of our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: `Profile`, // rendered as <title>Profile</title>
      metaTags: [
        // these will be rendered like <meta name="" content="">
        {
          name: "description",
          content: "User profile of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "User profile of our Live Chat app.",
        },
        {
          name: `theme-color`,
          content: "#319197",
        },
      ],
    },
  },
  {
    path: "/profile/:id/editprofile",
    name: "EditProfile",
    component: EditProfile,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Edit Profile",
      metaTags: [
        {
          name: "description",
          content: "Edit data profile of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "Edit data profile of our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/profile/:id/friendrequest",
    name: "FriendRequest",
    component: FriendRequest,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Friend Request",
      metaTags: [
        {
          name: "description",
          content: "See friend request of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "See friend request of our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/profile/friendlist/:id",
    name: "FriendList",
    component: FriendList,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Friend List",
      metaTags: [
        {
          name: "description",
          content: "See friend list of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "See friend list of our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/home/messages/:id",
    name: "Messages",
    component: Messages,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Messages",
      metaTags: [
        {
          name: "description",
          content: "See active private chat of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "See active private chatof our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/:route/:routeTwo/privatechat/:id",
    name: "PrivateChat",
    component: PrivateChat,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Private Chat",
      metaTags: [
        {
          name: "description",
          content: "See private chat of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "See private chat of our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/userlist",
    name: "UserList",
    component: UserList,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "User List",
      metaTags: [
        {
          name: "description",
          content: "See user list of our Live Chat app.",
        },
        {
          property: "og:description",
          content: "See user list of our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Home",
      metaTags: [
        {
          name: "description",
          content: "Home page our Live Chat app.",
        },
        {
          property: "og:description",
          content: "Home page our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/authentication",
    name: "Authentication",
    component: Authentication,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Authentication",
      metaTags: [
        {
          name: "description",
          content: "Passphrase Authentication.",
        },
        {
          property: "og:description",
          content: "One more authentication required.",
        },
      ],
    },
  },
  {
    path: "/useractivity",
    name: "UserActivity",
    component: UserActivity,
    beforeEnter: adminPage,
    props: true,
    meta: {
      title: "User Activity",
      metaTags: [
        {
          name: "description",
          content: "For Admin only user activity our Live Chat app.",
        },
        {
          property: "og:description",
          content: "For Admin only user activity our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/profile/:id/updatecoveranddp",
    name: "UpdateCoverAndDP",
    component: UpdateCoverAndDP,
    beforeEnter: requiredAuth,
    props: true,
    meta: {
      title: "Update cover and dp",
      metaTags: [
        {
          name: "description",
          content:
            "Update users profile photo and cover photo our Live Chat app.",
        },
        {
          property: "og:description",
          content:
            "Update users profile photo and cover photo our Live Chat app.",
        },
      ],
    },
  },
  {
    path: "/home/explorehome",
    name: "ExploreHome",
    component: ExploreHome,
    beforeEnter: requiredAuth,
    meta: {
      title: "Explore Home",
      metaTags: [
        {
          name: "description",
          content: "Explore home is a secret page of this web app.",
        },
        {
          property: "og:description",
          content: "Explore home is a secret page of this Live Chat web app.",
        },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach(async (to, from, next) => {
  // const store = useStore();

  let user = projectAuth.currentUser;
  let doc;
  if (to.params.id && to.params.id != user.uid) {
    document.title = `Live Chat loading...`;
    doc = await getDoc({ collection: "profiles", docId: to.params.id });
  }
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    if (
      nearestWithTitle.meta.title.includes("Profile") &&
      user.uid != to.params.id
    ) {
      document.title = `${doc.userName} | ${nearestWithTitle.meta.title}`;
    } else if (nearestWithTitle.meta.title.includes("Profile")) {
      document.title = `${user.displayName} | ${nearestWithTitle.meta.title}`;
    } else {
      document.title = nearestWithTitle.meta.title;
    }
    // console.log(nearestWithTitle.meta.title)
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
