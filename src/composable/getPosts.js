// import { ref } from "vue";
// import { projectFirestore } from "../firebase/config";

// // global binding
// let first = null;
// let results = [];
// let newResults = [];
// let lastB = null;
// let last = null;
// let snapshotB = null;
// let snapshot = null;
// let next = null;
// const statusHome = ref("");
// const status = ref("");

// const getPosts = (collection, id) => {
//   statusHome.value = null;
//   status.value = null;
//   next = null;
//   lastB = null;
//   last = null;
//   first = null;

//   const showMoreBtn = ref(false);

//   // let collectionRef = projectFirestore.collection(collection).doc(id).collection('posts')
//   let collectionRef = projectFirestore
//     .collection(collection)
//     .orderBy("createdAt", "desc")
//     .limit(4);

//   collectionRef.onSnapshot((snap) => {
//     // console.log('snapshot')
//     snap.docs.forEach((doc) => {
//       doc.data().createdAt &&
//         results.push({
//           ...doc.data(),
//           id: doc.id,
//         });
//     });

//     const newUser = results.filter((user) => {
//       return user.userId == id;
//     });

//     showMoreBtn.value = false;

//     status.value = newUser;

//     newResults = results;

//     statusHome.value = results;

//     // console.log(results)
//     // console.log(statusHome.value)
//     results = [];
//   });

//   const morePosts = async () => {
//     statusHome.value = null;
//     snapshot = await collectionRef.get();
//     last = snapshot.docs[snapshot.docs.length - 1];

//     // preview output
//     // if (last) {
//     //   console.log("Last", last.data());
//     // }

//     next = projectFirestore
//       .collection(collection)
//       .orderBy("createdAt", "desc")
//       .startAfter(first || last)
//       .limit(4);

//     snapshotB = await next.get();
//     lastB = snapshotB.docs[snapshotB.docs.length - 1];

//     // preview output
//     // if (lastB) {
//     //   console.log("Last B", lastB.data());
//     // }

//     next.onSnapshot(
//       (doc) => {
//         doc.docs.forEach((doc) => {
//           doc.data().createdAt &&
//             newResults.push({
//               ...doc.data(),
//               id: doc.id,
//             });
//         });

//         statusHome.value = newResults;

//         // when reached at the last document
//         if (lastB) {
//           first = lastB;
//           showMoreBtn.value = false;
//         } else {
//           console.log("No more documents");
//           showMoreBtn.value = true;
//           first = null;
//           lastB = null;
//           snapshotB = null;
//         }
//         error.value = null;
//       },
//       (err) => {
//         console.log(err.message);
//         statusHome.value = null;
//         error.value = "Could not fetch data";
//       }
//     );
//   };

//   return {
//     status,
//     statusHome,
//     morePosts,
//     showMoreBtn,
//   };
// };
// export default getPosts;

import {
  ref
} from 'vue'
import {
  projectFirestore
} from '../firebase/config'


const getPosts = (collection, id) => {
  const status = ref('')
  const statusHome = ref('')

  // let collectionRef = projectFirestore.collection(collection).doc(id).collection('posts')
  let collectionRef = projectFirestore.collection(collection).orderBy('createdAt', 'desc')


          collectionRef.onSnapshot((snap) => {
              let results = []
              // console.log('snapshot')
              snap.docs.forEach(doc => {
                  doc.data().createdAt && doc.data().editedAt && results.push({
                      ...doc.data(),
                      id: doc.id
                  })
              })

              const newUser = results.filter((user) => {
                  return user.userId == id
              })

              status.value = newUser

              statusHome.value = results

              // console.log(results)
              // console.log(statusHome.value)
          })

  return {
      status,
      statusHome
  }
}
export default getPosts