import React, { useContext,useState } from 'react'
import axios from 'axios'
import { AppData } from '../../home/Home'
import { useHistory } from 'react-router'
import LoadingScreen from '../other/LoadingScreen'


export default function AdminPasswordChange({logo, orgDeet}) {

    const {token, BACKEND_URL, setSignedIn} = useContext(AppData)
    const history = useHistory()

    //inputs and 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    
    //use passwordMatch to display an error? otherwise can remove this.
    //const [passwordMatch, setMatch] = useState(undefined)


    const [loading, setLoading] = useState(false)

    function submit(){
        if(password !== password2){
            //setMatch(false)
            alert('passwords dont match bruh')
            return
        }

        setLoading(true)

        //post to server
        //first update details, then logo, then update password.
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const data = {adminEmail:email, adminPassword:password}

        //update org details
        axios.put(`${BACKEND_URL}/admin/organization-info`, orgDeet, config)
        .then((response)=>{
            console.log("details updates in server -> ", response)
            if(response.status === 200){
            }
            return axios.put(`${BACKEND_URL}/admin/organization-logo`, logo, config)
        })
        .then((response)=>{
            console.log("success updating logo. ", response)
            if(response.status===200){
            }
            return axios.put(`${BACKEND_URL}/admin/credentials`,data, config)
        })
        .then((response)=>{
            console.log("updated password. ",response)
            if(response.status===200){
                alert('password updated. please log in again.')
                setSignedIn(false) //replace with log in function?
                history.push('/')
            }
        })
        .catch((er)=>{
            console.log('error updating details. ',er)
        })
    }

    return (
        <>
        {!loading && (
            <div>
            <input type='email' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input type='password' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <input type='password' placeholder='confirm password' value={password2} onChange={(e)=>{setPassword2(e.target.value)}}></input>
            <button onClick={submit}>Submit</button>
        </div>
        )}

        {loading && <LoadingScreen />}
        </>
    )
}
