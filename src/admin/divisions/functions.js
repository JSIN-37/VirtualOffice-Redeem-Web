import axios from "axios";
import { add_division_url } from "../../app_data/admin_urls";
import { USER_STORAGE_KEY } from "../../app_data/constants";
import { getTokenFromStorage } from "../../utility/functions";

export function addDivision(data){
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    if(token===''){
        console.log("no token")
        return
    }
    const config = {headers : {Authorization : `Bearer ${token}`}}
    console.log("func config = ",config)
    console.log("func url - ",add_division_url)
    console.log("func data -> ",data)
    return new Promise(function (resolve, reject){
        axios.post(add_division_url, data, config)
        .then((response)=>{
            console.log("add division response -> ",response)
            if(response.status === 200){
                resolve(true)
            }
        })
        .catch((er)=>{
            console.log('error adding division -> ',er)
            reject(false)
        })
    })
}