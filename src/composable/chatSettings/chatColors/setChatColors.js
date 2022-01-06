import getUser from "@/composable/getUser";
import { projectFirestore } from "@/firebase/config";
const { user } = getUser();
const setChatColors = async (
  ownChipColor,
  ownTextColor,
  otherChipColor,
  otherTextColor
) => {
  try {
    await projectFirestore
      .collection("profiles")
      .doc(user.value.uid)
      .update({
        ownChipColor,
        ownTextColor,
        otherChipColor,
        otherTextColor,
      });
  } catch (error) {
    console.log(error);
  }
};

export { setChatColors };
