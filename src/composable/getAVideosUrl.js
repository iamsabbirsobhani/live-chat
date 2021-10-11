import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getAVideosUrl = () => {
  const url = ref("");
  // type.value = null
  let collectionRef = projectFirestore
    .collection("avideos")
    // .orderBy("asc");

  collectionRef.onSnapshot((snap) => {
    let results = [];
    // console.log('snapshot')
    snap.docs.forEach((doc) => {
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
export default getAVideosUrl;
