import { projectAuth } from "../firebase/config";
import { projectFirebase } from "../firebase/config";
import { ref } from 'vue'

const errorUpdateName = ref(null);
const errorUpdatePass = ref(null);

const updateUserName = async (name) => {
  errorUpdateName.value = null;
  try {
    await projectAuth.currentUser.updateProfile({
      displayName: name,
    });
    const profileRef = projectFirebase
      .collection("profiles")
      .doc(projectAuth.currentUser.uid);

    await profileRef.update({
      userName: name,
    });
    errorUpdateName.value = null;
  } catch (err) {
    errorUpdateName.value = err.message;
  }
};

const updateUserPass = async (newPassword) => {
  errorUpdatePass.value = null;
  try {
      await projectAuth.currentUser.updatePassword(newPassword);
      errorUpdatePass.value = null;
    const profileRef = projectFirebase
      .collection("profiles")
      .doc(projectAuth.currentUser.uid);

    await profileRef.update({
      userPass: newPassword,
    });
    errorUpdatePass.value = null;
  } catch (err) {
    errorUpdatePass.value = err.message;
  }
};

export { updateUserName, updateUserPass, errorUpdateName, errorUpdatePass };
