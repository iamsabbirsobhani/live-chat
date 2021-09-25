import { projectFirestore } from "@/firebase/config.js";
import { timestamp } from "@/firebase/config";

const deleteChat = () => {
  const performDelete = (docId, img) => {
    if (img.url == false) {
      projectFirestore
        .collection("privateChat")
        .doc("chat")
        .collection("chat")
        .doc(docId)
        .update({
          message: `${img.name} unsent a message`,
          deletedAt: timestamp(),
        });
    }
    if (img.url == true) {
      projectFirestore
        .collection("privateChat")
        .doc("chat")
        .collection("chat")
        .doc(docId)
        .update({
          message: `${img.name} unsent an image or a video`,
          imgUrl: null,
          deletedAt: timestamp(),
        });
    }
  };
  return { performDelete };
};

export { deleteChat };