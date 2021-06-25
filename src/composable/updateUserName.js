import { projectAuth } from '../firebase/config'
import { projectFirebase } from '../firebase/config'


const updateUserName = async (name) => {
    await projectAuth.currentUser.updateProfile({
        displayName: name
    })
    const profileRef = projectFirebase.collection("profiles").doc(projectAuth.currentUser.uid)

    await profileRef.update({
        userName: name
    })
}

const updateUserPass = async (newPassword) => {
    await projectAuth.currentUser.updatePassword(newPassword);

    const profileRef = projectFirebase.collection("profiles").doc(projectAuth.currentUser.uid)

    await profileRef.update({
        userPass: newPassword
    })
}

export {updateUserName, updateUserPass}