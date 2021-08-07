import { projectFirestore, timestamp } from "../firebase/config";

const lastSeen = () => {
  const performLastSeen = async (userId) => {
    try {
      await projectFirestore
        .collection("profiles")
        .doc(userId)
        .update({
          lastVisited: timestamp(),
        });
    } catch (err) {
      console.log(err);
    }
  };
  return { performLastSeen };
};

export { lastSeen };
