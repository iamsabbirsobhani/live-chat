import { projectFirestore } from '@/firebase/config.js'
import { ref } from 'vue'

const unfriendSelf = (collection) => {
    const isLoading = ref(false)
    const data = ref('')
    let thisFriendList = []
    const doUnfriendSelf = (cruId, reqId) => {
        const collectionRef = projectFirestore.collection(collection).doc(cruId)

        const performUnfriend = async () => {
            isLoading.value = true
            const doc = await collectionRef.get()

            if (!doc.exists) {
                console.log('No such document!')
            } else {
                data.value = doc.data()
            }

            thisFriendList = data.value.friendList

            const newThisFriendList = thisFriendList.filter((id) => {
                return id === reqId
            })

            try{
                if (newThisFriendList[0]) {
                    let index = thisFriendList.indexOf(reqId, 0)
                    thisFriendList.splice(index, 1)
                    const doc = {
                        friendList: thisFriendList
                    }
                    await projectFirestore.collection(collection).doc(cruId).update(doc)
                }
                isLoading.value = false
            } catch (err) {
                console.log(err.message)
                console.log('Could not able perform to unfriend!')
            }
        }
        performUnfriend()
    }
    return { doUnfriendSelf }
}

export default unfriendSelf