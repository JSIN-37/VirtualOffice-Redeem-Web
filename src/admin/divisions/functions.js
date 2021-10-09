import axios from "axios";
import { add_division_url, delete_division_url, edit_division_url, get_divisions_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getConfig, getTokenFromStorage } from "../../utility/functions";

export async function getDivisions(){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        alert('user token invalid. log in again.')
        return false
    }
    return new Promise(function (resolve, reject){
        axios.get(get_divisions_url, config)
        .then((response)=>{
            if(response.status===200){
                resolve(response.data)
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log('error fetching divisions', e)
            reject(false)
        })
    })
}


export function addDivision(data){
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    if(token===''){
        console.log("no token")
        return
    }
    const config = {headers : {Authorization : `Bearer ${token}`}}

    return new Promise(function (resolve, reject){
        axios.post(add_division_url, data, config)
        .then((response)=>{
            console.log("add division response -> ",response)
            if(response.status === 200){
                resolve(true)
            }
            else{
                alert('cannot delete cos theres employees ')
                resolve(false)
            }
        })
        .catch((er)=>{
            console.log('error adding division -> ',er)
            reject(false)
        })
    })
}


export function deleteDivision(id){
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    if(token===''){
        console.log("token not there ")
        return
    }
    const config = {headers : {Authorization : `Bearer ${token}`}}

    return new Promise(function (resolve, reject){
        axios.delete(`${delete_division_url}/${id}`, config)
        .then((response)=>{
            console.log('delete division res ',response)
            if(response.status === 200){
                resolve(true)
            }
            else{resolve(false)}
        })
        .catch((er)=>{
            console.log("error deleting div ",er)
            reject(false)
        })
    })

}

export function updateDivision(id, data){
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    if(token===''){
        console.log("token not there ")
        return
    }
    const config = {headers : {Authorization : `Bearer ${token}`}}

    return new Promise(function (resolve, reject){
        axios.put(`${edit_division_url}/${id}`,data, config)
        .then((response)=>{
            console.log("edit div response ",response)
            if(response.status === 200){
                resolve(true)
            }
        })
        .catch((er)=>{
            console.log("error updating division ",er)
            resolve(false)
        })
    })
}