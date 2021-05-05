// import {
//     projectFirestore
// } from '@/firebase/config.js'
// import {
//     ref
// } from '@vue/reactivity';

// const acceptReq = () => {

//     const accept = (id, requester) => {
//         const error = ref(null)
//         const collectionRef = projectFirestore.collection('profiles').doc(id)

//         const updateReq = async () => {
//             const user = ref('')


//             const doc = await collectionRef.get()


//             if (!doc.exists) {
//                 console.log('No such document!');
//             } else {
//                 user.value = doc.data()
//             }


//             // user
//             let thisFriendList = []
//             thisFriendList = user.value.friendList
//             let thisFriendRequest = []
//             thisFriendRequest = user.value.friendRequest

//             let newFriendList = thisFriendList.filter((lid) => {
//                 return lid === requester
//             })
//             let newFriendRequest = thisFriendRequest.filter((lid) => {
//                 return lid === requester
//             })
//             // user


//             try {
//                 if (newFriendRequest[0] && !newFriendList[0]) {

//                     thisFriendList.push(newFriendRequest[0])

//                     let index = thisFriendRequest.indexOf(newFriendRequest[0], 0)

//                     thisFriendRequest.splice(index, 1)

//                     const doc = {
//                         friendList: thisFriendList,
//                         friendRequest: thisFriendRequest
//                     }

//                     await projectFirestore.collection('profiles').doc(id).update(doc);
//                 }

//             } catch (err) {

//                 console.log(err)
//                 error.value = 'Could not send the message'
//             }

//             error.value = null
//         }
//         updateReq()
//     }
//     return {
//         accept,
//     }
// }

// export default acceptReq