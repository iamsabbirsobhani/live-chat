import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'


const getProfile = (collection, id) => {
    const info = ref('')

    let collectionRef = projectFirestore.collection(collection).doc(id)

        collectionRef.onSnapshot((doc) => {
            // console.log('snapshot typing')
            // console.log("Current data: ", doc.data().isType);
            if (doc.data()) {
                info.value = { ...doc.data() }
            }
            else {
                info.value = null
            }
            // console.log(type.value)
        });

        // console.log(type.value.user)
    return {
        info,
    }
}
export default getProfile