import {
    ref
} from 'vue'


import { projectAuth } from '../firebase/config'

const error = ref(null)


const delUser = async () => {
    var user = projectAuth.currentUser;
    error.value = null
    try{
        // console.log(user)
        await user.delete()
    } catch(err) {
        error.value = err.message
        console.log(err.message)
    }
}
const userDelete = () => {
    return { delUser, error }
}

export default userDelete