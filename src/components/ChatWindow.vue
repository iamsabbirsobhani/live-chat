<template>
  <div class="chat-window">
      <div v-if="error">{{ error }}</div>
      <div v-if="documents" class="messages">
          <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
              <span class="created-at">{{ doc.createdAt }} ago</span>
              <span class="name">{{ doc.name }}</span>
              <span class="message">{{ doc.message }}</span>
          </div>
      </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import getCollection from '../composable/getCollection'
export default {
    setup(){
        const { error, documents } = getCollection('messages')
        //When to use Computed Properties ?
        //Ans: Sometimes, When situation like this in here we are going to use Computed Property.
        //Computed properties allow us to define a property that is used the
        //same way as data , but can also have some custom logic that is cached
        // based on its dependencies. ... If we want to add a bit of
        //functionality each time something changes, or respond to a particular
        //change, we could watch a property and apply some logic.

        const formattedDocuments = computed(() =>{
            if(documents.value){
                return documents.value.map((doc)=>{
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    return { ...doc, createdAt: time}
                })
            }
        })

        return { error, documents, formattedDocuments }
    }
}
</script>

<style>
 .chat-window{
     background: #fafafa;
     padding: 30px 20px;
 }
 .single{
     margin: 18px 0;
 }
 .created-at{
     display: block;
     color: #999;
     font-size: 12px;
     margin-bottom: 4px;
 }
 .name{
     font-weight: bold;
     margin-right: 6px;
 }
 .message{
     max-height: 400px;
     overflow: auto;
 }
</style>