import { ref, watch } from 'vue'
import { projectAuth } from '../firebase/config'
import { projectFirestore } from '../firebase/config'
import  getUser  from "@/composable/getUser"
const { user }  = getUser()
const error = ref(null)
let count;
const login = async ( email, password ) => {
    error.value = null
    try{
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        const userData = await projectFirestore.collection('profiles').doc(user.value.uid).get()
        if(userData.exists) {
          count = userData.data().loginCount + 1;
        }
        await projectFirestore.collection('profiles').doc(user.value.uid).update({
            loginCount: count
        })
        return res
    } catch(err) {
        let ermsg = err.message
        error.value = ermsg
        console.log(err.code)
    }
}

const userLogin = () => {
    return {login, error}
}

export default userLogin