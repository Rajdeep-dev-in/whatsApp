<script setup>
    //import AccountGroupIcon from 'vue-material-design-icons/AccountGroupIcon.vue'
    import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
    import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
    import LogOutIcon from 'vue-material-design-icons/LogOut.vue'
    import PlusIcon from 'vue-material-design-icons/Plus.vue'
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
    import BaseInput from '../components/BaseInput/index.vue'
    import ChatsView from './ChatsView.vue'
    import MessageView from './MessageView.vue'
    import FriendsView from './FriendsView.vue'
    import {ref, onMounted, computed} from 'vue'
    import { usePageStore } from '@/stores/pageStore'
    import { useLoginStore } from '@/stores/LoginStore'
    import { useUserStore } from '@/stores/UsersStore'
    import {useRouter} from 'vue-router'

    const pageStore = usePageStore()
    const loginStore = useLoginStore()
    const userStore = useUserStore()
    const searchChat = ref("")
    const openMsg = ref(true)
    const mainSideBar = ref(false)
    const router = useRouter()
    onMounted(() => {
        try{
            loginStore.getAllUsers()
            loginStore.getAllChatsByUser()

        }catch(err){
            console.log(err);
        }
    })

    
    function searchFriend(){
        pageStore.SideBar = false
        pageStore.findFriends = true
    }

    function logout(){
        loginStore.logOut()
        router.push('/login')
    }

    // function findChat(){
    //     let word = searchChat.value
    //     console.log(word);
    //     console.log(loginStore.chats);

    // }
</script>
<template>
    <div class="w-full h-full flex justify-start items-center">
        <div v-if="pageStore.SideBar" id="sidebar" class="w-96 h-full border-r-2 border-gray-500 flex flex-col items-center">
            <div class=" w-full h-16 bg-gray-300 flex justify-center items-center p-2 gap-x-2">
                <div class="w-10 h-10 rounded-full">
                    <img :src="loginStore.picture"  class="rounded-full"/>
                </div>
                <div class="flex-1 h-full flex justify-end items-center gap-x-4">
                    <AccountGroupIcon class="cursor-pointer"/>
                    <PlusIcon class=" cursor-pointer" @click="searchFriend"/>
                    <!-- <DotsVerticalIcon class=" cursor-pointer"/> -->
                    <LogOutIcon class=" cursor-pointer" @click="logout" />
                </div>
            </div>
            <div class="p-2 w-full ">
                <div class="w-full h-10 bg-gray-300 px-2 py-2 flex justify-center items-center rounded-md">
                    <MagnifyIcon />
                    <BaseInput 
                        type="text"
                        autocomplete="off"
                        placeholder="Search" 
                        v-model="loginStore.searchChat" 
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
                        "
                    />
                </div>
            </div>
            <div class="my-4 w-full bg-gray-200 border"></div>
            <div class=" w-full p-2">
                <ChatsView />
            </div>

        </div>
        <div v-else class="w-96 h-full border-r-2 border-gray-500 flex flex-col items-center">
            <FriendsView />
        </div>
        <div id="chatSection" class="flex-1 h-full ">
            <div v-if="!loginStore.userDataForChat.length" class="w-full h-full flex  justify-center items-center bg-gray-300">

                <div class="w-[600px] flex flex-col justify-center items-center">
                    <img 
                        class="w-[300px] my-6"
                        src="https://static.whatsapp.net/rsrc.php/v3/yX/r/dJq9qKG5lDb.png"
                    />
                    <p class=" text-4xl text-gray-500 ">Download WhatsApp for Windows</p>
                    <p class="text-gray-500 py-2 my-2">Makes call, share your screen and get a faster experience when you download the window app</p>
                    <a href="#" class=" bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-xl my-3">
                        Get from Microsoft Store
                    </a>
                </div>
            </div>
            <div v-else>
                <MessageView />
            </div>
        </div>
    </div>
</template>