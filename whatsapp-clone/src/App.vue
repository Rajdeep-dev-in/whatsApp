<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useLoginStore } from './stores/LoginStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const loginStore = useLoginStore()
const router = useRouter()

onMounted(() => {
  !loginStore.isLoggedIn() ? router.push('/login') : router.push('/')
})
</script>

<template>
  <div class=" w-screen h-screen">
    <RouterView />
  </div>
</template>

