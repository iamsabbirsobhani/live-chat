import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getVideosUrl = () => {
  const url = ref("");
  // type.value = null
  let collectionRef = projectFirestore
    .collection("videos")
    .orderBy("createdAt", "desc");

  collectionRef.onSnapshot((snap) => {
    let results = [];
    // console.log('snapshot')
    snap.docs.forEach((doc) => {
      doc.data().createdAt &&
        results.push({
          ...doc.data(),
          id: doc.id,
        });
    });

    url.value = results;
    // console.log(comments.value)
  });
  return {
    url,
  };
};
export default getVideosUrl;
