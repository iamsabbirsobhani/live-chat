import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'


const getComments = () => {
    const comments = ref('')
    // type.value = null
    let collectionRef = projectFirestore.collection('comments')
    .orderBy('createdAt', 'asc')

        collectionRef.onSnapshot((snap) => {
            let results = []
            console.log('snapshot')
            snap.docs.forEach(doc => {
                doc.data().createdAt && results.push({
                    ...doc.data(),
                    id: doc.id
                })
            })

            comments.value = results
            // console.log(comments.value)
        });
    return {
        comments,
    }
}
export default getComments