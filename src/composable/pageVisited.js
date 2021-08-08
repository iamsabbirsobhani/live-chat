import getUser from "@/composable/getUser";
import { projectFirestore } from "../firebase/config";
const { user } = getUser();

let count;
let homePage;
let profilePage;
let pvtMsgPage;
let chatRoomPage;
let coverp;
let editProfile;
let userList;
let friendList;
let friendRequest;
let messagePage;
let privateMessagePage;
// let friendListPage;
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
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile + 1;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          profile: profilePage,
          home: homePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

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
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }

    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

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
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const chatRoom = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage + 1;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const coverAndProfilePhoto = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp + 1;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const editProfilePage = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile + 1;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const userListPage = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList + 1;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const friendListPageCount = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList + 1;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;

    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const friendRequestPageCount = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest + 1;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage;
    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage

        },
      });
  } catch (error) {
    console.log(error);
  }
};

const messagePageCount = async () => {
  try {
    await loadDatabase();
    if (userDataHome.exists) {
      homePage = userDataHome.data().pageVisited.home;
      profilePage = userDataProfile.data().pageVisited.profile;
      pvtMsgPage = userDataPvtMsg.data().pageVisited.privateMsg;
      chatRoomPage = userDataPvtMsg.data().pageVisited.chatRoomPage;
      coverp = userDataPvtMsg.data().pageVisited.coverp;
      editProfile = userDataPvtMsg.data().pageVisited.editProfile;
      userList = userDataPvtMsg.data().pageVisited.userList;
      friendList = userDataPvtMsg.data().pageVisited.friendList;
      friendRequest = userDataPvtMsg.data().pageVisited.friendRequest;
      messagePage = userDataPvtMsg.data().pageVisited.messagePage + 1;
    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        pageVisited: {
          home: homePage,
          profile: profilePage,
          privateMsg: pvtMsgPage,
          chatRoomPage: chatRoomPage,
          coverp: coverp,
          editProfile: editProfile,
          userList: userList,
          friendList: friendList,
          friendRequest: friendRequest,
          messagePage: messagePage
        },
      });
  } catch (error) {
    console.log(error);
  }
};

export {
  profile,
  home,
  privateMsgPage,
  chatRoom,
  coverAndProfilePhoto,
  editProfilePage,
  userListPage,
  friendListPageCount,
  friendRequestPageCount,
  messagePageCount
};
