import {
    projectFirestore
} from '@/firebase/config.js'
import {
    ref
} from '@vue/reactivity';

const likeSystem = () => {

    const likePost = (id, reacterId) => {
        const error = ref(null)
        const collectionRef = projectFirestore.collection('posts').doc(id)

        const updateReact = async () => {
            const react = ref('')

            const doc = await collectionRef.get()

            if (!doc.exists) {
                console.log('No such document!');
            } else {
                react.value = doc.data()
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

                    if (thisLike > 0) {

                        thisLike += -1;

                        let index = thisLikeId.indexOf(newLikeID[0], 0)

                        thisLikeId.splice(index, 1)
                        const doc = {
                            like: thisLike,
                            likeId: thisLikeId
                        }

                        await projectFirestore.collection('posts').doc(id).update(doc);
                    }
                }
            } catch (err) {

                console.log(err)
                error.value = 'Could not send the message'
            }
        }
        updateReact()
    }
    return {
        likePost,
    }
}

export default likeSystem