import {
    ref
} from 'vue'
import {
    projectAuth
} from '../firebase/config'
import {
    projectFirestore
} from '../firebase/config'

const error = ref(null)

const signup = async (email, password, displayname) => {
    error.value = null

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)

        if (!res) {
            throw new Error('Could not complete the signup')
        }

        await res.user.updateProfile({
            displayName: displayname
        })

        const userUid = res.user.uid
        const userEmail = res.user.email
        const userName = res.user.displayName
        const userPass = password

        const account = {
            userUid,
            userEmail,
            userName,
            userPass
        }

        projectFirestore.collection('profiles').doc(userUid).set(account)

        error.value = null
        // console.log(res.user)
        return res
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    return {
        error,
        signup
    }
}

export default useSignup