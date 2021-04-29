import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const userEditProfileInfo = () => {
    const error = ref(null)

    const addDoc = async (doc, info) => {
        error.value = null
        try {
            await projectFirestore.collection('profiles').doc(doc).update(info);
            // console.log('Hey I am in Update')
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

export default userEditProfileInfo