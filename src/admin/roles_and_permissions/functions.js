import axios from "axios";
import { delete_roles_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getTokenFromStorage } from "../../utility/functions";

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