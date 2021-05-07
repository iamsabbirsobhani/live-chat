import {
    ref
} from 'vue'
import {
    projectFirestore
} from '@/firebase/config'


const getTypeStatus = (id) => {
    const type = ref('')
    // type.value = null
    let collectionRef = projectFirestore.collection("profiles").doc(id)

        collectionRef.onSnapshot((doc) => {
            // console.log('snapshot typing')
            // console.log("Current data: ", doc.data().isType);
            if (doc.data().isType || doc.data().user) {
                type.value = { ...doc.data(), id: doc.id }
            }
            else {
                type.value = null
            }
            // console.log(type.value)
        });

        // console.log(type.value.user)
    return {
        type,
    }
}
export default getTypeStatus