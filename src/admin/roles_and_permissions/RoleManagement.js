/*eslint-disable no-unused-vars*/

import React, { useState, useEffect } from 'react'
import { get_roles_url } from '../../app_data/admin_urls';
import { USER_STORAGE_KEY } from '../../app_data/constants';
import { getConfig} from '../../utility/functions';
import LoadingScreen from '../../utility/LoadingScreen'
import axios from 'axios';
import CreateRole from './CreateRole';

export default function RoleManagement() {
    //rendering components
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])
    const [inspect, setInspect] = useState(null)
    const [createRole, setCreateRole] = useState(false)

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
            <button onClick={()=>{setCreateRole(true)}}>Create new role</button>
            {roles.length>0 && roles.map((role)=>{
                return ( 
                <div key={role.id}> 
                  {`role id = ${role.id} role name= ${role.name} role desc= ${role.description}`}
                  <button onClick={()=>{setInspect(role)}}>inspect</button> 
                <br/><br/><br/>
                </div>)
            })}
            {inspect && <InspectRole permissions={inspect.permissions} name={inspect.name} id={inspect.id} open={setInspect}/>}
            {createRole && <CreateRole open={setCreateRole}/>}
        </>
    )
}



export const InspectRole = ({permissions, name, id, open}) =>{
  
  const [docPerms, setDocPerms] = useState(permissions.docs.allow.blank? permissions.docs : false)
  const [personalTaskPerms, setPersonalTaskPerms] = useState(permissions.tasks.allow? permissions.tasks.personal : false )
  const [ownDivTasks, setOwnDivTasks] = useState(permissions.tasks.allow ? permissions.tasks.ownDivision : false)
  const [allDivTasks, setAllDivTasks] = useState(permissions.tasks.allow ? permissions.tasks.allDivisions : false)
  const [teamPerms, setTeamPerms] = useState(permissions.teams)
  return(
    <>
      <p>{`Role Name : ${name}  Role ID : ${id}`}</p>
      {docPerms && <div>{`doc permissions : ${JSON.stringify(docPerms)}`}</div>}
      {personalTaskPerms && <div>{`personal task : ${JSON.stringify(personalTaskPerms)}`}</div>}
      {ownDivTasks && <div>{`own div : ${JSON.stringify(ownDivTasks)}`}</div>}
      {allDivTasks && <div>{`all div : ${JSON.stringify(allDivTasks)}`}</div>}
      {teamPerms && <div>{`teams : ${JSON.stringify(teamPerms)}`}</div>}
      <button onClick={()=>{open(false)}}>Close</button>
    </>
  )

}
