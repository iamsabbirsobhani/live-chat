import {
    projectFirestore
} from '@/firebase/config.js'
import {
    ref
} from '@vue/reactivity';

const dislikeSystem = () => {

    const dislikePost = (id, reacterId) => {
        const error = ref(null)
        const collectionRef = projectFirestore.collection('posts').doc(id)

        const updateReact = async () => {

            const react = ref(null)

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
                if (!newDislikeID[0] && !newLikeID[0]) {
                    thisDislike += 1;
                    thisDislikeId.push(reacterId)
                    const doc = {
                        dislike: thisDislike,
                        dislikeId: thisDislikeId
                    }
                    await projectFirestore.collection('posts').doc(id).update(doc);
                } else if (newLikeID[0] && thisLike > 0) {
                    thisDislike += 1;
                    thisLike += -1;

                    thisDislikeId.push(reacterId)

                    let index = thisLikeId.indexOf(newLikeID[0], 0)

                    thisLikeId.splice(index, 1)

                    const docs = {
                        like: thisLike,
                        dislike: thisDislike,
                        likeId: thisLikeId,
                        dislikeId: thisDislikeId
                    }
                    await projectFirestore.collection('posts').doc(id).update(docs);
                } else {

                    if ( thisDislike  > 0) {
                        thisDislike += -1;

                        const index = thisDislikeId.indexOf(newDislikeID[0], 0)

                        thisDislikeId.splice(index, 1)

                        const doc = {
                            dislike: thisDislike,
                            dislikeId: thisDislikeId
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
        dislikePost
    }
}

export default dislikeSystem