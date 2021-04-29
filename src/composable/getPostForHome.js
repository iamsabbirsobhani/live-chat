import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'


const getPosts = (collection, id) => {
    const status = ref('')

    let collectionRef = projectFirestore.collection(collection).orderBy('createdAt', 'desc')


            collectionRef.onSnapshot((snap) => {
                let results = []
                console.log('snapshot')
                snap.docs.forEach(doc => {
                    doc.data().createdAt && results.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })

                status.value = results
                console.log(results)
            })

    return {
        status,
    }
}
export default getPosts