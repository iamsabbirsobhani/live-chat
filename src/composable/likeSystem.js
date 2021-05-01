import {
    projectFirestore
} from '@/firebase/config.js'
import {
    ref
} from '@vue/reactivity';

const likeSystem = () => {

    const likePost = (id, reacterId) => {
        const react = ref('')
        const error = ref(null)
        const collectionRef = projectFirestore.collection('posts').doc(id)

        collectionRef.onSnapshot((doc) => {
            if (doc.data()) {
                react.value = {
                    ...doc.data()
                }
            } else {
                react.value = null
            }

            let thisLike = react.value.like
            let thisDislike = react.value.dislike

            let thisLikeId = []
            thisLikeId = react.value.likeId
            let thisDislikeId = []
            thisDislikeId = react.value.dislikeId

            let newLikeID = thisLikeId.filter((lid) => {
                return lid === reacterId
            })
            let newDislikeID = thisDislikeId.filter((lid) => {
                return lid === reacterId
            })

            const updateReact = async () => {
                error.value = null
                try {
                     if (!newLikeID[0] && !newDislikeID[0]) {
                        thisLike += 1;
                        thisLikeId.push(reacterId)
                        const doc = {
                            like: thisLike,
                            likeId: thisLikeId
                        }
                        await projectFirestore.collection('posts').doc(id).update(doc);
                    } else if (newDislikeID[0] && thisDislike > 0) {
                        thisLike += 1;
                        thisDislike += -1;

                        thisLikeId.push(reacterId)

                        let index = thisDislikeId.indexOf(newDislikeID[0], 0)

                        thisDislikeId.splice(index, 1)

                        const docs = {
                            like: thisLike,
                            dislike: thisDislike,
                            likeId: thisLikeId,
                            dislikeId: thisDislikeId
                        }
                        await projectFirestore.collection('posts').doc(id).update(docs);
                    } else {
                        console.log('Already Liked 👍')
                    }
                } catch (err) {
                    console.log(err)
                    error.value = 'Could not send the message'
                }
            }
            updateReact()

        // return updateReact
        // console.log(react.value)
    });
    }
    return {
        likePost,
    }
}

export default likeSystem