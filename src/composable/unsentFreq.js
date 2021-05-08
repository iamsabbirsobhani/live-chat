import { projectFirestore } from '@/firebase/config.js'
import { ref } from 'vue'

const unsentFreq = (collection) => {
    const isLoading = ref(false)
    const data = ref('')
    let thisFriendRequest = []
    const doUnsent = (cruId, reqId) => {
        const collectionRef = projectFirestore.collection(collection).doc(reqId)

        const performUnfriend = async () => {
            isLoading.value = true
            const doc = await collectionRef.get()

            if (!doc.exists) {
                console.log('No such document!')
            } else {
                data.value = doc.data()
            }

            thisFriendRequest = data.value.friendRequest

            const newThisFriendRequest = thisFriendRequest.filter((id) => {
                return id === cruId
            })

            try{
                if (newThisFriendRequest[0]) {
                    let index = thisFriendRequest.indexOf(cruId, 0)
                    thisFriendRequest.splice(index, 1)
                    const doc = {
                        friendRequest: thisFriendRequest
                    }
                    await projectFirestore.collection(collection).doc(reqId).update(doc)
                }
                isLoading.value = false
            } catch (err) {
                console.log(err.message)
                console.log('Could not able perform to unfriend!')
            }
        }
        performUnfriend()
    }
    return { doUnsent }
}

export default unsentFreq