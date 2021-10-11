import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const useVideos = (collection) => {
    const error = ref(null)

    const postVideoUrl = async (doc) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).add(doc)
        } catch (err) {
            console.log(err)
            error.value = 'Could not send the comments'
        }
    }

    return {
        error,
        postVideoUrl
    }
}

export default useVideos