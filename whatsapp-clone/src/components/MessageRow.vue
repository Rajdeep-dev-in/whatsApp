<template>  
<div class="flex justify-center items-center gap-x-4 cursor-pointer">
    
    <div class="w-12 h-12 rounded-full">
        <img :src="chat.user.picture"  class="rounded-full"/>
    </div>
    <div class="flex-1 ">
        <div class="flex justify-between items-center">
            <div>
                <p class="text-black font-bold text-lg">{{ chat.user.firstName }}</p>
            </div>
            <div>
                <p class=" text-sm">{{ lastMsgDate(chat) }}</p>
            </div>
        </div>
        <div v-if="lastId == loginStore.sub">
            <div class="flex justify-start items-center gap-x-2">  
                <CheckAllIcon :fillColor="tickColor(chat)" />
                <p>{{lastChatMsg(chat)}}</p>
            </div>
        </div>
        <div v-else>
            <div class="flex justify-start items-center gap-x-2">  
                <p>{{lastChatMsg(chat)}}</p>
            </div>
        </div>
    </div>
</div>


</template>
<script setup>
    import moment from 'moment';
    import { onMounted, ref } from 'vue';
    import CheckAllIcon from 'vue-material-design-icons/CheckAll.vue'
    import { useLoginStore } from '@/stores/LoginStore';

    const loginStore = useLoginStore()

    const props = defineProps({
        chat:{
            type: Object
        }
    })

    let lastId = ref()

    onMounted(() =>{
        console.log(props.chat);
        console.log(props.chat.messages);
        props.chat.messages.forEach(chat => {
            lastId.value = chat.sub
        });
        console.log(lastId.value);
        
        
        
        
        
    })
    function lastChatMsg(data){
        return data.messages[data.messages.length - 1].message.substring(0,20)
    }
    function lastMsgDate(data){
        if(data.messages.length){
            return moment(data.messages[data.messages.length - 1].createdAt).format('MMM D YY | HH:MM A')
        }
    }

    function tickColor(data){
        let color = ''
        if(data.sub1 === loginStore.sub){
            if(data.sub1HasViewed){
                color = '#7DF9F8'
            }else{
                color = '#B5B5B5'
            }
        }
        if(data.sub2 === loginStore.sub){
            if(data.sub2HasViewed){
                color = '#7DF9F8'
            }else{
                color = '#B5B5B5'
            }
        }
        return color
    }
</script>