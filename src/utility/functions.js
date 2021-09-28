import axios from "axios"

export function getUserFromStorage(storage_key){
    const userData = localStorage.getItem(storage_key)
    if(userData!==null){
        return JSON.parse(userData)
    }else{
        return {}
    }
}

export function checkSignedIn(storage_key){
    const user = getUserFromStorage(storage_key)
    if(user.token){
        //check if token is valid and return true.
        return true
    }else{
        return false
    }
}

export function getTokenFromStorage(storage_key){
    const user = getUserFromStorage(storage_key)

    if(user.token){
        return user.token
    }else{
        return ''
    }
}


export function signIn(username, password, url){
    axios.post(url)
    .then((res)=>{
        //if response succesfull, create a user object.
    })
}