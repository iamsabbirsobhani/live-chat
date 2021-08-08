import getUser from "@/composable/getUser";
import { ref } from "vue";
import { projectFirestore, timestamp } from '../firebase/config'
const { user } = getUser();

let results = ref(null)
let timeStamp = null;
let indx;
const logs = async () => {
    try {
        const colRef = await projectFirestore.collection("profiles").doc(user.value.uid).get();
        if(colRef.exists) {
            results = colRef.data().logs;
            indx = colRef.data().index + 1;
        }
        timeStamp = timestamp();
        results[indx] = timestamp();
        console.log(results);
        await projectFirestore.collection("profiles").doc(user.value.uid).update({
            logs: results,
            index: indx,
        })
        results = []
    } catch(error) {
        console.log(error)
    }
}

export { logs }