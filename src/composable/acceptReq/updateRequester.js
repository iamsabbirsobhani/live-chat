import {
    projectFirestore
} from '@/firebase/config.js'
import {
    ref
} from '@vue/reactivity';

const updateRequester = () => {

    const update = (id, requester) => {
        const error = ref(null)
        const collectionRefRequester = projectFirestore.collection('profiles').doc(requester)
        let thisReqFriendList = []

        const updateReq = async () => {
            const req = ref(null)


            const docRequester = await collectionRefRequester.get()

            if (!docRequester.exists) {
                console.log('No such document!');
            } else {
                req.value = docRequester.data()
            }

            // requester
            thisReqFriendList = req.value.friendList

            let newReqFriendList = thisReqFriendList.filter((lid) => {
                return lid === id
            })


            try {
                if (!newReqFriendList[0]) {

                    thisReqFriendList.push(id)

                    const doc = {
                        friendList: thisReqFriendList,
                    }

                    await projectFirestore.collection('profiles').doc(requester).update(doc);

                }

            } catch (err) {
                console.log(err)
                error.value = 'Could not send the message'
            }
            error.value = null
        }
        updateReq()
    }
    return {
        update,
    }
}

export default updateRequester