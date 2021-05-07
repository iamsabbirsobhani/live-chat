import { projectFirestore } from '@/firebase/config'
import { ref } from 'vue'

const unfriendOther = (collection) => {
    const data = ref('')
    let thisFriendList = []
    const doUnfriendOther = (cruId, reqId) => {
        const collectionRef = projectFirestore.collection(collection).doc(reqId)

        const performUnfriend = async () => {

            const doc = await collectionRef.get()

            if (!doc.exists) {
                console.log('No such document!')
            } else {
                data.value = doc.data()
            }

            thisFriendList = data.value.friendList

            const newThisFriendList = thisFriendList.filter((id) => {
                return id === cruId
            })

            try{
                if (newThisFriendList[0]) {
                    let index = thisFriendList.indexOf(cruId, 0)
                    thisFriendList.splice(index, 1)
                    const doc = {
                        friendList: thisFriendList
                    }
                    await projectFirestore.collection(collection).doc(reqId).update(doc)
                }

            } catch (err) {
                console.log(err.message)
                console.log('Could not able perform to unfriend!')
            }
        }
        performUnfriend()
    }
    return { doUnfriendOther }
}

export default unfriendOther