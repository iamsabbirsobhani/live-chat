import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'


const getTypeStatus = () => {
    const type = ref(null)
    type.value = null
projectFirestore.collection("messages").doc("typing")
        .onSnapshot((doc) => {
        console.log('snapshot typing')
            // console.log("Current data: ", doc.data().isType);
            if (doc.data().isType) {
                type.value = {
                    ...doc.data()
                }
            } else {
                type.value = null
            }
        });
    return {
        type
    }

}
export default getTypeStatus