import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const userPost = (id) => {
    const error = ref(null)

    const addPost = async (doc) => {
        error.value = null

        try {
            await projectFirestore.collection('profiles').doc(id).collection("posts").add(doc)
            await projectFirestore.collection('posts').add(doc)
            // we can only add "custom id" documents under a "collection"
            // we can not add "custom id" documents inside a "document"
        } catch (err) {
            console.log(err)
            error.value = 'Could not send the message'
        }
    }

    return {
        error,
        addPost
    }
}

export default userPost