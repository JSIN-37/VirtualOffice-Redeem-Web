import axios from "axios";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { employee_update_details, employee_update_profilepic } from "../../app_data/employee_urls";
import { getConfig } from "../../utility/functions";

export async function updateProfileInfo(data){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise(function (resolve, reject){
        axios.put(employee_update_details, data, config)
        .then((res)=>{
            if(res.status===200){
                resolve(true)
            }
            else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log("error updating user info",e)
            reject(false)
        })
    })
}

export async function updateProfilePicture(image){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise(function (resolve, reject){
        axios.put(employee_update_profilepic, image, config)
        .then((res)=>{
            if(res.status===200){
                resolve(true)
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log("error updating picture",e)
            reject(false)
        })
    })
}
