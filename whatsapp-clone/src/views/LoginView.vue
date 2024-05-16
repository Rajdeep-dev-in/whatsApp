<script setup>
import { GoogleLogin } from 'vue3-google-login';
import { useLoginStore } from '@/stores/LoginStore';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore()
const router = useRouter()


const callback = async (data) => {
    await loginStore.getUserDetailsFromGoogle(data)
    if(loginStore.isLoggedIn()){
        router.push('/')
    }
}

</script>
<template>
    <div class="w-screen h-screen flex flex-col justify-center items-center">
        <div class="w-full h-52 bg-green-600 ">
            <div class="flex justify-center items-center gap-x-5 my-10">
            <div class=" w-32 ">
                <img class="w-full" src="/whatsapp-logo.png" />
            </div>
            <div>
                <h2 class="text-2xl text-white font-bold">WhatsApp Web</h2>
            </div>
        </div>
        </div>
        <div class="flex-1 w-full bg-gray-800 flex justify-center items-center">
            <div class=" bg-white text-black z-10 px-3 py-3 w-80">
                <div class="w-full flex justify-center items-center mb-3">
                    <h2 class="text-2xl font-bold">WhatsApp Clone</h2>
                </div>
                <div class="w-full flex justify-center bg-black p-3 rounded-md">
                    <GoogleLogin :callback="callback" />
                </div>
            </div>
        </div>
        
    </div>
</template>