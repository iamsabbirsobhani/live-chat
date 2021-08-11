import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

let doc = ref(null);

const getSingleDoc = () => {
  const getDoc = async (data) => {
    let docRef = projectFirestore
      .collection(data.collection)
      .doc(data.docId)
      .get();
    try {
      let data = (await docRef).data();
      doc.value = data;
    } catch (error) {
      console.log("Error getting document:", error);
    }
    return doc.value
};
return { getDoc };
};

export { getSingleDoc };
