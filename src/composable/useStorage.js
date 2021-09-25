import { ref } from "@vue/reactivity";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);
  const progress = ref(null);

  const uploadImage = async (file) => {
    function supportedFormat() {
      return file.name.match(/mp4|mkv|MP4|MKV|AVI|avi|3gp/) ? true : false;
    }

    if (supportedFormat()) {
      filePath.value = `videos/${user.value.displayName} ${user.value.uid}/${file.name}`;
      // console.log("format supported")
    } else {
      // console.log("format unsupported");
      filePath.value = `images/${user.value.displayName} ${user.value.uid}/${file.name}`;
    }
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = storageRef.put(file);

      res.on(
        "state_changed",
        (snapshot) => {
          progress.value = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          //   console.log("Upload is " + progress.value + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          res.snapshot.ref.getDownloadURL().then((downloadURL) => {
            url.value = downloadURL;
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };
  return { url, filePath, error, uploadImage, progress };
};

export default useStorage;
