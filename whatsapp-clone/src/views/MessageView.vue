<script setup>

import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
import EmoticonExcitedOutlineIcon from 'vue-material-design-icons/EmoticonExcitedOutline.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import SendIcon from 'vue-material-design-icons/Send.vue'
import BaseInput from '../components/BaseInput/index.vue'
import { ref } from 'vue'
import { useLoginStore } from '@/stores/LoginStore'

const loginStore = useLoginStore()
const typedMsg = ref("")


async function sendMessage() {
    await loginStore.sendMessages({
        message: typedMsg.value,
        sub2: loginStore.userDataForChat[0].sub2,
        chatId: loginStore.userDataForChat[0].id
    })
    typedMsg.value = ""
}


</script>

<template>
    <div class="w-full h-screen flex flex-col justify-center items-center backcover">
        <div class="w-full h-16 bg-gray-300 flex justify-between items-center gap-x-4 p-2">
            <div class="w-10 h-10 rounded-full">
                <img :src="loginStore.userDataForChat[0].picture" class="w-full h-full rounded-full" />
            </div>
            <div class="flex justify-end items-center gap-x-4">
                <MagnifyIcon />
                <DotsVerticalIcon />
            </div>
        </div>
        <div class="flex-1 w-full px-10 py-3 ">
            <div v-for="msg in loginStore.currentChat?.[0]?.messages" :key="msg" class="flex flex-col gap-y-3">
                <div v-if="msg.sub !== loginStore.sub">
                    <div v class="w-52 my-1">
                        <div class=" text-sm">
                            <span class="bg-white text-black p-1">{{ msg.message }}</span>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class=" float-right w-52 my-1">
                        <div class=" text-sm">
                            <span class="p-1 bg-green-500 text-black">
                                {{msg.message}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full h-16 bg-gray-300 p-2 flex justify-center items-center gap-x-3">
            <div class="flex justify-center items-center gap-x-3">
                <EmoticonExcitedOutlineIcon />
                <PlusIcon />
            </div>
            <div class="flex-1 h-full px-2 py-1">
                <BaseInput v-model="typedMsg" placeholder="Type a message"
                    class="w-full py-2 px-3 outline-none apperance-none" />
            </div>
            <div class="">
                <button class="px-2 py-2 w-12 cursor-pointer" @click="sendMessage">
                    <SendIcon />
                </button>
            </div>
        </div>
    </div>
</template>
<style>
.backcover {
    background: url('/message-bg.png') no-repeat center;
    width: 100%;
    z-index: -1;
}
</style>