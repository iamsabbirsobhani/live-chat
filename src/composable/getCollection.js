import {
    ref,
    watchEffect
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'

const getCollection = (collection) => {
    const documents = ref(null)
    const esourceList = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection).doc('chat').collection('chat')
        .orderBy('createdAt', 'desc').limit(20)
    // we can only add "custom id" documents under a "collection"
    // we can not add "custom id" documents inside a "document"
    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        // console.log('snapshot')
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({
                ...doc.data(),
                id: doc.id
            })
        })


        // experimental code

        const nextCollection = async () => {
            var res = []
            var newres = []
            const snapshot = await collectionRef.get()

            let last = snapshot.docs[snapshot.docs.length - 1]

            // next.onSnapshot((snap) => {
            //     let res = []

            //     snap.docs.forEach(doc => {
            //         doc.data().createdAt && res.push({
            //             ...doc.data(),
            //             id: doc.id
            //         })
            //     })
            // })

            const next = projectFirestore
                .collection('users').doc('chat').collection('chat')
                .orderBy('createdAt', 'desc')
                .startAfter(last.data().createdAt)
                .limit(5);

                next.onSnapshot((snap) => {

                    snap.docs.forEach(doc => {
                        doc.data().createdAt && res.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })


                    res.reverse()

                    newres = res.concat(res, results)

                    console.log('last', newres)
                    documents.value = newres

                })

            }
        // nextCollection()
        // nextCollection()

        // end of  experimental code


        results.reverse()

        documents.value = results


        error.value = null
        // console.log(documents.value[1].imgUrl)


        // element-plus Image Preview

        const sourceList = results.filter((img) => {
            return img.imgUrl;
        });
        const newSourceList = sourceList.map((img) => {
            return img.imgUrl;
        });
        esourceList.value = newSourceList
        //    console.log(sourceList);
        //    console.log(newSourceList);
        //    console.log(esourceList);
        // for previewing full screen image element-plus needs "previewSrcList" array
        // with all the image urls. Thats why I need to go with this code block process. Joy JavaScript

        // end of element-plus Image Preview


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
        esourceList
    }
}

export default getCollection