import React, { useState, useEffect } from 'react'
import { get_roles_url } from '../../app_data/admin_urls';
import { USER_STORAGE_KEY } from '../../app_data/constants';
import { getConfig} from '../../utility/functions';
import LoadingScreen from '../../utility/LoadingScreen'
import axios from 'axios';

export default function RoleManagement() {

    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])

    useEffect(() => {
        setLoading(true)
        const config = getConfig(USER_STORAGE_KEY)
        if(!config){
            alert('authorization failed. Log out and log in again.')
            setLoading(false)
            return
        }
        axios
          .get(get_roles_url, config)
          .then((response) => {
            setRoles(response.data);
            console.log("got roles -> ",response.data)
            setLoading(false)
          })
          .catch((er) => {
            console.log("error fetching roles ", er);
            setLoading(false)
          });
        return () => {
          setRoles([]);
          setLoading(false)
        };
      }, []);
    



    if(loading){
        return ( <LoadingScreen message={'fetching roles'}/>)
    }
    return (
        <>
            <h1>Rolls</h1>
            {roles.length>0 && roles.map((role)=>{
                return ( <div> {`${JSON.stringify(role)}`} <br/><br/><br/></div>)
            })}
        </>
    )
}
