import getUser from "@/composable/getUser";
import { projectFirestore } from '../firebase/config'
const { user } = getUser();
let count;
const profileUpdateField = async (field) => {
  try {
    const userData = await projectFirestore
    .collection("profiles")
    .doc(user.value.uid)
    .get();

    if (userData.exists) {
      count = userData.data()[field.key] + 1;
    }
    // console.log(count)
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        [field.key]: count
      });
    count = 0;
  } catch (error) {
      console.log(error);
  }
};

export { profileUpdateField };
