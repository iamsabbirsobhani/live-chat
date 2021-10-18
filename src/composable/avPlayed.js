import { projectFirestore } from '../firebase/config'
let count;
const avPlayed = async (field) => {
  try {
    const userData = await projectFirestore
    .collection("avideosplayed")
    .doc(field.id)
    .get();

    if (userData.exists) {
      count = userData.data()[field.key] + 1;
    }
    // console.log(count)
    await projectFirestore
      .collection("avideosplayed")
      .doc(field.id)
      .update({
        [field.key]: count,
        title: field.title,
        url: field.url,
        tags: field.tags,
        private: field.private,
      });
    count = 0;
  } catch (error) {
      console.log(error);
  }
};

export { avPlayed };
