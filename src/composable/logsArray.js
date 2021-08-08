import getUser from "@/composable/getUser";
import { ref } from "vue";
import { projectFirestore, timestamp } from '../firebase/config'
const { user } = getUser();

let logArray = []
let timeStamp = null;
let indx = 0;
const logsArray = async () => {
    try {
        const colRef = await projectFirestore.collection("profiles").doc(user.value.uid).get();
        if(colRef.exists) {
            logArray = colRef.data().logArray;
            indx = colRef.data().indexArray + 1;
        }
        timeStamp = timestamp();
        logArray.push(timeStamp);
        console.log(logArray);
        await projectFirestore.collection("profiles").doc(user.value.uid).update({
            logArray,
            indexArray: indx,
        })
        logArray = []
    } catch(error) {
        console.log(error)
    }
}

export { logsArray }