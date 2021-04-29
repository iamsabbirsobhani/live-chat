import {
    ref
} from '@vue/reactivity'
import {
    projectStorage
} from '../firebase/config'
import getUser from './getUser'

const {
    user
} = getUser()

const userProfileStorage = () => {
    const error = ref(null)
    const urlCover = ref(null)
    const urlProfile = ref(null)
    const filePathCover = ref(null)
    const filePathProfile = ref(null)

    const uploadImage = async (coverPhoto, profilePhoto) => {
        filePathCover.value = `profiles/images/coverPhoto/${user.value.uid}/${coverPhoto.name}`
        filePathProfile.value = `profiles/images/profilePhoto/${user.value.uid}/${profilePhoto.name}`
        const storageRefCover = projectStorage.ref(filePathCover.value)
        const storageRefProfile = projectStorage.ref(filePathProfile.value)

        try {
            const cover = await storageRefCover.put(coverPhoto)
            const profile = await storageRefProfile.put(profilePhoto)
            urlCover.value = await cover.ref.getDownloadURL()
            urlProfile.value = await profile.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }
    return {
        urlCover,
        urlProfile,
        filePathCover,
        filePathProfile,
        error,
        uploadImage
    }
}

export default userProfileStorage