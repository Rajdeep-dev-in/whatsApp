import { defineStore } from "pinia";
import {ref} from 'vue'

export const usePageStore = defineStore('pages', () =>{
    const SideBar = ref(true)
    const findFriends = ref(false)

    return {
        SideBar,findFriends
    }
})