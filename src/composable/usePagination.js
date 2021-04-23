import { ref } from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const usePagination = () => {
    const firstThree = ref(null)

    const paginator = async () => {
        const first = projectFirestore.collection('test-messages').doc('chat').collection('chat').orderBy('name')

        const firstThreeRaw = await first.limit(3).get()

        firstThree.value = firstThreeRaw


        first.onSnapshot((snap) => {
            let results = []
            console.log('snapshot')
            snap.docs.forEach(doc => {
                console.log(doc.data(), doc.id)
                doc.data().createdAt && results.push({
                    ...doc.data(),
                    id: doc.id
                })
        })
    })
        // const snapshot = await first.get()

        // const last = snapShot.docs[snapshot.docs.length - 1];

        // const next = projectFirestore.collection('test-messages').doc('chat').collection('chat').orderBy('createdAt').startAfter(last.data()).limit(3);

        console.log(firstThree.value)

    }

    return {
        paginator,
        firstThree
    }
}

export default usePagination