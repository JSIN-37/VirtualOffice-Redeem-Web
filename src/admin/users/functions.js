import axios from "axios";
import { create_user_url, get_users_url, update_user_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getConfig, getTokenFromStorage } from "../../utility/functions";

export function getUsers(){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise( function (resolve, reject){
        axios.get(get_users_url, config)
        .then((response)=>{
        if(response.status===200){
            resolve(response.data)
        }
        })
        .catch((er)=>{
            console.log('error fetching users ',er)
            reject(false)
        })
    })
}


export async function searchUser(searchParams){
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    const config = {
        params : searchParams, 
        headers : { Authorization : `Bearer ${token}`}
    }
    try{
        const res = await axios.get(get_users_url, config)
        return(res)
    }
    catch{
        console.log('error fetching user')
    }
}

export async function createEmployee(data){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        alert('Token invalid.')
        return false
    }
    return new Promise(function(resolve,reject){
        axios.post(create_user_url, data, config)
        .then((response)=>{
            console.log("create user response ->",response)
            if(response.status===200){
                resolve(true)
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log('error creating user -> ',e)
            return false
        })
    })

}


export function updateEmployee(employee, id){
    console.log("to send -> ", employee)
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise(function (resolve, reject){
        axios.put(`${update_user_url}/${id}`, employee, config)
        .then((response)=>{
            if(response.status===200){
                console.log(response)
                resolve(true)
                return
            }else{
                reject(false)
                return
            }
        })
        .catch((e)=>{
            console.log('error updating user.')
            reject(false)
            return
        })
    })
}