<template>
    <div class="w-full ">
        <div v-for="chat in loginStore.filterChats" :key="chat">
            <div @click="openChat(chat)">
                <MessageRow :chat="chat"/>
            </div>
        </div>
    </div>

</template>
<script setup>
import MessageRow from '@/components/MessageRow.vue';
import { useLoginStore } from '@/stores/LoginStore';
import { onMounted } from 'vue';

const loginStore = useLoginStore()

onMounted(async () =>{
    if(loginStore.userDataForChat.value?.length){
        let id = loginStore.userDataForChat.value[0].id
        await loginStore.getChatById(id)
    }
})

async function openChat(chat){
    let data = {
        id: chat.id ,
        sub1: chat.sub1,
        sub2: chat.sub2,
        firstName: chat.user.firstName,
        picture: chat.user.picture
    }
    loginStore.sendData(data)
    try{
        await loginStore.getChatById(chat.id)
        let obj = {
            id: chat.id,
            key1: "sub1HasViewed", val1: false,
            key2: "sub2HasViewed", val2: false 
        }
        if(chat.sub1 === loginStore.sub){
            data.val1 = true
            data.val2 = true
        }
        else if(chat.sub2 === loginStore.sub){
            data.val1 = true
            data.val2 = true
        }
        let lastMsg = chat.messages.length - 1
        if(chat.messages[lastMsg].sub !== loginStore.sub){
            await loginStore.hasReadMsg(obj)
        }
        

    }catch(err){
        console.log(err);
    }
}
</script>