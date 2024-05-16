<script setup>
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import BaseInput from '../components/BaseInput/index.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import { ref, computed } from 'vue'
import { usePageStore } from '@/stores/pageStore'
import { useUserStore } from '@/stores/UsersStore'
import { useLoginStore } from '@/stores/LoginStore'

const users = ref([])
const pageStore = usePageStore()
const userStore = useUserStore()
const loginStore = useLoginStore()


function closeView() {
    pageStore.findFriends = false
    pageStore.SideBar = true
}


const hideMe = (user)=> {
    if(user.sub == loginStore.sub){
        return false
    }
    return true
}
const createNewChat = async (payload)=> {
    
    // console.log(data);
    // console.log(data.sub);
    //console.log(loginStore.userDataForChat.value.length);
    let data;
    // console.log(payload, "clicked");
    // console.log(loginStore.chats , 'checkchats');
    let findUserSub2 = loginStore.chats.find((chat) =>  chat.user.sub === payload.sub)
    if(findUserSub2){
        data = {
        id: findUserSub2.id,
        sub1: loginStore.sub,
        sub2: payload.sub,
        firstName: payload.firstName,
        picture: payload.picture
    }
    }else{
        data = {
        id: '',
        sub1: loginStore.sub,
        sub2: payload.sub,
        firstName: payload.firstName,
        picture: payload.picture
    }

        
    }
    // loginStore.userDataForChat.value = []
    // loginStore.userDataForChat.value.push(data);
    // console.log(loginStore.userDataForChat.value.length);
    loginStore.sendData(data)
    // console.log("success")
}

const userComputed = computed(() => {
    loginStore?.usersArr?.value?.forEach(user => {
        users.value.push(user)
    });
    console.log(loginStore.removeUsersFromFindList)
    loginStore.removeUsersFromFindList.value.forEach((removeUser) =>{
        let findIndex = users.value.findIndex((user) => user.sub === removeUser)
        users.value.splice(findIndex, 1)
    })
    return users.value
})

</script>
<template>
    <div class="w-full h-full">
        <div class="w-full h-24 bg-green-700 text-white font-bold flex justify-start items-center gap-x-5 px-2">
            <ArrowLeft class=" cursor-pointer" @click="closeView" />
            <p class=" text-xl">New Chats</p>
        </div>
        <div class="p-2 w-full ">
            <div class="w-full h-10 bg-gray-300 px-2 py-2 flex justify-center items-center rounded-md">
                <MagnifyIcon />
                <BaseInput type="text" autocomplete="off" placeholder="Search name or number" v-model="loginStore.startChat"
                    class="
                        ml-5
                        apperance-none
                        w-full
                        bg-gray-300
                        py-1.5
                        px-2.5
                        text-gray-700
                        leading-tight
                        focus:outline-none 
                        focus:shadow-outline
                        " />
            </div>
        </div>
        <div class="my-4 w-full bg-gray-200 border"></div>
        <!-- {{ userStore.usersArr }} -->
        <div class="flex flex-col justify-center items-center  px-2">
            
            <template v-for="user in loginStore.filterFriend" :key="user">
                <div v-if="hideMe(user)" @click="createNewChat(user)" class="flex justify-center items-center my-2 gap-x-4 cursor-pointer">
                    <div class="w-12 h-12 rounded-full bg-gray-300">
                        <img :src="user.picture" class=" rounded-full w-full h-full" />
                    </div>
                    <div class="flex-1 ">
                        <div class="flex justify-start items-center">
                            <div>
                                <p class="text-black font-bold text-lg">{{ user.firstName }} {{ user.lastName }}</p>
                                <p>{{ user.email }}</p>
                            </div>
                        </div>
                        <div class="flex justify-start items-center gap-x-2">
                            <p>Hey there! I am using WhatsApp </p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
