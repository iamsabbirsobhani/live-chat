import {
    ref
} from 'vue'
import { projectAuth } from '../firebase/config'
import { projectFirestore } from '@/firebase/config'


const error = ref(null)


const delUser = async () => {

    var user = projectAuth.currentUser;

    error.value = null
    try{

        await user.delete()

        await projectFirestore.collection('profiles').doc(user.uid).delete();

    } catch(err) {
        error.value = err.message
        console.log(err.message)
    }
}
const userDelete = () => {
    return { delUser, error }
}

export default userDelete