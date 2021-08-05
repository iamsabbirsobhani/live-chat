import {
    ref
  } from 'vue'
  import {
    projectFirestore
  } from '../firebase/config'

const postP = ref(null);
let docRef = null;
let docId = null;
const getPostById = () => {
    const getP = (id) => {
        docId = id
        docRef = projectFirestore.collection("posts").doc(docId);
        docRef.get().then(doc => {
            console.log(doc.data());
            postP.value = doc.data();
        }).catch(error => {
            console.log("Error msg: ", error);
        });
    }
    const updatePost = async (post) => {
        console.log(docId)
        try {
            await projectFirestore.collection("posts").doc(docId).update(post)
        } catch(error) {
            console.log(error)
        }
    }
    const docDel = async () => {
        try {
            await projectFirestore.collection('posts').doc(docId).delete();
        } catch (err) {
            console.log(err)
        }
    }
    return { postP, getP, updatePost, docDel}
}

export { getPostById }