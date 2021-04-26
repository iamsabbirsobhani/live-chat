import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'
import getUser from '@/composable/getUser.js'

const {
    user
} = getUser()

const useCollection = (collection) => {
    const error = ref(null)

    const addDoc = async (doc) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).doc('profile').collection(user.uid).add(doc)
            // we can only add "custom id" documents under a "collection"
            // we can not add "custom id" documents inside a "document"
        } catch (err) {
            console.log(err)
            error.value = 'Could not send the message'
        }
    }

    return {
        error,
        addDoc
    }
}

export default useCollection