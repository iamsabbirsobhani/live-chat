import getUser from "@/composable/getUser";
import { ref } from "vue";
import { projectFirestore } from '../firebase/config'
const { user } = getUser();
let visitedData = ref(null)
let newVisitedData = ref(null)
const profileVisitedBy = async () => {
    try{
        const userData = await projectFirestore
        .collection("profiles")
        .doc(user.value.uid)
        .get();
      if (userData.exists) {
         visitedData.value = userData.data().profileVisitedBy;
      }
      console.log(visitedData.value);
      newVisitedData = visitedData.value
      console.log("sdf");
      visitedData.value.forEach((element) => {
        if(element.id === user.value.uid) {
            element.times = element.times + 1;
        } else {
            element.id = user.value.uid;
            element.name = user.value.displayName;
            element.times += 1;
        }
    });

    console.log(returnTarget);
    } catch(error) {
        console.log(error);
    }
}

export { profileVisitedBy }