import { ref } from "vue";
import { projectAuth, timestamp } from "../firebase/config";
import { projectFirestore } from "../firebase/config";

const error = ref(null);

const signup = async (email, password, displayname) => {
  error.value = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!res) {
      throw new Error("Could not complete the signup");
    }

    await res.user.updateProfile({
      displayName: displayname,
    });

    const userUid = res.user.uid;
    const userEmail = res.user.email;
    const userName = res.user.displayName;
    const userPass = password;
    const coverPhoto = null;
    const phofilePhoto =
      "https://firebasestorage.googleapis.com/v0/b/live-chat-backup-server-28985.appspot.com/o/default_images%2Fdefault_dp.png?alt=media&token=b0449373-ff9b-438d-962f-d300a005ba7c";
    const bio = "World is rotating";
    const profession = "Dreamer";
    const location = "Mars";
    const interest = "Infinity";
    const friendList = [];
    const friendRequest = [];
    const isType = false;
    const typeTo = null;
    const index = 0;
    const lastVisited = timestamp();
    const loginCount = 0;
    const logoutCount = 0;
    const logs = { 0: timestamp() };
    const totalPostCount = 0;
    const totalPostDelete = 0;
    const chatDeleted = 0;
    const chatSendCount = 0;
    const dpChanged = 0;
    const imgDeleted = 0;
    const imgUploaded = 0;
    const editorUsed = 0;
    const pageVisited = {
      home: 0,
      profile: 0,
      privateMsg: 0,
      chatRoomPage: 0,
      coverp: 0,
      editProfile: 0,
      userList: 0,
      friendList: 0,
      friendRequest: 0,
      messagePage: 0,
    };
    const isDark = false;
    const geoLocation = null;
    const exploreHome = 0;
    const submitReqForExploreHome = 0;
    const avideoPage = 0;
    const avideoPlayed = 0;
    const videoPlayed = 0;
    const fcmTokens = [];
    const ownChipColor = "#0084ff";
    const otherChipColor = "#3f4b5b";
    const ownTextColor = "#f9fafb";
    const otherTextColor = "#ffffffde";

    const account = {
      userUid,
      userEmail,
      userName,
      userPass,
      coverPhoto,
      phofilePhoto,
      bio,
      profession,
      location,
      interest,
      friendList,
      friendRequest,
      isType,
      typeTo,
      index,
      lastVisited,
      loginCount,
      logoutCount,
      logs,
      totalPostCount,
      totalPostDelete,
      chatDeleted,
      chatSendCount,
      dpChanged,
      imgDeleted,
      imgUploaded,
      pageVisited,
      isDark,
      editorUsed,
      geoLocation,
      exploreHome,
      submitReqForExploreHome,
      avideoPage,
      avideoPlayed,
      videoPlayed,
      fcmTokens,
      ownChipColor,
      otherChipColor,
      ownTextColor,
      otherTextColor,
    };

    projectFirestore
      .collection("profiles")
      .doc(userUid)
      .set(account);

    error.value = null;
    // console.log(res.user)
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return {
    error,
    signup,
  };
};

export default useSignup;
