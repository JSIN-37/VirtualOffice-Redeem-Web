import axios from "axios";
import { delete_roles_url, get_roles_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getConfig, getTokenFromStorage } from "../../utility/functions";


//change the permissions array so that its {PermissionGroup :
export function parsePermissions(permissions){
    const x = permissions.map((p)=>{
        return Object.fromEntries(new Map([
            [p[0], p[1].value]
        ]))
    })
    return x
}

export async function getRoles(){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        return false
    }
    return new Promise(function (resolve,reject){
        axios.get(get_roles_url,config)
        .then((response)=>{
            if(response.status===200){
                resolve(response.data) 
            }else{
                reject(false)
            }
        })
        .catch((e)=>{
            console.log("error fetching roles.", e )
            reject(false)
        })
    })
}


//change url dependig on edit role or create role.
export async function saveRole(data, url, method,id){
    const config = getConfig(USER_STORAGE_KEY)
    if(!config){
        alert("not authenticated. Log out and log in again.")
        return
    }
    switch (method){
        case 'create':
            try{
                const res = await axios.post(url,data,config)
                if(res.status===200){
                    return true
                }else{
                    return false
                }
            }
            catch(e){
                console.log('error creating role.',e)
                return false
            }
        case 'edit':
            try{
                const res = await axios.put(`${url}/${id}`, data, config)
                if (res.status === 200){
                    return true
                }else{
                    return false
                }
            }
            catch(e){
                console.log('error updating -> ',e)
                return false
            }

        default:
            return false
    }
}





export function deleteRole(id){
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    if(token===''){
        console.log("token not there ")
        return
    }
    const config = {headers : {Authorization : `Bearer ${token}`}}
    return new Promise(function (resolve, reject){
        axios.delete(`${delete_roles_url}/${id}`, config)
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