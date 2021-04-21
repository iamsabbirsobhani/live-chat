import {
    projectFirestore
} from '../firebase/config'


const deleteCollection = () => {

    const delChat = async () => {

        try {
            let ref = await projectFirestore.collection('messages').doc('chat').collection('chat')

            ref.onSnapshot(snapshot => {
                snapshot.docs.forEach(doc => {
                    ref.doc(doc.id).delete()
                        .catch(error => {
                            console.log(error)
                        })
                })
            })
        } catch (err) {
            console.log(err)
            error.value = 'Could not delete collection'
        }
    }
    return { delChat }
}

export default deleteCollection