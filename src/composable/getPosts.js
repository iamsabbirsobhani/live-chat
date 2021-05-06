import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'


const getPosts = (collection, id) => {
    const status = ref('')
    const statusHome = ref('')

    // let collectionRef = projectFirestore.collection(collection).doc(id).collection('posts')
    let collectionRef = projectFirestore.collection(collection).orderBy('createdAt', 'desc')


            collectionRef.onSnapshot((snap) => {
                let results = []
                // console.log('snapshot')
                snap.docs.forEach(doc => {
                    doc.data().createdAt && results.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })

                const newUser = results.filter((user) => {
                    return user.userId == id
                })

                status.value = newUser

                statusHome.value = results

                // console.log(results)
                // console.log(statusHome.value)
            })

    return {
        status,
        statusHome
    }
}
export default getPosts