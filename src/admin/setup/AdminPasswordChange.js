import React, { useContext,useEffect,useState } from 'react'
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

    //set to true when server has responded with successfull update.
    const [detailsUpdated, setDetailsUpdated] = useState(false)
    const [logoUpdated, setLogoUpdated] = useState(false)

    //render loading screen if this is true, while waiting for server response.
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(detailsUpdated && logoUpdated){
            updatePassword(logoUpdated, detailsUpdated)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[detailsUpdated, logoUpdated])

    function submit(){
        if(password !== password2){
            //setMatch(false)
            alert('passwords dont match bruh')
            return
        }

        //post to server
        //first update details, then update password.
        const config = { headers: { Authorization: `Bearer ${token}` } }

        //update org details
        axios.put(`${BACKEND_URL}/admin/organization-info`, orgDeet, config)
        .then((response)=>{
            console.log("details updates in server -> ", response)
            if(response.status === 200){
                setDetailsUpdated(true)
                updatePassword(logoUpdated, detailsUpdated)
            }
        })
        .catch((er)=>{
            console.log('error updating details. ',er)
        })

        
        //update logo
        axios.put(`${BACKEND_URL}/admin/organization-logo`, logo, config)
        .then((response)=>{
            console.log("success updating logo. ", response)
            if(response.status===200){
                setLogoUpdated(true)
                updatePassword(logoUpdated, detailsUpdated)
            }
        })
        .catch((er)=>{
            console.log("error updating logo ",er)
        })

    }

    //update password if both org deets and logo are saved.
    //cos updating password sets initialized to true.
    function updatePassword(serverGotLogo, serverGotDetails){
        if(!serverGotLogo || !serverGotDetails){
            return
        }

        setLoading(true)
        const data = {adminEmail:email, adminPassword:password}
        const config = { headers: { Authorization: `Bearer ${token}` } }

        axios.put(`${BACKEND_URL}/admin/credentials`,data, config)
        .then((response)=>{
            console.log("updated password. ",response)
            if(response.status===200){
                alert('password updated. please log in again.')
                setSignedIn(false) //replace with log in function?
                history.push('/')
            }
        })
        .catch((er)=>{
            console.log('couldnt update password', er)
            alert('password update failed. woops.')
            return
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
