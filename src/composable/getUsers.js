import {
    ref,
    watchEffect
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'
import { projectAuth } from '../firebase/config'


const getUsers = () => {
    const user = ref(projectAuth.currentUser)
    const documents = ref(null)
    const error = ref(null)

    // console.log(user.value.uid)

    let collectionRef = projectFirestore.collection('profiles')
    // we can only add "custom id" documents under a "collection"
    // we can not add "custom id" documents inside a "document"
    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        console.log('snapshot')
        snap.docs.forEach(doc => {
            results.push({
                ...doc.data(),
                id: doc.id
            })
        })

        documents.value = results

        // console.log(documents.value)
        error.value = null

    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = "Could not fetch data"
    })
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })
    return {
        error,
        documents
    }
}

export default getUsers