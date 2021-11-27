import getUser from "@/composable/getUser";
import { projectFirestore } from "../firebase/config";
const { user } = getUser();
let fcmTokens = [];
const updateFCMToken = async (token) => {
  try {
    const userData = await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .get();

    if (userData.exists) {
      fcmTokens = userData.data().fcmTokens;
      if (!fcmTokens.includes(token)) {
        fcmTokens.push(token);
        await projectFirestore
        .collection("profiles")
        .doc(user.value.uid)
        .update({
          fcmTokens: fcmTokens,
        });
      }
    }
    // fcmTokens = [];
  } catch (error) {
    console.log(error);
  }
};

export { updateFCMToken };
