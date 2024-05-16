import { defineStore } from "pinia";
import { db } from '@/firebase-init';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {

})