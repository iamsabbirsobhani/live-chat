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

const useGeoLocation = (collection) => {
    const error = ref(null)

    const addDoc = async (data) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).doc(user.value.uid).update(data);
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

export default useGeoLocation