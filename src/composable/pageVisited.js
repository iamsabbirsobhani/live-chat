import getUser from "@/composable/getUser";
import { projectFirestore } from "../firebase/config";
const { user } = getUser();

let count;
let homePage;
let profilePage;
let pvtMsgPage;
let privateMessagePage;
let friendListPage;
let userDataProfile;
let userDataPvtMsg;
let userDataHome;

const loadDatabase = async () => {
  userDataProfile = await projectFirestore
    .collection("profiles")
    .doc(user.value.uid)
    .get();

  userDataPvtMsg = await projectFirestore
    .collection("profiles")
    .doc(user.value.uid)
    .get();

  userDataHome = await projectFirestore
    .collection("profiles")
    .doc(user.value.uid)
    .get();
};

const profile = async () => {
  try {
    await loadDatabase();
    if (userDataProfile.exists) {
      profilePage = userDataProfile.data().pageVisited.profile + 1;
      homePage = userDataHome.data().pageVisited.home;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          profile: profilePage,
          home: homePage,
          privateMsg: pvtMsgPage
        },
      });
  } catch (error) {
    console.log(error);
  }
};

const privateMsgPage = async () => {
  try {
    await loadDatabase();
    if (userDataPvtMsg.exists) {
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg + 1;
      profilePage = userDataProfile.data().pageVisited.profile;
      homePage = userDataHome.data().pageVisited.home;
    }

    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
        },
      });
  } catch (error) {
    console.log(error);
  }
};

const home = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home + 1;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export { profile, home, privateMsgPage };
