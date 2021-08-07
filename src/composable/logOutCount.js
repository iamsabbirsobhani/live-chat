import getUser from "@/composable/getUser";
import { projectFirestore } from '../firebase/config'
const { user } = getUser();
let count;

const logOutCount = async () => {
  try {
    const userData = await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .get();
    if (userData.exists) {
      count = userData.data().logoutCount + 1;
    }
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        logoutCount: count,
      });
  } catch (error) {
      console.log(error);
  }
};

export { logOutCount };
