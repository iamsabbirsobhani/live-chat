import {
    projectFirestore
} from "@/firebase/config.js"


const delPost = () => {
    const docDel = async (id) => {

        try {

            const res = await projectFirestore.collection('posts').doc(id).delete();

        } catch (err) {
            console.log(err.message)
        }
    }
    return { docDel }
}

export default delPost