import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { timestamp } from "../firebase/config";

const useAVideos = (collection) => {
  const error = ref(null);

  const postAVideoUrl = async (doc) => {
    error.value = null;

    try {
      const res = await projectFirestore.collection(collection).add(doc);
      await projectFirestore
        .collection("avideosplayed")
        .doc(res.id)
        .set({
          played: 0,
          createdAt: timestamp()
        });
      console.log(res.id);
    } catch (err) {
      console.log(err);
      error.value = "Could not send the comments";
    }
  };

  return {
    error,
    postAVideoUrl,
  };
};

export default useAVideos;
