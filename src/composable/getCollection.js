import {
    ref,
    watchEffect
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection).doc('chat').collection('chat')
        .orderBy('createdAt')
    // we can only add "custom id" documents under a "collection"
    // we can not add "custom id" documents inside a "document"
    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        console.log('snapshot')
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({
                ...doc.data(),
                id: doc.id
            })
        })
        documents.value = results
        error.value = null
        // console.log(documents.value.name)

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
        documents,
    }
}

export default getCollection