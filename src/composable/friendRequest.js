import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const friendRequest = () => {

    const error = ref(null)
    const addFriend = (toId, fromId) => {
        error.value = null
        const collectionRef = projectFirestore.collection('profiles').doc(toId)

        const updateFriendReq = async () => {
            const frReq = ref('')

            const doc = await collectionRef.get()

            if (!doc.exists) {
                console.log('No such document!');
            } else {
                frReq.value = doc.data()
            }

            let thisFrReq = []
            thisFrReq = frReq.value.friendRequest
            let thisFrList = []
            thisFrList = frReq.value.friendList

            let newFrReq = thisFrReq.filter((lid) => {
                return lid === fromId
            })
            let newFrList = thisFrList.filter((lid) => {
                return lid === fromId
            })

            try {
                if (!newFrReq[0] && !newFrList[0]) {
                    thisFrReq.push(fromId)
                    const addInfo = {
                        friendRequest: thisFrReq
                    }
                    await projectFirestore.collection('profiles').doc(toId).update(addInfo);
                } else {
                    console.log('Can not be added, user already in request queue')
                }
                // console.log('Hey I am in Update')
            } catch (err) {
                console.log(err)
                error.value = 'Could not send the message'
            }
        }
        updateFriendReq()
    }

    return {
        error,
        addFriend
    }
}

export default friendRequest