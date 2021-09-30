import axios from "axios";
import { get_users_url } from "../../app_data/admin_urls";
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
        console.log('get users response ',response)
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
        console.log('result from querying DB', res)
    }
    catch{
        console.log('error fetching user')
    }
}