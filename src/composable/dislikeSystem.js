

// ⚠
// imperfect code or logic or not working specifically on firebase,
// its need to be deeply recheked before implement for production.

import {
    projectFirestore
} from '@/firebase/config.js'
import {
    ref
} from '@vue/reactivity';

const dislikeSystem = () => {

    const react = ref(null)

    const dislikePost = (id, reacterId) => {
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
                     if ( !newDislikeID[0]  && !newLikeID[0] ) {
                        thisDislike += 1;
                        thisDislikeId.push(reacterId)
                        const doc = {
                            like: thisDislike,
                            likeId: thisDislikeId
                        }
                        await projectFirestore.collection('posts').doc(id).update(doc);
                    }
                    else if (newLikeID[0] && thisLike > 0) {
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
                    }
                    else {
                        console.log('Already Disiked 👎')
                    }
                } catch (err) {
                    console.log(err)
                    error.value = 'Could not send the message'
                }
            }
                updateReact()
        });
    }
    return {
        dislikePost
    }
}

export default dislikeSystem