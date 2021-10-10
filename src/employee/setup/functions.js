import axios from "axios";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { employee_change_password, employee_update_details, employee_update_profilepic } from "../../app_data/employee_urls";
import { getConfig } from "../../utility/functions";

export async function updateUserDetails(details){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise(function (resolve, reject){
        axios.put(employee_update_details, details, config)
        .then((res)=>{
            console.log("employee update details attempt resp ",res)
            if(res.status===200){
                resolve(true)
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log("error updating details, ",e)
            reject(false)
        })
    })
}

export async function updateProfilePic(pic){
    const config=getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise(function (resolve, reject){
        axios.put(employee_update_profilepic, pic, config)
        .then((res)=>{
            console.log("profile pic update attempt response ",res)
            if(res.status===200){
                resolve(true)
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log("error updatung profile pic ",e)
            reject(false)
        })
    })
}

export async function updatePassword(oldPassword, newPassword){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    const data={
        userOldPassword : oldPassword,
        userNewPassword : newPassword
    }
    return new Promise(function (resolve, reject){
        axios.put(employee_change_password, data, config)
        .then((res)=>{
            console.log('pass update res ',res)
            if(res.status===200){
                resolve(true)
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log("error updating password, ->",e)
            reject(false)
        })
    })
    
}