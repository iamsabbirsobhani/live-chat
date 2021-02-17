import {
    ref
} from 'vue'
import {
    projectFirestore
} from '../firebase/config'


const update = (obj) => {
    projectFirestore.collection("messages").doc('typing').update(obj);
}

const docUpdate = () => {
    return { update }
}

export default docUpdate
