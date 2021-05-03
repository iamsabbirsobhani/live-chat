import {
    projectFirestore
} from "@/firebase/config.js"


const commentDelete = () => {
    const commentDel = async (id) => {

        try {

            const res = await projectFirestore.collection('comments').doc(id).delete();

        } catch (err) {
            console.log(err.message)
        }
    }
    return { commentDel }
}

export default commentDelete