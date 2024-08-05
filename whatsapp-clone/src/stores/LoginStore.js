import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import axios from 'axios';
import {v4 as uuid} from 'uuid'
import { db } from '@/firebase-init';
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';

export const useLoginStore = defineStore('login', () =>{
    
    let userObj = localStorage.getItem('user')
    let user = JSON.parse(userObj)
    // const sub = ref(user.sub || '')
    // const email = ref(user.email || '')
    // const picture = ref(user.picture || '')
    // const firstName = ref(user.firstName || '')
    // const lastName = ref(user.lastName || '')
    const sub = ref('');
    const email = ref('');
    const picture = ref('');
    const firstName = ref('');
    const lastName = ref('')
    const searchChat = ref('')
    const startChat = ref('')
    const usersArr = ref([])
    const userDataForChat = ref([])
    const currentChat = ref(null)
    const removeUsersFromFindList = ref([])
    const chats = ref([])

    async function getUserDetailsFromGoogle(payload){
        try{
            let res = await axios.post('http://localhost:4001/api/google-login',{
                token: payload.credential
            })
            sub.value = res.data.sub
            email.value = res.data.email
            picture.value = res.data.picture
            firstName.value = res.data.given_name
            lastName.value = res.data.family_name  
            console.log('hello part two');
            localStorage.setItem('user', JSON.stringify({
                sub: sub.value,
                email: email.value,
                picture: picture.value,
                firstName: firstName.value,
                lastName: lastName.value
            }))
            let userExists = await checkUserExists(res.data.sub)
            //console.log(userExists, 'userExits')
            if(!userExists){
                await saveUserDetails(res)
            } 
            console.log('hello form user');
            // sub.value = res.data.sub
            // email.value = res.data.email
            // picture.value = res.data.picture
            // firstName.value = res.data.given_name
            // lastName.value = res.data.family_name  
            // console.log('hello part two');
            // localStorage.setItem('user', JSON.stringify({
            //     sub: sub.value,
            //     email: email.value,
            //     picture: picture.value,
            //     firstName: firstName.value,
            //     lastName: lastName.value
            // }))
        }catch(err){
            console.log(err);
        }
    }

    async function checkUserExists(data){
        const docRef = doc(db,"users",data)
        const docSnaps = await getDoc(docRef)
        return docSnaps.exists()
    }

    async function saveUserDetails(res){
        try{
            await setDoc(doc(db, "users", res.data.sub), {
                sub: res.data.sub,
                email: res.data.email,
                picture: res.data.picture,
                firstName: res.data.given_name,
                lastName: res.data.family_name
            })
        }catch(err){
            console.log(err);
        }
    }
    function isLoggedIn(){
        const userString = localStorage.getItem('user')
        if(userString){
            const userData = JSON.parse(userString)
            sub.value = userData.sub;
            email.value = userData.email;
            return true
        }
        return false
    }
    async function sendData(payload){
        userDataForChat.value = []
        let findSub2 = chats.value.find((chat) =>  chat.user.sub === payload.sub2)
        if(findSub2){
            currentChat.value = findSub2.messages;
            userDataForChat.value.push(payload)
            await getChatById(payload.id)
        }else{
            currentChat.value = []
            userDataForChat.value.push(payload)
        }
    }
    
    async function getAllUsers(){
        try{
            console.log('log');
            
            const res = await getDocs(collection(db, "users"))
            let results = []
            res.docs.forEach(user => {
                results.push(user.data())
            });
            if(results.length){
             results.forEach(item => usersArr.value.push(item))
             
            }
        }catch(err){
            console.error(err);
        }
    }

    async function sendMessages(payload){
        try{
            if(payload.chatId){
                await updateDoc(doc(db,`chat/${payload.chatId}`),{
                    sub1HasViewed: false,
                    sub2HasViewed: false,
                    messages: arrayUnion({
                        sub: sub.value,
                        message: payload.message,
                        createdAt: Date.now()
                    })
                })
            }else{
                let id = uuid()
                await setDoc(doc(db,`chat/${id}`),{
                    sub1: sub.value,
                    sub2: payload.sub2,
                    sub1HasViewed: false,
                    sub2HasViewed: false,
                    messages:[{
                        sub: sub.value,
                        message: payload.message,
                        createdAt: Date.now()
                    }]
                })
                userDataForChat.value[0].id = id
            }
        }catch(err){
            console.log(err);
        }
    }

    async function getChatById(payload){
        onSnapshot(doc(db, "chat" , payload ) , (doc) => {
            let res = []
            res.push(doc.data())
            currentChat.value = res
        })
    }

    function getAllChatsByUser(){
        const q = query(collection(db, "chat"))
        onSnapshot(q, (querySnapShot) => {
            let chatArray = []
            querySnapShot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    sub1: doc.data().sub1,
                    sub2: doc.data().sub2,
                    sub1HasViewed: doc.data().sub1HasViewed,
                    sub2HasViewed: doc.data().sub2HasViewed,
                    messages: doc.data().messages,
                }
                if(doc.data().sub1 === sub.value){
                    chatArray.push(data)
                }
                if(doc.data().sub2 === sub.value){
                    chatArray.push(data)
                }

                removeUsersFromFindList.value = []
                chatArray.forEach( chat => {
                    if(sub.value === chat.sub1){
                        usersArr.value.forEach( user => {
                            // console.log(usersArr.value , 'user');
                            if(user.sub == chat.sub2){
                                chat.user = user
                                removeUsersFromFindList.value.push(user.sub)
                            }
                        })
                    }

                    if(sub.value === chat.sub2){
                        usersArr.value.forEach( user => {
                            if(user.sub == chat.sub1){
                                chat.user = user
                                removeUsersFromFindList.value.push(user.sub)
                            }
                        })
                    }
                })
                chats.value = []
                chatArray.forEach(chat => {
                    chats.value.push(chat)
                })
                
            })
        })
    }

    async function hasReadMsg(payload){
        await updateDoc(doc(db, `chat/${payload.id}`),{
            [payload.key1]: payload.key1,
            [payload.key2]: payload.key2,
        }, {merge: true})
    }

    function logOut(){
            localStorage.removeItem('user')
            sub.value = ''
            email.value = ''
            picture.value = ''
            firstName.value = ''
            lastName.value = ''
            //usersArr.value = []
    }

    const filterChats = computed(() =>{
        return chats.value.filter((chat) =>{
            let userView = chat.user.firstName.toLowerCase().includes(searchChat.value.toLowerCase())
            return userView
        })
    })

    const filterFriend = computed(() => {
        return usersArr.value.filter((user) =>{
            let userData = user.firstName.toLowerCase().includes(startChat.value.toLowerCase())
            return userData
        })
    })


    

    return {
        firstName,
        lastName,
        picture,
        email,
        sub,
        userDataForChat,
        usersArr,
        currentChat,
        removeUsersFromFindList,
        chats,
        searchChat,
        startChat,
        getUserDetailsFromGoogle,
        logOut,
        getAllUsers,
        isLoggedIn,
        sendMessages,
        sendData,
        getChatById,
        getAllChatsByUser,
        hasReadMsg,
        filterChats,
        filterFriend

    }

})