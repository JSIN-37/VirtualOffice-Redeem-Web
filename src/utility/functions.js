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


// export async function checkToken(storage_key, url){
//     const token = getTokenFromStorage(storage_key)
//     if(token === ''){
//         return false
//     }else{
//         const config = {headers : {Authorization : `Bearer ${token}`}}
//         return new Promise(function (resolve, reject){
//             axios.get(url, config)
//             .then((response)=>{
//                 if(response.status === 200){
//                     resolve(true)
//                 }
//             })
//             .catch((er)=>{
//                 console.log('error checking validity of token',er)
//                 reject(false)
//             })
//         })
//     }
// }


export function isAuthenticated(url, storage_key){
    const token = getTokenFromStorage(storage_key)
    if(token===''){
        return false
    }else{
       return axios.get(url, {headers: {Authorization : `Bearer ${token}`}})
    }

} 


export function logOut(storage_key,destinationURL, urlSetFunction){
    localStorage.removeItem(storage_key)
    urlSetFunction(destinationURL)
}
