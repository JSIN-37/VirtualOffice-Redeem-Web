import axios from "axios"

export function getUserFromStorage(storage_key){
    const userData = localStorage.getItem(storage_key)
    if(userData!==null){
        return JSON.parse(userData)
    }else{
        return {}
    }
}

export function removeUserFromStorage(storage_key){
    localStorage.removeItem(storage_key)
}

export function getTokenFromStorage(storage_key){
    const user = getUserFromStorage(storage_key)
    if(user.token){
        return user.token
    }else{
        return ''
    }
}

export function setUserToStorage(storage_key, token){
    localStorage.setItem(storage_key, JSON.stringify(token))
}


export function isAuthenticated(url,storage_key){
    const config = getConfig(storage_key)
    if(!config){
        return false
    }else{
       return new Promise(function (resolve, reject){
           axios.get(url, config)
           .then((res)=>{
               if(res.status===200){
                   resolve(true)
               }else{
                   resolve(false)
               }
           })
           .catch((er)=>{
               console.log("axios error - isAuthenticated",er)
               reject(false)
           })
       })
    }

} 


export function logOut(storage_key,destinationURL, urlSetFunction){
    localStorage.removeItem(storage_key)
    urlSetFunction(destinationURL)
}


export function getConfig(storage_key){
    const token = getTokenFromStorage(storage_key)
    if(token===''){
        return false
    }
    const config = {headers : { Authorization : `Bearer ${token}`}}
    return config
}
