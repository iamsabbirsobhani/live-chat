import {
    ref
} from 'vue'
import {
    projectFirestore
} from '@/firebase/config'

const userTypingSetFlag = () => {
    const error = ref(null)

    const addDocType = async (doc, userTo) => {
        error.value = null
        try {
            await projectFirestore.collection('profiles').doc(userTo).update(doc);
            // console.log('Hey I am in Update')
        } catch (err) {
            console.log(err)
            error.value = 'Could not send the message'
        }
    }

    return {
        error,
        addDocType
    }
}

export default userTypingSetFlag