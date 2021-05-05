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
            console.log(thisReqFriendList)

            let newReqFriendList = thisReqFriendList.filter((lid) => {
                return lid === id
            })


            try {
                if (!newReqFriendList[0]) {

                    thisReqFriendList.push(id)

                    console.log("1st",thisReqFriendList)
                    console.log("requester",requester)

                    const doc = {
                        friendList: thisReqFriendList,
                    }

                    console.log("2nt",thisReqFriendList)



                    await projectFirestore.collection('profiles').doc(requester).update(doc);
                    console.log("after await",thisReqFriendList)


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